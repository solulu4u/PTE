import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

type TimerProps = {
  initialTime: number; // in seconds
  onComplete?: () => void;
  className?: string;
  showIcon?: boolean;
  autoStart?: boolean;
  size?: 'sm' | 'md' | 'lg';
  labelPosition?: 'left' | 'right' | 'none';
  variant?: 'default' | 'warning' | 'danger';
};

const Timer: React.FC<TimerProps> = ({
  initialTime,
  onComplete,
  className = '',
  showIcon = true,
  autoStart = true,
  size = 'md',
  labelPosition = 'left',
  variant = 'default',
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && onComplete) {
      onComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
  };

  const getVariantClasses = () => {
    const percentage = (timeLeft / initialTime) * 100;
    if (variant === 'danger') return 'text-error-600';
    if (variant === 'warning') return 'text-warning-600';
    if (percentage <= 10) return 'text-error-600';
    if (percentage <= 30) return 'text-warning-600';
    return 'text-gray-700';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg font-semibold';
      default:
        return 'text-base';
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      {labelPosition === 'left' && (
        <span className="mr-2 text-gray-600 text-sm">Time Remaining:</span>
      )}
      
      <div className={`flex items-center ${getVariantClasses()} ${getSizeClasses()}`}>
        {showIcon && <Clock size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} className="mr-1" />}
        <span>{formatTime(timeLeft)}</span>
      </div>
      
      {labelPosition === 'right' && (
        <span className="ml-2 text-gray-600 text-sm">remaining</span>
      )}
    </div>
  );
};

export default Timer;