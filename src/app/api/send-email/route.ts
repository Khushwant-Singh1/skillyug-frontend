import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailContent, EmailData } from '@/lib/email-templates';

/**
 * Email sending API endpoint
 * This endpoint handles all email sending functionality for the application
 * It uses nodemailer to send emails via SMTP
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body: EmailData = await req.json();

    // Validate required fields
    if (!body.email || !body.type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get email content based on type
    let emailContent;
    try {
      emailContent = getEmailContent(body);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid email data' },
        { status: 400 }
      );
    }

    // Configure SMTP transporter
    const port = parseInt(process.env.EMAIL_SERVER_PORT || '465');
    const isSecure = port === 465;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
      port: port,
      secure: isSecure,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
        ciphers: 'SSLv3',
        minVersion: 'TLSv1',
      },
      debug: process.env.NODE_ENV === 'development',
      logger: process.env.NODE_ENV === 'development',
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('✅ SMTP connection verified');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      return NextResponse.json(
        { 
          error: 'Email service unavailable',
          details: verifyError instanceof Error ? verifyError.message : 'Unknown error'
        },
        { status: 503 }
      );
    }

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || `"Skillyug" <${process.env.EMAIL_SERVER_USER}>`,
      to: body.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    };

    // Send email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully:', info.messageId);
      
      return NextResponse.json(
        { 
          success: true,
          message: 'Email sent successfully',
          messageId: info.messageId
        },
        { status: 200 }
      );
    } catch (sendError) {
      console.error('❌ Email send failed:', sendError);
      return NextResponse.json(
        { 
          error: 'Failed to send email',
          details: sendError instanceof Error ? sendError.message : 'Unknown error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Email API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
