// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  dob: string;
  scotRailId?: string;
  totalMiles: number;
  totalTrips: number;
  points: number;
  currentBadge: Badge;
  joinedDate: string;
}

// Journey related types
export interface Journey {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  startStation: string;
  endStation: string;
  distance: number;
  pointsEarned: number;
}

// Challenge related types
export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'backToBack' | 'offPeak' | 'monthlyGoal';
  progress: number;
  target: number;
  completed: boolean;
}

// Badge related types
export type BadgeType = 'bronze' | 'silver' | 'gold' | 'diamond' | 'platinum';

export interface Badge {
  type: BadgeType;
  name: string;
  description: string;
  milesRequired: number;
  iconUrl: string;
}

// Reward related types
export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  discountValue: number;
}

// Auth related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  age: number;
  dob: string;
  scotRailId?: string;
}