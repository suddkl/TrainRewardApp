import React from 'react';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJourneys } from '../context/JourneyContext';
import { PlusCircle } from 'lucide-react';
import JourneyForm from '../components/journey/JourneyForm';
import JourneyList from '../components/journey/JourneyList';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const JourneysPage: React.FC = () => {
  const { authState } = useAuth();
  const { journeys, loadingJourneys } = useJourneys();
  
  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Show loading state if auth is still loading
  if (authState.isLoading) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Journeys</h1>
        <Link
          to="/journeys/new"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center"
        >
          <PlusCircle size={18} className="mr-2" />
          Add Journey
        </Link>
      </div>
      
      <Routes>
        <Route 
          path="/" 
          element={<JourneyList journeys={journeys} isLoading={loadingJourneys} />} 
        />
        <Route path="/new" element={<JourneyForm />} />
      </Routes>
    </div>
  );
};

export default JourneysPage;