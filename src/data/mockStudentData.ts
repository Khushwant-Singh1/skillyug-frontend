export interface MockStudentProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  user_type: 'student';
  tokens_earned: number;
  total_courses_enrolled: number;
  courses_completed: number;
  current_streak: number;
  joined_date: string;
  achievements: Achievement[];
  enrolled_courses: EnrolledCourse[];
  recent_activity: Activity[];
  learning_stats: LearningStats;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned_date: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface EnrolledCourse {
  course_id: string;
  course_name: string;
  category: string;
  progress: number;
  last_accessed: string;
  enrollment_date: string;
  completed: boolean;
  instructor: string;
  thumbnail: string;
  next_lesson?: string;
  total_lessons: number;
  completed_lessons: number;
}

export interface Activity {
  id: string;
  type: 'lesson_completed' | 'quiz_passed' | 'achievement_earned' | 'course_enrolled';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface LearningStats {
  total_hours: number;
  avg_quiz_score: number;
  favorite_category: string;
  weekly_goal_progress: number;
  monthly_active_days: number;
}

export const MOCK_STUDENT_PROFILE: MockStudentProfile = {
  id: 'student_12345',
  full_name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  bio: 'Passionate about learning new technologies and building innovative solutions. Currently focusing on web development and data science.',
  user_type: 'student',
  tokens_earned: 850,
  total_courses_enrolled: 8,
  courses_completed: 3,
  current_streak: 12,
  joined_date: '2024-01-15',
  
  achievements: [
    {
      id: 'ach_1',
      title: 'Fast Learner',
      description: 'Completed 3 courses in your first month',
      icon: '⚡',
      earned_date: '2024-02-15',
      rarity: 'epic'
    },
    {
      id: 'ach_2',
      title: 'Perfect Score',
      description: 'Scored 100% in 5 quizzes',
      icon: '🎯',
      earned_date: '2024-03-10',
      rarity: 'rare'
    },
    {
      id: 'ach_3',
      title: '7 Day Streak',
      description: 'Logged in and learned for 7 consecutive days',
      icon: '🔥',
      earned_date: '2024-03-20',
      rarity: 'common'
    },
    {
      id: 'ach_4',
      title: 'Community Helper',
      description: 'Helped 10 fellow students in discussion forums',
      icon: '🤝',
      earned_date: '2024-03-25',
      rarity: 'rare'
    }
  ],
  
  enrolled_courses: [
    {
      course_id: 'course_1',
      course_name: 'Complete Python Programming Masterclass',
      category: 'PROGRAMMING',
      progress: 85,
      last_accessed: '2024-03-28T10:30:00Z',
      enrollment_date: '2024-01-20',
      completed: false,
      instructor: 'Dr. Kamal Kishore',
      thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      next_lesson: 'Advanced OOP Concepts',
      total_lessons: 45,
      completed_lessons: 38
    },
    {
      course_id: 'course_2',
      course_name: 'Full Stack Web Development with React & Node.js',
      category: 'WEB_DEVELOPMENT',
      progress: 60,
      last_accessed: '2024-03-27T15:45:00Z',
      enrollment_date: '2024-02-01',
      completed: false,
      instructor: 'Sonu Kadam',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      next_lesson: 'State Management with Redux',
      total_lessons: 60,
      completed_lessons: 36
    },
    {
      course_id: 'course_3',
      course_name: 'Data Science Fundamentals',
      category: 'DATA_SCIENCE',
      progress: 100,
      last_accessed: '2024-03-15T09:00:00Z',
      enrollment_date: '2024-01-15',
      completed: true,
      instructor: 'Sourabh Sir',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
      total_lessons: 35,
      completed_lessons: 35
    },
    {
      course_id: 'course_4',
      course_name: 'Machine Learning with Python',
      category: 'ARTIFICIAL_INTELLIGENCE',
      progress: 45,
      last_accessed: '2024-03-26T14:20:00Z',
      enrollment_date: '2024-02-15',
      completed: false,
      instructor: 'Dr. Kamal Kishore',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
      next_lesson: 'Neural Networks Introduction',
      total_lessons: 50,
      completed_lessons: 22
    },
    {
      course_id: 'course_5',
      course_name: 'JavaScript ES6+ Modern Features',
      category: 'PROGRAMMING',
      progress: 100,
      last_accessed: '2024-02-28T11:30:00Z',
      enrollment_date: '2024-01-25',
      completed: true,
      instructor: 'Sonu Kadam',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400',
      total_lessons: 30,
      completed_lessons: 30
    },
    {
      course_id: 'course_6',
      course_name: 'Database Design & SQL Mastery',
      category: 'DATABASE',
      progress: 72,
      last_accessed: '2024-03-25T16:00:00Z',
      enrollment_date: '2024-02-10',
      completed: false,
      instructor: 'Sourabh Sir',
      thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
      next_lesson: 'Advanced Joins and Subqueries',
      total_lessons: 40,
      completed_lessons: 29
    },
    {
      course_id: 'course_7',
      course_name: 'Git & GitHub for Beginners',
      category: 'DEVOPS',
      progress: 100,
      last_accessed: '2024-02-20T13:15:00Z',
      enrollment_date: '2024-01-18',
      completed: true,
      instructor: 'Sonu Kadam',
      thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
      total_lessons: 20,
      completed_lessons: 20
    },
    {
      course_id: 'course_8',
      course_name: 'UI/UX Design Principles',
      category: 'DESIGN',
      progress: 35,
      last_accessed: '2024-03-24T10:45:00Z',
      enrollment_date: '2024-03-01',
      completed: false,
      instructor: 'Design Expert',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      next_lesson: 'Color Theory & Typography',
      total_lessons: 42,
      completed_lessons: 15
    }
  ],
  
  recent_activity: [
    {
      id: 'activity_1',
      type: 'lesson_completed',
      title: 'Completed Lesson',
      description: 'Advanced OOP Concepts in Python',
      timestamp: '2024-03-28T10:30:00Z',
      icon: '✅'
    },
    {
      id: 'activity_2',
      type: 'quiz_passed',
      title: 'Quiz Passed',
      description: 'React Hooks Quiz - Score: 95%',
      timestamp: '2024-03-27T15:45:00Z',
      icon: '🎯'
    },
    {
      id: 'activity_3',
      type: 'achievement_earned',
      title: 'Achievement Unlocked',
      description: 'Community Helper - Helped 10 students',
      timestamp: '2024-03-25T09:20:00Z',
      icon: '🏆'
    },
    {
      id: 'activity_4',
      type: 'lesson_completed',
      title: 'Completed Lesson',
      description: 'Database Normalization Techniques',
      timestamp: '2024-03-25T16:00:00Z',
      icon: '✅'
    },
    {
      id: 'activity_5',
      type: 'quiz_passed',
      title: 'Quiz Passed',
      description: 'SQL Queries Quiz - Score: 88%',
      timestamp: '2024-03-24T14:30:00Z',
      icon: '🎯'
    },
    {
      id: 'activity_6',
      type: 'lesson_completed',
      title: 'Completed Lesson',
      description: 'User Research Methods in UI/UX',
      timestamp: '2024-03-24T10:45:00Z',
      icon: '✅'
    },
    {
      id: 'activity_7',
      type: 'course_enrolled',
      title: 'New Course Enrolled',
      description: 'UI/UX Design Principles',
      timestamp: '2024-03-01T08:00:00Z',
      icon: '📚'
    }
  ],
  
  learning_stats: {
    total_hours: 127,
    avg_quiz_score: 87,
    favorite_category: 'Web Development',
    weekly_goal_progress: 85,
    monthly_active_days: 22
  }
};
