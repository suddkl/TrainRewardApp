import React, { useState } from 'react';
import { Journey } from '../../types';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, PlusCircle } from 'lucide-react';
import LoadingSpinner from '../layout/LoadingSpinner';

interface JourneyListProps {
  journeys: Journey[];
  isLoading: boolean;
}

const JourneyList: React.FC<JourneyListProps> = ({ journeys, isLoading }) => {
  const [sortBy, setSortBy] = useState<'date' | 'distance'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  
  // Sort journeys
  const sortedJourneys = [...journeys].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return sortOrder === 'asc'
        ? a.distance - b.distance
        : b.distance - a.distance;
    }
  });
  
  // Toggle sort order
  const toggleSort = (field: 'date' | 'distance') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Group journeys by month
  const groupJourneysByMonth = (journeysToGroup: Journey[]) => {
    const grouped: Record<string, Journey[]> = {};
    
    journeysToGroup.forEach(journey => {
      const date = new Date(journey.date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      
      grouped[monthYear].push(journey);
    });
    
    return grouped;
  };
  
  const groupedJourneys = groupJourneysByMonth(sortedJourneys);
  
  // Calculate stats
  const totalDistance = journeys.reduce((sum, journey) => sum + journey.distance, 0);
  const totalPoints = journeys.reduce((sum, journey) => sum + journey.pointsEarned, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">Your Journeys</h2>
        <Link
          to="/journeys/new"
          className="text-blue-100 hover:text-white text-sm flex items-center transition-colors"
        >
          <PlusCircle size={16} className="mr-1" />
          Add Journey
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Journey stats */}
          <div className="grid grid-cols-2 gap-4 p-5 bg-blue-50 border-b border-blue-100">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Distance</p>
              <p className="text-xl font-bold text-blue-700">{totalDistance.toFixed(1)} miles</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Points Earned</p>
              <p className="text-xl font-bold text-green-600">+{totalPoints.toFixed(2)} pts</p>
            </div>
          </div>
          
          {/* Filter and sort controls */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {journeys.length} {journeys.length === 1 ? 'journey' : 'journeys'} recorded
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => toggleSort('date')}
                className={`text-sm px-3 py-1 rounded ${
                  sortBy === 'date'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              
              <button
                onClick={() => toggleSort('distance')}
                className={`text-sm px-3 py-1 rounded ${
                  sortBy === 'distance'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Distance {sortBy === 'distance' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
          
          {/* Journey list */}
          {Object.keys(groupedJourneys).length > 0 ? (
            <div className="divide-y divide-gray-100">
              {Object.entries(groupedJourneys).map(([monthYear, monthJourneys]) => (
                <div key={monthYear} className="py-2">
                  <h3 className="px-4 py-2 font-medium text-gray-700 bg-gray-50">
                    {monthYear}
                  </h3>
                  
                  <ul className="divide-y divide-gray-100">
                    {monthJourneys.map(journey => (
                      <li key={journey.id} className="px-4 py-3 hover:bg-blue-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <Calendar size={14} className="text-gray-400 mr-1" />
                              <span className="text-sm text-gray-600">{formatDate(journey.date)}</span>
                            </div>
                            
                            <div className="font-medium flex items-center">
                              <span className="text-gray-800">{journey.startStation}</span>
                              <ArrowRight size={14} className="mx-2 text-gray-400" />
                              <span className="text-gray-800">{journey.endStation}</span>
                            </div>
                            
                            <div className="text-xs text-gray-500 mt-1">
                              {journey.startTime} - {journey.endTime}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">
                              {journey.distance} miles
                            </div>
                            <div className="text-sm text-green-600">
                              +{journey.pointsEarned} pts
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-gray-500 mb-4">You haven't recorded any journeys yet</p>
              <Link
                to="/journeys/new"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Log Your First Journey
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JourneyList;