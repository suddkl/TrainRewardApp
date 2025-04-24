import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileInfo from '../components/profile/ProfileInfo';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  
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
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Profile</h1>
      
      <ProfileInfo user={user} />
    </div>
  );
};

export default ProfilePage;