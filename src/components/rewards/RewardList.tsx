import React, { useState } from 'react';
import { Reward } from '../../types';
import RewardCard from './RewardCard';
import { Coins, AlertCircle } from 'lucide-react';

interface RewardListProps {
  rewards: Reward[];
  userPoints: number;
}

const RewardList: React.FC<RewardListProps> = ({ rewards, userPoints }) => {
  const [redeemedRewards, setRedeemedRewards] = useState<Record<string, number>>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  
  // Handle reward redemption
  const handleRedeem = (reward: Reward) => {
    setCurrentReward(reward);
    setShowConfirmation(true);
  };
  
  // Confirm redemption
  const confirmRedemption = () => {
    if (!currentReward) return;
    
    // Update redeemed count
    setRedeemedRewards(prev => ({
      ...prev,
      [currentReward.id]: (prev[currentReward.id] || 0) + 1
    }));
    
    // Reset state
    setShowConfirmation(false);
    setCurrentReward(null);
  };
  
  // Cancel redemption
  const cancelRedemption = () => {
    setShowConfirmation(false);
    setCurrentReward(null);
  };
  
  // Calculate remaining points after redemptions
  const getRemainingPoints = (): number => {
    const spentPoints = Object.entries(redeemedRewards).reduce((total, [rewardId, count]) => {
      const reward = rewards.find(r => r.id === rewardId);
      return total + (reward ? reward.pointsCost * count : 0);
    }, 0);
    
    return userPoints - spentPoints;
  };
  
  const remainingPoints = getRemainingPoints();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Coins className="mr-2" size={20} />
          Reward Shop
        </h2>
      </div>
      
      <div className="p-5">
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-800 font-medium">Your Points Balance</h3>
              <p className="text-sm text-gray-600">Use your points to earn travel discounts</p>
            </div>
            <div className="text-2xl font-bold text-blue-700">
              {remainingPoints} <span className="text-base text-blue-500">pts</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-5">Available Rewards</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {rewards.map(reward => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={remainingPoints}
              onRedeem={handleRedeem}
            />
          ))}
        </div>
        
        {Object.keys(redeemedRewards).length > 0 && (
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Redeemed Rewards</h3>
            
            <div className="space-y-3">
              {Object.entries(redeemedRewards).map(([rewardId, count]) => {
                const reward = rewards.find(r => r.id === rewardId);
                if (!reward) return null;
                
                return (
                  <div key={rewardId} className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-gray-800">{reward.title}</h4>
                      <p className="text-sm text-gray-600">Value: £{reward.discountValue.toFixed(2)}</p>
                    </div>
                    <div className="text-green-600 font-medium">
                      x{count}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              Redeem codes will be sent to your registered email. Keep an eye on your inbox!
            </div>
          </div>
        )}
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && currentReward && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
            <div className="mb-4 text-center">
              <AlertCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-800">Confirm Redemption</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to redeem <span className="font-medium">{currentReward.title}</span> for <span className="font-medium">{currentReward.pointsCost} points</span>?
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelRedemption}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmRedemption}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RewardList;