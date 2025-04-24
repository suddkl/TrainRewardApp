import React from 'react';
import { Journey } from '../../types';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RecentJourneysProps {
  journeys: Journey[];
  isLoading: boolean;
}

const RecentJourneys: React.FC<RecentJourneysProps> = ({ journeys, isLoading }) => {
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  
  // Get recent journeys (last 5)
  const recentJourneys = [...journeys]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <CalendarDays size={18} className="mr-2" />
          Recent Journeys
        </h3>
        <Link to="/journeys" className="text-sm text-blue-100 hover:text-white transition-colors">
          View All
        </Link>
      </div>
      
      <div className="p-5">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        ) : recentJourneys.length > 0 ? (
          <div className="space-y-4">
            {recentJourneys.map(journey => (
              <div key={journey.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {formatDate(journey.date)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {journey.startTime} - {journey.endTime}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <div className="flex-1 truncate">
                    {journey.startStation}
                  </div>
                  <ArrowRight size={14} className="mx-2 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 truncate text-right">
                    {journey.endStation}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-1 text-xs">
                  <span>{journey.distance} miles</span>
                  <span className="text-green-600">+{journey.pointsEarned} points</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-2">No journeys recorded yet</p>
            <Link 
              to="/journeys/new" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              Log Your First Journey
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentJourneys;