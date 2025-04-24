import React from 'react';
import { Reward } from '../../types';
import { Ticket } from 'lucide-react';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, onRedeem }) => {
  const canRedeem = userPoints >= reward.pointsCost;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-[1.02]">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <div className="p-2 bg-blue-100 rounded-full mr-3">
            <Ticket className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{reward.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 min-h-[50px]">
          {reward.description}
        </p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="font-medium text-green-600">£{reward.discountValue.toFixed(2)} value</span>
          <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
            {reward.pointsCost} points
          </span>
        </div>
        
        <button
          onClick={() => onRedeem(reward)}
          disabled={!canRedeem}
          className={`w-full py-2 px-4 rounded font-medium transition-colors ${
            canRedeem
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {canRedeem ? 'Redeem Reward' : `Need ${reward.pointsCost - userPoints} more points`}
        </button>
      </div>
    </div>
  );
};

export default RewardCard;