import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

type StatsCardProps = {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
  className?: string;
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, className = '' }) => {
  const isPositiveChange = change !== undefined && change >= 0;
  
  return (
    <div className={`bg-white rounded-lg shadow-soft p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-gray-100 rounded-full">
          {icon}
        </div>
      </div>
      
      <div className="flex items-end mt-1">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        
        {change !== undefined && (
          <div className={`flex items-center ml-2 ${isPositiveChange ? 'text-success-600' : 'text-error-600'}`}>
            {isPositiveChange ? (
              <ArrowUpRight size={16} className="mr-1" />
            ) : (
              <ArrowDownRight size={16} className="mr-1" />
            )}
            <span className="text-sm font-medium">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      {change !== undefined && (
        <p className="text-xs text-gray-500 mt-1">compared to last month</p>
      )}
    </div>
  );
};

export default StatsCard;