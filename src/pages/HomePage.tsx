import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Users, Award, Map, BadgeCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { authState } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="bg-blue-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel more by train. <br />Earn rewards. Save Scotland.
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-6">
              TrainReward makes every journey count by turning your train travel into points, badges, and real rewards.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              {authState.isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                >
                  <Train className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Create an Account
                  </Link>
                  <Link
                    to="/login"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="md:w-1/2 md:pl-10">
            <div className="bg-blue-800 rounded-lg p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 rounded-bl-3xl w-20 h-20 flex items-center justify-center">
                <BadgeCheck className="text-white h-12 w-12" />
              </div>
              
              <h3 className="text-xl font-bold mb-4">Start earning today</h3>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-3 mt-0.5">
                    <Train className="h-4 w-4" />
                  </div>
                  <p>Track your journeys across Scotland's railway network</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-3 mt-0.5">
                    <Award className="h-4 w-4" />
                  </div>
                  <p>Complete monthly challenges to earn bonus points</p>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-600 p-2 rounded-full mr-3 mt-0.5">
                    <Map className="h-4 w-4" />
                  </div>
                  <p>Reduce your carbon footprint while exploring Scotland</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How TrainReward Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Train className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Log Your Journeys</h3>
              <p className="text-gray-600">
                Scan your ticket or manually log each train trip you take across Scotland.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Earn Points & Badges</h3>
              <p className="text-gray-600">
                Get points for every mile traveled and unlock badges as you reach milestones.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-purple-100 text-purple-600 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
                <BadgeCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Redeem Rewards</h3>
              <p className="text-gray-600">
                Convert your points into ticket discounts and travel vouchers.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose TrainReward?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">For Commuters</h3>
                    <p className="text-gray-600">
                      Get rewarded for your daily commute and earn points faster with consecutive weekday travel.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <Map className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">For Explorers</h3>
                    <p className="text-gray-600">
                      Discover more of Scotland while earning badges for visiting new stations and routes.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">For Everyone</h3>
                    <p className="text-gray-600">
                      Reduce your carbon footprint, save money, and enjoy a more relaxed travel experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-12">
              <div className="bg-gray-100 rounded-lg p-8 relative overflow-hidden">
                <div className="bg-blue-600 text-white font-bold px-4 py-1 rounded-full absolute top-4 right-4">
                  Beta
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Join Scotland's Railway Revolution
                </h3>
                
                <p className="text-gray-600 mb-6">
                  TrainReward is partnering with Scottish transport providers to transform how we travel. Be part of the sustainability movement while enjoying the benefits of train travel.
                </p>
                
                <Link
                  to="/signup"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Start Your Journey Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Rewarded?</h2>
          <p className="text-blue-100 text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of travelers across Scotland who are already earning rewards for their train journeys.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Create an Account
            </Link>
            <Link
              to="/login"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;