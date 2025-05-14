import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

type SkillData = {
  label: string;
  score: number;
  color: string;
};

type ProgressChartProps = {
  skills: SkillData[];
  className?: string;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ skills, className = '' }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        // Destroy previous chart if it exists
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
        
        // Create new chart
        chartInstance.current = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: skills.map(skill => skill.label),
            datasets: [
              {
                label: 'Your Skills',
                data: skills.map(skill => skill.score),
                backgroundColor: 'rgba(52, 126, 224, 0.2)',
                borderColor: '#347ee0',
                borderWidth: 2,
                pointBackgroundColor: skills.map(skill => skill.color),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: skills.map(skill => skill.color),
              },
            ],
          },
          options: {
            scales: {
              r: {
                angleLines: {
                  display: true,
                  color: 'rgba(0, 0, 0, 0.1)',
                },
                suggestedMin: 0,
                suggestedMax: 90,
                ticks: {
                  stepSize: 15,
                  backdropColor: 'transparent',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.05)',
                },
                pointLabels: {
                  font: {
                    family: "'Inter', sans-serif",
                    size: 12,
                    weight: '600',
                  },
                  color: '#4b5563',
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                titleColor: '#1f2937',
                bodyColor: '#4b5563',
                borderColor: '#e5e7eb',
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
                usePointStyle: true,
                callbacks: {
                  title: (context) => {
                    return context[0].label;
                  },
                  label: (context) => {
                    return `Score: ${context.parsed.r}/90`;
                  },
                },
              },
            },
            elements: {
              line: {
                tension: 0.2,
              },
            },
          },
        });
      }
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [skills]);

  return (
    <div className={`bg-white rounded-lg shadow-soft p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills Overview</h3>
      <div className="aspect-square w-full">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default ProgressChart;