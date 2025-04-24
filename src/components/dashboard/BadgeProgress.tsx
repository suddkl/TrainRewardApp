import React from 'react';
import { User, Badge } from '../../types';
import { badges } from '../../data/mockData';

interface BadgeProgressProps {
  user: User;
}

const BadgeProgress: React.FC<BadgeProgressProps> = ({ user }) => {
  // Get the next badge based on current miles
  const getNextBadge = (): Badge | null => {
    const badgeTypes: (keyof typeof badges)[] = ['bronze', 'silver', 'gold', 'diamond', 'platinum'];
    const currentBadgeIndex = badgeTypes.findIndex(type => type === user.currentBadge.type);
    
    // If platinum, there's no next badge
    if (currentBadgeIndex === badgeTypes.length - 1) return null;
    
    // Return the next badge
    const nextBadgeType = badgeTypes[currentBadgeIndex + 1];
    return badges[nextBadgeType];
  };
  
  const nextBadge = getNextBadge();
  
  // Calculate progress percentage towards next badge
  const calculateProgress = (): number => {
    if (!nextBadge) return 100; // Already at platinum
    
    const currentMiles = user.totalMiles;
    const currentBadgeMiles = user.currentBadge.milesRequired;
    const nextBadgeMiles = nextBadge.milesRequired;
    
    const milesNeeded = nextBadgeMiles - currentBadgeMiles;
    const milesAchieved = currentMiles - currentBadgeMiles;
    
    return Math.min(100, Math.round((milesAchieved / milesNeeded) * 100));
  };
  
  const progressPercent = calculateProgress();
  const milesRemaining = nextBadge 
    ? nextBadge.milesRequired - user.totalMiles 
    : 0;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5">
        <h3 className="text-lg font-semibold text-white">Badge Progress</h3>
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            {/* Placeholder for badge icon */}
            <span className="text-2xl font-bold text-blue-600">
              {user.currentBadge.type.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800">{user.currentBadge.name}</h4>
            <p className="text-sm text-gray-600">{user.currentBadge.description}</p>
          </div>
        </div>
        
        {nextBadge ? (
          <>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-gray-600">Progress to {nextBadge.name}</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="h-2.5 rounded-full bg-blue-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>Total miles traveled: <span className="font-semibold">{user.totalMiles}</span></p>
              <p>Miles remaining for {nextBadge.name}: <span className="font-semibold">{milesRemaining}</span></p>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <p className="text-lg font-semibold text-gray-800">
              Congratulations! You've reached the highest badge.
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Keep traveling to maintain your platinum status.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeProgress;