import { Link } from 'react-router-dom';
import { Clock, BarChart, Star } from 'lucide-react';
import Button from '../common/Button';

type Practice = {
  id: number;
  title: string;
  type: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  recommended: boolean;
  description: string;
  imageUrl?: string;
};

type RecommendedPracticesProps = {
  practices: Practice[];
  className?: string;
};

const RecommendedPractices: React.FC<RecommendedPracticesProps> = ({ practices, className = '' }) => {
  const getDifficultyColor = (difficulty: Practice['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success-600';
      case 'medium':
        return 'text-warning-500';
      case 'hard':
        return 'text-error-600';
      default:
        return 'text-gray-600';
    }
  };

  const getDifficultyBg = (difficulty: Practice['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success-50';
      case 'medium':
        return 'bg-warning-50';
      case 'hard':
        return 'bg-error-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-soft p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Recommended Practices</h3>
        <Link to="/practice" className="text-sm font-medium text-primary-600 hover:text-primary-700">
          View all
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {practices.map((practice) => (
          <div 
            key={practice.id}
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-medium transition-shadow"
          >
            <div className="h-32 bg-gray-200 relative">
              {practice.imageUrl ? (
                <img 
                  src={practice.imageUrl} 
                  alt={practice.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary-100 to-secondary-100">
                  <BarChart size={48} className="text-primary-300" />
                </div>
              )}
              
              {practice.recommended && (
                <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                  <Star size={12} className="mr-1" />
                  Recommended
                </div>
              )}
              
              <div className="absolute top-2 left-2 bg-white bg-opacity-90 text-xs px-2 py-1 rounded-full">
                {practice.type}
              </div>
            </div>
            
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-1">{practice.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">{practice.description}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={14} className="mr-1" />
                  <span>{practice.duration} min</span>
                </div>
                
                <div className={`text-xs px-2 py-1 rounded ${getDifficultyBg(practice.difficulty)} ${getDifficultyColor(practice.difficulty)}`}>
                  {practice.difficulty.charAt(0).toUpperCase() + practice.difficulty.slice(1)}
                </div>
              </div>
              
              <Button 
                href={`/practice/${practice.id}`}
                variant="primary" 
                size="sm" 
                fullWidth
              >
                Start Practice
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPractices;