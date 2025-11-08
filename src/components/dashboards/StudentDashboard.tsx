'use client'

import React, { useState } from 'react';
import { useAuth } from "../../hooks/AuthContext";
import { LogOut, Book, Gamepad, MessageSquare, Award, TrendingUp, Clock, Target, Flame, Star } from 'lucide-react';
import Image from 'next/image';
import { MOCK_STUDENT_PROFILE } from '../../data/mockStudentData';

// ## Sidebar Component Definition ##
const Sidebar = () => {
  const { signOut } = useAuth();
  
  const handleLogout = () => {
    signOut();
  };

  return (
    <aside className="w-64 bg-blue-900/50 p-6 flex flex-col flex-shrink-0">
      <div className="mb-8">
        <Image
          src="/logo/Logo.png"
          alt="Skill Yug Logo"
          width={48}
          height={48}
          className="h-12 w-auto bg-white p-2 rounded-lg"
        />
      </div>
      <nav className="flex flex-col space-y-3 flex-grow">
        <button className="w-full text-left p-3 bg-orange-500 rounded-lg font-semibold text-white">Profile</button>
        <button className="w-full text-left p-3 hover:bg-blue-800 rounded-lg text-white">Your Course</button>
        <button className="w-full text-left p-3 hover:bg-blue-800 rounded-lg text-white">All Course</button>
        <button className="w-full text-left p-3 hover:bg-blue-800 rounded-lg text-white">Quiz/Games</button>
        <button className="w-full text-left p-3 hover:bg-blue-800 rounded-lg text-white">Contact us</button>
      </nav>
      <div>
        <button 
          onClick={handleLogout}
          className="w-full text-left p-3 border border-blue-700 hover:bg-blue-800 rounded-lg flex items-center space-x-2 text-white"
        >
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

// ## Main Content Component Definition ##
const MainContent = () => {
  const { user, profile, createProfileForCurrentUser } = useAuth();
  const [creatingProfile, setCreatingProfile] = useState(false);

  // Use mock data as fallback when no profile exists
  const useMockData = !profile;

  const handleCreateProfile = async () => {
    setCreatingProfile(true);
    try {
      await createProfileForCurrentUser();
    } catch (error) {
      console.error('Error creating profile:', error);
    } finally {
      setCreatingProfile(false);
    }
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Mock Data Banner */}
        {useMockData && (
          <div className="bg-orange-900/30 border border-orange-700/50 rounded-lg p-4 mb-6">
            <p className="text-orange-300 text-sm">
              📌 Viewing demo data. Create a profile to see your actual progress.
            </p>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-700/50 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Image
                src={useMockData ? MOCK_STUDENT_PROFILE.avatar! : '/logo/Logo.png'}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full border-4 border-orange-500"
              />
              {useMockData && (
                <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {MOCK_STUDENT_PROFILE.tokens_earned} 🪙
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">
                {useMockData ? MOCK_STUDENT_PROFILE.full_name : (profile?.full_name || 'Student')}
              </h1>
              <p className="text-gray-300 mb-4">
                {useMockData ? MOCK_STUDENT_PROFILE.email : (profile?.email || user?.email)}
              </p>
              {useMockData && MOCK_STUDENT_PROFILE.bio && (
                <p className="text-gray-400 text-sm max-w-2xl">{MOCK_STUDENT_PROFILE.bio}</p>
              )}
              
              {useMockData && (
                <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-white">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{MOCK_STUDENT_PROFILE.current_streak}</span>
                    <span className="text-gray-400 text-sm">Day Streak</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Book className="h-5 w-5 text-blue-400" />
                    <span className="font-semibold">{MOCK_STUDENT_PROFILE.courses_completed}/{MOCK_STUDENT_PROFILE.total_courses_enrolled}</span>
                    <span className="text-gray-400 text-sm">Courses</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="font-semibold">{MOCK_STUDENT_PROFILE.achievements.length}</span>
                    <span className="text-gray-400 text-sm">Achievements</span>
                  </div>
                </div>
              )}
            </div>

            {!profile && (
              <button
                onClick={handleCreateProfile}
                disabled={creatingProfile}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 disabled:opacity-50 font-semibold"
              >
                {creatingProfile ? 'Creating...' : 'Create Real Profile'}
              </button>
            )}
          </div>
        </div>

        {/* Content based on profile availability */}
        {useMockData ? (
          <>
            {/* Learning Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="h-8 w-8 text-blue-400" />
                  <TrendingUp className="h-5 w-5 text-green-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Total Learning Time</p>
                <p className="text-3xl font-bold text-white">{MOCK_STUDENT_PROFILE.learning_stats.total_hours}h</p>
              </div>

              <div className="bg-black/30 backdrop-blur-md border border-purple-800/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-purple-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Avg Quiz Score</p>
                <p className="text-3xl font-bold text-white">{MOCK_STUDENT_PROFILE.learning_stats.avg_quiz_score}%</p>
              </div>

              <div className="bg-black/30 backdrop-blur-md border border-orange-800/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <Flame className="h-8 w-8 text-orange-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Active Days (This Month)</p>
                <p className="text-3xl font-bold text-white">{MOCK_STUDENT_PROFILE.learning_stats.monthly_active_days}</p>
              </div>

              <div className="bg-black/30 backdrop-blur-md border border-green-800/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <p className="text-gray-400 text-sm mb-1">Weekly Goal Progress</p>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-white">{MOCK_STUDENT_PROFILE.learning_stats.weekly_goal_progress}%</p>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${MOCK_STUDENT_PROFILE.learning_stats.weekly_goal_progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Courses</h2>
                <button className="text-orange-500 hover:text-orange-400 font-medium">
                  View All →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_STUDENT_PROFILE.enrolled_courses.slice(0, 6).map((course) => (
                  <div 
                    key={course.course_id}
                    className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="relative h-40">
                      <Image
                        src={course.thumbnail}
                        alt={course.course_name}
                        fill
                        className="object-cover"
                      />
                      {course.completed && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          ✓ Completed
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 line-clamp-2">{course.course_name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{course.instructor}</p>
                      
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-semibold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                        <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                      </div>

                      {!course.completed && course.next_lesson && (
                        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 text-sm font-medium">
                          Continue: {course.next_lesson}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_STUDENT_PROFILE.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`bg-black/30 backdrop-blur-md border rounded-xl p-4 hover:transform hover:scale-105 transition-all duration-300 ${
                      achievement.rarity === 'legendary' ? 'border-yellow-500' :
                      achievement.rarity === 'epic' ? 'border-purple-500' :
                      achievement.rarity === 'rare' ? 'border-blue-500' :
                      'border-gray-700'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h3 className="text-white font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">{achievement.description}</p>
                    <span className={`text-xs font-bold uppercase ${
                      achievement.rarity === 'legendary' ? 'text-yellow-400' :
                      achievement.rarity === 'epic' ? 'text-purple-400' :
                      achievement.rarity === 'rare' ? 'text-blue-400' :
                      'text-gray-400'
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6">
                <div className="space-y-4">
                  {MOCK_STUDENT_PROFILE.recent_activity.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-700 last:border-b-0">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{activity.title}</h4>
                        <p className="text-gray-400 text-sm">{activity.description}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(activity.timestamp).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Quick Actions for real users */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 hover:bg-black/40 transition-all duration-300">
                <Book className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">My Courses</h3>
                <p className="text-gray-300 mb-4">View and continue your enrolled courses</p>
                <button className="text-orange-500 hover:text-orange-400 font-medium">
                  View Courses →
                </button>
              </div>

              <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 hover:bg-black/40 transition-all duration-300">
                <Gamepad className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Quiz & Games</h3>
                <p className="text-gray-300 mb-4">Test your knowledge with interactive quizzes</p>
                <button className="text-orange-500 hover:text-orange-400 font-medium">
                  Start Quiz →
                </button>
              </div>

              <div className="bg-black/30 backdrop-blur-md border border-blue-800/30 rounded-xl p-6 hover:bg-black/40 transition-all duration-300">
                <MessageSquare className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Support</h3>
                <p className="text-gray-300 mb-4">Get help from our support team</p>
                <button className="text-orange-500 hover:text-orange-400 font-medium">
                  Contact Us →
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ## Main StudentDashboard Component ##
const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-blue-900 to-blue-800">
      <Sidebar />
      <MainContent />
    </div>
  );
};

// Disable static generation to prevent AuthProvider issues during build
export async function getServerSideProps() {
  return {
    props: {}
  };
}

export default StudentDashboard;
