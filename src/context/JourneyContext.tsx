import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Journey, Challenge } from '../types';
import { mockJourneys, mockChallenges, getBadgeForMiles } from '../data/mockData';
import { useAuth } from './AuthContext';

// Context interface
interface JourneyContextType {
  journeys: Journey[];
  challenges: Challenge[];
  addJourney: (journey: Omit<Journey, 'id' | 'userId' | 'pointsEarned'>) => void;
  refreshChallenges: () => void;
  loadingJourneys: boolean;
}

// Create the context
const JourneyContext = createContext<JourneyContextType>({
  journeys: [],
  challenges: [],
  addJourney: () => {},
  refreshChallenges: () => {},
  loadingJourneys: false
});

// Provider component
export const JourneyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { authState } = useAuth();
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [loadingJourneys, setLoadingJourneys] = useState<boolean>(true);

  // Load journeys for the current user
  useEffect(() => {
    const loadJourneys = async () => {
      if (authState.user) {
        setLoadingJourneys(true);
        try {
          // In a real app, this would fetch from an API
          // For now, use mock data
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
          
          // Filter journeys for the current user
          const userJourneys = mockJourneys.filter(journey => journey.userId === authState.user?.id);
          setJourneys(userJourneys);
          
          // Update challenges based on journeys
          refreshChallenges();
        } catch (error) {
          console.error('Failed to load journeys:', error);
        } finally {
          setLoadingJourneys(false);
        }
      } else {
        setJourneys([]);
        setLoadingJourneys(false);
      }
    };

    loadJourneys();
  }, [authState.user]);

  // Add a new journey
  const addJourney = (journeyData: Omit<Journey, 'id' | 'userId' | 'pointsEarned'>) => {
    if (!authState.user) return;

    // Calculate points earned based on distance
    const pointsEarned = Number((journeyData.distance * 0.0005).toFixed(2));
    
    // Create new journey object
    const newJourney: Journey = {
      id: `journey-${Date.now()}`,
      userId: authState.user.id,
      pointsEarned,
      ...journeyData
    };
    
    // Add to journeys
    setJourneys(prev => [...prev, newJourney]);
    
    // Update user stats in local storage
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        totalMiles: authState.user.totalMiles + journeyData.distance,
        totalTrips: authState.user.totalTrips + 1,
        points: authState.user.points + pointsEarned,
        // Update badge if necessary
        currentBadge: getBadgeForMiles(authState.user.totalMiles + journeyData.distance)
      };
      
      localStorage.setItem('trainRewardUser', JSON.stringify(updatedUser));
      
      // Force a refresh to update the UI
      window.location.reload();
    }
    
    // Refresh challenges
    refreshChallenges();
  };

  // Refresh challenges based on current journeys
  const refreshChallenges = () => {
    if (!authState.user) return;
    
    // Get the current month's journeys
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const thisMonthJourneys = journeys.filter(journey => {
      const journeyDate = new Date(journey.date);
      return journeyDate.getMonth() === currentMonth && journeyDate.getFullYear() === currentYear;
    });
    
    // Update Back-to-Back challenge (5 weekdays in a row)
    let maxConsecutiveWeekdays = 0;
    let currentStreak = 0;
    
    // Sort journeys by date
    const sortedJourneys = [...thisMonthJourneys].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get unique dates (in case of multiple journeys per day)
    const uniqueDates = [...new Set(sortedJourneys.map(j => j.date))];
    
    // Check for consecutive weekdays
    for (let i = 0; i < uniqueDates.length; i++) {
      const date = new Date(uniqueDates[i]);
      const dayOfWeek = date.getDay();
      
      // Check if it's a weekday (1-5 = Monday-Friday)
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (i > 0) {
          const prevDate = new Date(uniqueDates[i - 1]);
          const dayDiff = Math.round((date.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
          
          if (dayDiff === 1) {
            // Consecutive day
            currentStreak++;
          } else {
            // Reset streak
            currentStreak = 1;
          }
        } else {
          currentStreak = 1;
        }
        
        maxConsecutiveWeekdays = Math.max(maxConsecutiveWeekdays, currentStreak);
      }
    }
    
    // Update Off-Peak challenge (3 off-peak trips)
    // For simplicity, we'll consider journeys starting between 10:00-15:00 and after 19:00 as off-peak
    const offPeakJourneys = thisMonthJourneys.filter(journey => {
      const hourStr = journey.startTime.split(':')[0];
      const hour = parseInt(hourStr, 10);
      return (hour >= 10 && hour < 15) || hour >= 19;
    });
    
    // Update Monthly Goal challenge (25 trips & 500+ miles)
    const totalMonthlyTrips = thisMonthJourneys.length;
    const totalMonthlyMiles = thisMonthJourneys.reduce((sum, journey) => sum + journey.distance, 0);
    
    // Update the challenges array
    const updatedChallenges = challenges.map(challenge => {
      switch (challenge.type) {
        case 'backToBack':
          return {
            ...challenge,
            progress: Math.min(maxConsecutiveWeekdays, challenge.target),
            completed: maxConsecutiveWeekdays >= challenge.target
          };
        case 'offPeak':
          return {
            ...challenge,
            progress: Math.min(offPeakJourneys.length, challenge.target),
            completed: offPeakJourneys.length >= challenge.target
          };
        case 'monthlyGoal':
          // For this challenge, progress is based on trips (out of 25)
          return {
            ...challenge,
            progress: Math.min(totalMonthlyTrips, challenge.target),
            // Completed only if BOTH conditions are met (25 trips AND 500+ miles)
            completed: totalMonthlyTrips >= challenge.target && totalMonthlyMiles >= 500
          };
        default:
          return challenge;
      }
    });
    
    setChallenges(updatedChallenges);
  };

  return (
    <JourneyContext.Provider value={{ 
      journeys, 
      challenges, 
      addJourney, 
      refreshChallenges,
      loadingJourneys
    }}>
      {children}
    </JourneyContext.Provider>
  );
};

// Custom hook to use the journey context
export const useJourneys = () => useContext(JourneyContext);

export default JourneyContext;