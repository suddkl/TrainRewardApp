import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn } from 'lucide-react';
import LoadingSpinner from '../layout/LoadingSpinner';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, authState } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = { ...formErrors };
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await login({
        email: formData.email,
        password: formData.password
      });
      
      // If login successful, redirect to dashboard
      if (!authState.error) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // For demo purposes - auto-fill with mock user data
  const fillDemoUser = () => {
    setFormData({
      email: 'jamie@example.com',
      password: 'demopassword'
    });
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <LogIn className="mr-2" size={20} />
          Log in to TrainReward
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="py-6 px-8">
        {authState.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {authState.error}
          </div>
        )}
        
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
              formErrors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            placeholder="Your email address"
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
              formErrors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            placeholder="Your password"
          />
          {formErrors.password && (
            <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>
          
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            Forgot your password?
          </a>
        </div>
        
        <button
          type="submit"
          disabled={authState.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex justify-center items-center"
        >
          {authState.isLoading ? (
            <LoadingSpinner size="small" color="white" />
          ) : (
            <>Sign In</>
          )}
        </button>
        
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={fillDemoUser}
            className="text-blue-600 text-sm hover:text-blue-800 hover:underline"
          >
            Use demo account
          </button>
        </div>
      </form>
      
      <div className="bg-gray-50 py-4 px-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;