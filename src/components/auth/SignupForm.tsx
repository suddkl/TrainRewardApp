import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserPlus } from 'lucide-react';
import LoadingSpinner from '../layout/LoadingSpinner';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const { signup, authState } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    dob: '',
    scotRailId: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    // Age validation
    if (!formData.age) {
      errors.age = 'Age is required';
    } else {
      const ageNum = parseInt(formData.age, 10);
      if (isNaN(ageNum) || ageNum < 12 || ageNum > 120) {
        errors.age = 'Age must be between 12 and 120';
      }
    }
    
    // Date of birth validation
    if (!formData.dob) {
      errors.dob = 'Date of birth is required';
    } else {
      const today = new Date();
      const dobDate = new Date(formData.dob);
      if (dobDate > today) {
        errors.dob = 'Date of birth cannot be in the future';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age, 10),
        dob: formData.dob,
        scotRailId: formData.scotRailId || undefined
      });
      
      // If signup successful, redirect to dashboard
      if (!authState.error) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-4 px-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <UserPlus className="mr-2" size={20} />
          Create Your TrainReward Account
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="py-6 px-8">
        {authState.error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
            {authState.error}
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
              formErrors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            placeholder="Enter your full name"
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>
        
        <div className="mb-4">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
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
              placeholder="Create a password"
            />
            {formErrors.password && (
              <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                formErrors.confirmPassword ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Confirm password"
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="age" className="block text-gray-700 text-sm font-semibold mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                formErrors.age ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Your age"
              min="0"
              max="120"
            />
            {formErrors.age && (
              <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="dob" className="block text-gray-700 text-sm font-semibold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                formErrors.dob ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {formErrors.dob && (
              <p className="text-red-500 text-xs mt-1">{formErrors.dob}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="scotRailId" className="block text-gray-700 text-sm font-semibold mb-2">
            ScotRail ID (Optional)
          </label>
          <input
            type="text"
            id="scotRailId"
            name="scotRailId"
            value={formData.scotRailId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            placeholder="Your ScotRail ID (if you have one)"
          />
          <p className="text-gray-500 text-xs mt-1">
            Enter your ScotRail ID if you have one for future integration.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-800">
                Privacy Policy
              </a>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={authState.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex justify-center items-center"
        >
          {authState.isLoading ? (
            <LoadingSpinner size="small" color="white" />
          ) : (
            <>Create Account</>
          )}
        </button>
      </form>
      
      <div className="bg-gray-50 py-4 px-8 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;