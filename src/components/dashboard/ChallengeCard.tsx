import React from 'react';
import { Challenge } from '../../types';

interface ChallengeCardProps {
  challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  // Calculate progress percentage
  const progressPercent = Math.round((challenge.progress / challenge.target) * 100);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {challenge.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">
          {challenge.description}
        </p>
        
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">
            {challenge.progress} / {challenge.target}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <span 
            className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
              challenge.completed 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            {challenge.completed ? 'Completed' : `${progressPercent}% Complete`}
          </span>
          
          {challenge.completed ? (
            <span className="text-green-600 text-sm font-medium">+10 points earned!</span>
          ) : (
            <span className="text-gray-500 text-sm">Earn 10 points</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;