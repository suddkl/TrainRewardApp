import React from 'react';
import { User } from '../../types';
import { User as UserIcon, Mail, Calendar, CreditCard, MapPin } from 'lucide-react';

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user }) => {
  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <UserIcon className="mr-2" size={20} />
          Your Profile
        </h2>
      </div>
      
      <div className="p-5">
        <div className="flex flex-col sm:flex-row items-center mb-6">
          <div className="bg-blue-100 rounded-full p-6 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
            <span className="text-3xl font-bold text-blue-600">
              {user.name.charAt(0)}
            </span>
          </div>
          
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-bold text-gray-800">{user.name}</h3>
            <p className="text-gray-600">{user.currentBadge.name}</p>
            <p className="text-sm text-blue-600">Member since {formatDate(user.joinedDate)}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h4>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium text-gray-800">{formatDate(user.dob)}</p>
              </div>
            </div>
            
            {user.scotRailId && (
              <div className="flex items-center">
                <CreditCard className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">ScotRail ID</p>
                  <p className="font-medium text-gray-800">{user.scotRailId}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium text-gray-800">Scotland</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Travel Statistics</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Distance</p>
              <p className="text-2xl font-bold text-blue-700">{user.totalMiles} miles</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Journeys</p>
              <p className="text-2xl font-bold text-green-700">{user.totalTrips}</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">Current Points</p>
              <p className="text-2xl font-bold text-purple-700">{user.points} pts</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <p className="text-sm text-gray-600">CO₂ Saved</p>
              <p className="text-2xl font-bold text-orange-700">{Math.round(user.totalMiles * 0.15)} kg</p>
              <p className="text-xs text-gray-500">vs. car travel</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;