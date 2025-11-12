import NextAuth, { DefaultSession } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import axios from 'axios';

export enum UserType {
  STUDENT = 'STUDENT',
  MENTOR = 'MENTOR',
  ADMIN = 'ADMIN'
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userType: UserType;
      accessToken?: string;
      emailVerificationRequired?: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userType?: UserType;
    accessToken?: string;
    emailVerificationRequired?: boolean;
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const baseUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(8, 'Password must be 8+ characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, 
      'Password needs uppercase, lowercase, number and special character'),
  userType: z.enum(['student', 'instructor', 'admin'])
});

export const signupSchema = baseUserSchema.extend({
  confirmPassword: z.string().min(1, 'Confirm password required'),
  agreeToTerms: z.boolean().refine(val => val === true, 'Must agree to terms')
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const getApiUrl = () => {
  if (typeof window === 'undefined') {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://backend:5000';
    return url.endsWith('/api') ? url : `${url}/api`;
  }
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  return url.endsWith('/api') ? url : `${url}/api`;
};

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const response = await axios.post(
            `${getApiUrl()}/auth/login`,
            { email, password },
            {
              headers: { 'Content-Type': 'application/json' },
              timeout: 10000,
              validateStatus: (status) => status < 500,
            }
          );

          if (response.status !== 200 && response.status !== 201) {
            const msg = response.data?.message || '';
            if (msg.includes('verify') || msg.includes('not verified')) {
              throw new Error(`EMAIL_NOT_VERIFIED:${email}`);
            }
            throw new Error(response.data?.message || 'Login failed');
          }

          const { data } = response.data;
          console.log('Login response:', data);

          if (!data || response.data.status !== 'success') return null;

          if (data.needsVerification) {
            throw new Error(`EMAIL_NOT_VERIFIED:${email}`);
          }
          
          if (!data.user?.id || !data.token) return null;

          return {
            id: data.user.id,
            name: data.user.fullName || data.user.name,
            email: data.user.email,
            image: data.user.image,
            userType: data.user.userType,
            accessToken: data.token,
            emailVerificationRequired: false,
          };
        } catch (error) {
          console.error("Auth error:", error);
          
          if (axios.isAxiosError(error)) {
            const msg = error.response?.data?.message || '';
            if (msg.includes('verify') || msg.includes('not verified')) {
              throw new Error(`EMAIL_NOT_VERIFIED:${credentials?.email || ''}`);
            }
            throw new Error(error.response?.data?.message || 'Login failed');
          }
          
          if (error instanceof Error && error.message.startsWith('EMAIL_NOT_VERIFIED:')) {
            throw error;
          }
          
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        token.sub = user.id;
        token.userType = user.userType as UserType;
        token.accessToken = user.accessToken;
        token.emailVerificationRequired = user.emailVerificationRequired;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.sub as string) || '';
        session.user.userType = token.userType as UserType;
        session.user.accessToken = token.accessToken as string;
        session.user.emailVerificationRequired = token.emailVerificationRequired as boolean;
        session.user.email = token.email as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.includes('verify-email')) return url;
      if (url.includes('/login') || url === baseUrl) return `${baseUrl}/dashboard`;
      return url;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function registerUser(userData: unknown) {
  try {
    const validation = baseUserSchema.safeParse(userData);
    if (!validation.success) {
      throw new Error(validation.error.issues.map(i => i.message).join(', '));
    }

    const { name: fullName, email, password, userType } = validation.data;
    const mappedUserType = userType === 'instructor' ? 'MENTOR' : userType.toUpperCase();

    const response = await axios.post(
      `${getApiUrl()}/auth/register`,
      { fullName, email, password, userType: mappedUserType },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.message || 'Registration failed');
    }

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    
    throw error instanceof Error ? error : new Error('Registration failed');
  }
}

export async function verifyOtp(email: string, otp: string) {
  try {
    const response = await axios.post(
      `${getApiUrl()}/auth/verify-otp`,
      { email, otp },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.message || 'OTP verification failed');
    }

    return response.data;
  } catch (error) {
    console.error('OTP verification error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'OTP verification failed');
    }
    throw error instanceof Error ? error : new Error('OTP verification failed');
  }
}

export async function resendOtp(email: string) {
  try {
    const response = await axios.post(
      `${getApiUrl()}/auth/resend-otp`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.message || 'Failed to resend OTP');
    }

    return response.data;
  } catch (error) {
    console.error('Resend OTP error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to resend OTP');
    }
    throw error instanceof Error ? error : new Error('Failed to resend OTP');
  }
}

export async function sendVerificationOtp(email: string) {
  try {
    const response = await axios.post(
      `${getApiUrl()}/auth/resend-otp`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status !== 200 && response.status !== 201) {
      throw new Error(response.data?.message || 'Failed to send verification code');
    }

    return response.data;
  } catch (error) {
    console.error('Send verification OTP error:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to send verification code');
    }
    throw error instanceof Error ? error : new Error('Failed to send verification code');
  }
}

export async function getServerSession() {
  return await auth();
}

type SessionType = {
  user?: {
    id?: string;
    userType?: UserType;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    accessToken?: string;
    [key: string]: string | number | boolean | null | undefined;
  };
  [key: string]: unknown;
} | null | undefined;

export function isAuthenticated(session: SessionType): boolean {
  return !!(session?.user?.id);
}

export function hasRole(session: SessionType, role: UserType): boolean {
  return session?.user?.userType === role;
}

export function isAdmin(session: SessionType): boolean {
  return hasRole(session, UserType.ADMIN);
}

export function isMentor(session: SessionType): boolean {
  return hasRole(session, UserType.MENTOR);
}

export function isStudent(session: SessionType): boolean {
  return hasRole(session, UserType.STUDENT);
}
