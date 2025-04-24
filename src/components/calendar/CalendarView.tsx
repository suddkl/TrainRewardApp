import React, { useState, useEffect } from 'react';
import { Journey } from '../../types';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface CalendarViewProps {
  journeys: Journey[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ journeys }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedJourneys, setSelectedJourneys] = useState<Journey[]>([]);
  
  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get first day of the month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Previous and next month navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDate(null);
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDate(null);
  };
  
  // Jump to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
  };
  
  // Check if a date has journeys
  const hasJourneys = (date: Date): boolean => {
    const dateString = date.toISOString().split('T')[0];
    return journeys.some(journey => journey.date === dateString);
  };
  
  // Get number of journeys for a date
  const getJourneyCount = (date: Date): number => {
    const dateString = date.toISOString().split('T')[0];
    return journeys.filter(journey => journey.date === dateString).length;
  };
  
  // Select a date to view journeys
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Update selected journeys when selected date changes
  useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const filtered = journeys.filter(journey => journey.date === dateString);
      setSelectedJourneys(filtered);
    } else {
      setSelectedJourneys([]);
    }
  }, [selectedDate, journeys]);
  
  // Format date
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Build calendar grid
  const calendarDays: (Date | null)[] = [];
  
  // Add empty cells for days before first day of month
  for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentYear, currentMonth, day));
  }
  
  // Calculate total miles for the month
  const totalMonthMiles = journeys
    .filter(journey => {
      const journeyDate = new Date(journey.date);
      return journeyDate.getMonth() === currentMonth && journeyDate.getFullYear() === currentYear;
    })
    .reduce((sum, journey) => sum + journey.distance, 0);
  
  // Calculate total journeys for the month
  const totalMonthJourneys = journeys
    .filter(journey => {
      const journeyDate = new Date(journey.date);
      return journeyDate.getMonth() === currentMonth && journeyDate.getFullYear() === currentYear;
    }).length;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Calendar className="mr-2" size={20} />
          Travel Calendar
        </h2>
      </div>
      
      <div className="p-5">
        {/* Monthly stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded text-center">
            <p className="text-sm text-gray-600">Month Total</p>
            <p className="text-xl font-bold text-blue-700">{totalMonthMiles.toFixed(1)} miles</p>
          </div>
          <div className="bg-green-50 p-3 rounded text-center">
            <p className="text-sm text-gray-600">Month Journeys</p>
            <p className="text-xl font-bold text-green-700">{totalMonthJourneys}</p>
          </div>
        </div>
        
        {/* Calendar navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          
          <h3 className="text-lg font-medium text-gray-800">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button
            onClick={nextMonth}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <button
          onClick={goToToday}
          className="mb-4 text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
        >
          Today
        </button>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {/* Day labels */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar cells */}
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="h-12 bg-gray-50 rounded"></div>;
            }
            
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const hasJourney = hasJourneys(date);
            const journeyCount = getJourneyCount(date);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={`h-12 rounded flex flex-col items-center justify-center relative 
                  ${isToday ? 'bg-blue-100' : hasJourney ? 'bg-green-50' : 'bg-gray-50'} 
                  ${isSelected ? 'ring-2 ring-blue-500' : ''} 
                  hover:bg-blue-50 transition-colors`}
              >
                <span className={`text-sm ${isToday ? 'font-bold text-blue-700' : 'text-gray-700'}`}>
                  {date.getDate()}
                </span>
                
                {hasJourney && (
                  <span className="text-xs text-green-600 font-medium">
                    {journeyCount} {journeyCount === 1 ? 'trip' : 'trips'}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Selected date journeys */}
        {selectedDate && (
          <div className="mt-6 border-t border-gray-200 pt-4">
            <h4 className="text-lg font-medium text-gray-800 mb-3">
              {formatDate(selectedDate)}
            </h4>
            
            {selectedJourneys.length > 0 ? (
              <div className="space-y-3">
                {selectedJourneys.map(journey => (
                  <div key={journey.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">
                        {journey.startTime} - {journey.endTime}
                      </span>
                      <span className="text-sm font-medium text-green-600">
                        +{journey.pointsEarned} pts
                      </span>
                    </div>
                    
                    <div className="font-medium text-gray-800 mb-1">
                      {journey.startStation} → {journey.endStation}
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {journey.distance} miles traveled
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No journeys recorded for this date
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;