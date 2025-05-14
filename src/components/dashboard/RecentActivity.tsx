import { format } from 'date-fns';
import { Clock, Bookmark, BookOpen, Award } from 'lucide-react';

type Activity = {
  id: number;
  type: 'practice' | 'test' | 'achievement' | 'feedback';
  title: string;
  date: Date;
  description: string;
  score?: number;
  skillType?: string;
};

type RecentActivityProps = {
  activities: Activity[];
  className?: string;
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities, className = '' }) => {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'practice':
        return <BookOpen size={18} className="text-secondary-500" />;
      case 'test':
        return <Bookmark size={18} className="text-primary-500" />;
      case 'achievement':
        return <Award size={18} className="text-accent-500" />;
      case 'feedback':
        return <Clock size={18} className="text-gray-500" />;
      default:
        return <Clock size={18} className="text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return format(date, 'MMM d, yyyy');
  };

  const formatTime = (date: Date) => {
    return format(date, 'h:mm a');
  };

  return (
    <div className={`bg-white rounded-lg shadow-soft p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No recent activity to display.</p>
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(activity.date)}</p>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500">{formatTime(activity.date)}</p>
                  {activity.score !== undefined && (
                    <div className="ml-auto flex items-center">
                      <span className="text-xs font-medium text-gray-700">Score:</span>
                      <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                        {activity.score}
                      </span>
                    </div>
                  )}
                  {activity.skillType && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      {activity.skillType}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      {activities.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all activity
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;