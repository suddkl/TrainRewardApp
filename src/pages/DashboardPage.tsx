import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJourneys } from '../context/JourneyContext';
import { MapPin, Calendar, Award, Compass } from 'lucide-react';

import StatsCard from '../components/dashboard/StatsCard';
import ChallengeCard from '../components/dashboard/ChallengeCard';
import BadgeProgress from '../components/dashboard/BadgeProgress';
import RecentJourneys from '../components/dashboard/RecentJourneys';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const { journeys, challenges, loadingJourneys, refreshChallenges } = useJourneys();
  
  // Refresh challenges on mount
  useEffect(() => {
    refreshChallenges();
  }, [refreshChallenges]);
  
  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Show loading state if auth is still loading
  if (authState.isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  const user = authState.user;
  if (!user) return null;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
      <p className="text-gray-600 mb-8">Track your railway journeys and earn rewards.</p>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Miles" 
          value={`${user.totalMiles}`}
          icon={Compass}
          color="blue"
        />
        <StatsCard 
          title="Total Journeys" 
          value={user.totalTrips}
          icon={Calendar}
          color="green"
        />
        <StatsCard 
          title="Current Points" 
          value={user.points}
          icon={Award}
          color="purple"
          trend={{ value: 12, label: "this month" }}
        />
        <StatsCard 
          title="Current Badge" 
          value={user.currentBadge.name}
          icon={MapPin}
          color="orange"
        />
      </div>
      
      {/* Challenges and badge section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Challenges</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Complete all challenges</strong> by the end of the month to earn 10 bonus points!
            </p>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Badge</h2>
          <BadgeProgress user={user} />
        </div>
      </div>
      
      {/* Recent journeys */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Journeys</h2>
        <RecentJourneys journeys={journeys} isLoading={loadingJourneys} />
      </div>
    </div>
  );
};

export default DashboardPage;