import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  const { authState } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (authState.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Join TrainReward</h1>
          <p className="mt-2 text-gray-600">
            Create an account to start earning rewards for your train travel
          </p>
        </div>
        
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;