import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    label: string;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };
  
  const bgColor = colorMap[color] || 'bg-blue-500';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${bgColor} text-white mr-4`}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
          </div>
        </div>
        
        {trend && (
          <div className="mt-4 flex items-center text-sm">
            <span className={trend.value >= 0 ? 'text-green-500' : 'text-red-500'}>
              {trend.value >= 0 ? '+' : ''}{trend.value}%
            </span>
            <span className="text-gray-400 ml-2">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;