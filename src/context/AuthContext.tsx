import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { AuthState, LoginCredentials, SignupData, User } from '../types';
import { mockUser } from '../data/mockData';

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Create the context
const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}>({
  authState: initialAuthState,
  login: async () => {},
  signup: async () => {},
  logout: () => {}
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('trainRewardUser');
      
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser) as User;
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          // Handle invalid stored data
          localStorage.removeItem('trainRewardUser');
          setAuthState({
            ...initialAuthState,
            isLoading: false
          });
        }
      } else {
        setAuthState({
          ...initialAuthState,
          isLoading: false
        });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    // Set loading state
    setAuthState({
      ...authState,
      isLoading: true,
      error: null
    });

    try {
      // Mock authentication - in a real app, this would be an API call
      // For now, just check if the email matches our mock user
      if (credentials.email === mockUser.email) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update auth state with the mock user
        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
        
        // Store user in localStorage
        localStorage.setItem('trainRewardUser', JSON.stringify(mockUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };

  // Signup function
  const signup = async (data: SignupData): Promise<void> => {
    // Set loading state
    setAuthState({
      ...authState,
      isLoading: true,
      error: null
    });

    try {
      // Mock signup - in a real app, this would be an API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user based on signup data
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        age: data.age,
        dob: data.dob,
        scotRailId: data.scotRailId,
        totalMiles: 0,
        totalTrips: 0,
        points: 0,
        currentBadge: {
          type: 'bronze',
          name: 'Bronze Explorer',
          description: 'Starting your railway adventure',
          milesRequired: 0,
          iconUrl: '/badges/bronze.svg'
        },
        joinedDate: new Date().toISOString().split('T')[0]
      };
      
      // Update auth state with the new user
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });
      
      // Store user in localStorage
      localStorage.setItem('trainRewardUser', JSON.stringify(newUser));
    } catch (error) {
      setAuthState({
        ...authState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Signup failed'
      });
    }
  };

  // Logout function
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('trainRewardUser');
    
    // Reset auth state
    setAuthState({
      ...initialAuthState,
      isLoading: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;