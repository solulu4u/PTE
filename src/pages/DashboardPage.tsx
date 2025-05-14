import { useState, useEffect } from 'react';
import { Book, Clock, Users, BarChart3, Award, BookOpen, Headphones, Edit3 } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import RecommendedPractices from '../components/dashboard/RecommendedPractices';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dummy data for stats
  const stats = [
    {
      title: 'Completed Exercises',
      value: 42,
      change: 12,
      icon: <Book size={20} className="text-primary-500" />,
    },
    {
      title: 'Hours Practiced',
      value: 18,
      change: 8,
      icon: <Clock size={20} className="text-secondary-500" />,
    },
    {
      title: 'Mock Tests Taken',
      value: 5,
      change: 2,
      icon: <BarChart3 size={20} className="text-accent-500" />,
    },
    {
      title: 'Global Ranking',
      value: '328th',
      change: -5,
      icon: <Users size={20} className="text-success-500" />,
    },
  ];

  // Dummy data for skills
  const skills = [
    { label: 'Speaking', score: 65, color: '#347ee0' },
    { label: 'Writing', score: 72, color: '#27aa6d' },
    { label: 'Reading', score: 53, color: '#ff850a' },
    { label: 'Listening', score: 68, color: '#10b981' },
  ];

  // Dummy data for recent activity
  const activities = [
    {
      id: 1,
      type: 'practice',
      title: 'Completed Read Aloud Practice',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description: 'You completed 5 Read Aloud exercises with an average score of 75%.',
      score: 75,
      skillType: 'Speaking',
    },
    {
      id: 2,
      type: 'test',
      title: 'Mock Test #3 Completed',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      description: 'You completed Mock Test #3 with an overall score of 68.',
      score: 68,
    },
    {
      id: 3,
      type: 'achievement',
      title: 'New Achievement Unlocked',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: 'You earned the "Consistent Learner" badge for practicing 7 days in a row.',
    },
    {
      id: 4,
      type: 'practice',
      title: 'Summarize Written Text Practice',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      description: 'You completed 3 Summarize Written Text exercises with an average score of 62%.',
      score: 62,
      skillType: 'Writing',
    },
  ];

  // Dummy data for recommended practices
  const recommendedPractices = [
    {
      id: 1,
      title: 'Read Aloud Intensive Practice',
      type: 'Speaking',
      duration: 20,
      difficulty: 'medium',
      recommended: true,
      description: 'Improve your read aloud skills with these carefully selected passages focused on complex vocabulary and scientific topics.',
    },
    {
      id: 2,
      title: 'Fill in the Blanks Challenge',
      type: 'Reading',
      duration: 15,
      difficulty: 'hard',
      recommended: true,
      description: 'Challenge yourself with advanced fill in the blanks exercises targeting academic vocabulary and contextual understanding.',
    },
    {
      id: 3,
      title: 'Summarize Written Text Workshop',
      type: 'Writing',
      duration: 25,
      difficulty: 'medium',
      recommended: false,
      description: 'Practice condensing complex passages into concise summaries within the word limit while maintaining key ideas.',
    },
    {
      id: 4,
      title: 'Repeat Sentence Essentials',
      type: 'Speaking',
      duration: 10,
      difficulty: 'easy',
      recommended: false,
      description: 'Practice repeating sentences of varying length and complexity to improve your speaking accuracy and memory.',
    },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.username || 'Student'}!
          </h1>
          <p className="text-gray-600 mt-1">Here's an overview of your PTE preparation progress.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              href="/mock-tests"
              variant="outline"
              size="lg"
              iconLeft={<Award size={20} />}
              fullWidth
            >
              Take Mock Test
            </Button>
            <Button
              href="/practice/speaking"
              variant="outline"
              size="lg"
              iconLeft={<BookOpen size={20} />}
              fullWidth
            >
              Speaking Practice
            </Button>
            <Button
              href="/practice/listening"
              variant="outline"
              size="lg"
              iconLeft={<Headphones size={20} />}
              fullWidth
            >
              Listening Practice
            </Button>
            <Button
              href="/practice/writing"
              variant="outline"
              size="lg"
              iconLeft={<Edit3 size={20} />}
              fullWidth
            >
              Writing Practice
            </Button>
          </div>
        </div>

        {/* Charts and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <ProgressChart skills={skills} className="col-span-1" />
          <RecentActivity activities={activities} className="col-span-1 lg:col-span-2" />
        </div>

        {/* Recommended Practices */}
        <RecommendedPractices practices={recommendedPractices} />
      </div>
    </div>
  );
};

export default DashboardPage;