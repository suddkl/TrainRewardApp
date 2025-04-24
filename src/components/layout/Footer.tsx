import React from 'react';
import { Train, Heart, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Train className="h-6 w-6 mr-2" />
            <span className="text-lg font-semibold">TrainReward</span>
          </div>
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-blue-200 text-sm">
              Encouraging sustainable travel across Scotland.
            </p>
            <p className="text-blue-200 text-sm mt-1">
              Made with <Heart className="h-4 w-4 inline text-red-400" /> for the environment.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-blue-200 hover:text-white transition-colors text-sm flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              ScotRail Partnership
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors text-sm flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Terms & Conditions
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors text-sm flex items-center">
              <ExternalLink className="h-4 w-4 mr-1" />
              Privacy Policy
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-blue-800 text-center text-blue-300 text-xs">
          <p>© {new Date().getFullYear()} TrainReward. All rights reserved.</p>
          <p className="mt-1">
            This is a demo application and not affiliated with ScotRail or any official railway company.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;