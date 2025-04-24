import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useJourneys } from '../context/JourneyContext';
import CalendarView from '../components/calendar/CalendarView';
import LoadingSpinner from '../components/layout/LoadingSpinner';

const CalendarPage: React.FC = () => {
  const { authState } = useAuth();
  const { journeys, loadingJourneys } = useJourneys();
  
  // Redirect to login if not authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Show loading state if auth is still loading
  if (authState.isLoading || loadingJourneys) {
    return <LoadingSpinner fullScreen />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Travel Calendar</h1>
      
      <CalendarView journeys={journeys} />
    </div>
  );
};

export default CalendarPage;