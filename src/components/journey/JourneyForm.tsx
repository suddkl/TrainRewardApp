import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourneys } from '../../context/JourneyContext';
import { scottishStations } from '../../data/mockData';
import { Train, Calendar, Clock, MapPin } from 'lucide-react';

const JourneyForm: React.FC = () => {
  const navigate = useNavigate();
  const { addJourney } = useJourneys();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().slice(0, 10),
    startTime: '',
    endTime: '',
    startStation: '',
    endStation: '',
    distance: ''
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auto-calculate distance (mock function)
  const calculateDistance = (start: string, end: string): number => {
    // In a real app, this would call an API to get the actual distance
    // For now, just generate a random distance between 5 and 150 miles
    return Math.floor(Math.random() * 145) + 5;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for station changes to auto-calculate distance
    if (name === 'startStation' || name === 'endStation') {
      const otherStation = name === 'startStation' ? formData.endStation : formData.startStation;
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        // If both stations are selected, calculate distance
        ...(value && otherStation ? { 
          distance: calculateDistance(
            name === 'startStation' ? value : otherStation,
            name === 'endStation' ? value : otherStation
          ).toString() 
        } : {})
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
    
    // Validate date
    if (!formData.date) {
      errors.date = 'Date is required';
    }
    
    // Validate times
    if (!formData.startTime) {
      errors.startTime = 'Start time is required';
    }
    
    if (!formData.endTime) {
      errors.endTime = 'End time is required';
    } else if (formData.startTime && formData.endTime) {
      // Check if end time is after start time
      const startTimeParts = formData.startTime.split(':').map(Number);
      const endTimeParts = formData.endTime.split(':').map(Number);
      
      const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
      const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
      
      if (endMinutes <= startMinutes) {
        errors.endTime = 'End time must be after start time';
      }
    }
    
    // Validate stations
    if (!formData.startStation) {
      errors.startStation = 'Start station is required';
    }
    
    if (!formData.endStation) {
      errors.endStation = 'End station is required';
    } else if (formData.startStation === formData.endStation) {
      errors.endStation = 'End station must be different from start station';
    }
    
    // Validate distance
    if (!formData.distance) {
      errors.distance = 'Distance is required';
    } else {
      const distanceNum = parseFloat(formData.distance);
      if (isNaN(distanceNum) || distanceNum <= 0) {
        errors.distance = 'Distance must be a positive number';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Add journey
      addJourney({
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        startStation: formData.startStation,
        endStation: formData.endStation,
        distance: parseFloat(formData.distance)
      });
      
      // Redirect to journeys list after successful submission
      navigate('/journeys');
    } catch (error) {
      console.error('Failed to add journey:', error);
      setIsSubmitting(false);
    }
  };
  
  // Alternative method: scan ticket (mock functionality)
  const handleScanTicket = () => {
    // Simulate ticket scanning by filling in random journey details
    const startIndex = Math.floor(Math.random() * scottishStations.length);
    let endIndex = Math.floor(Math.random() * scottishStations.length);
    
    // Ensure start and end stations are different
    while (endIndex === startIndex) {
      endIndex = Math.floor(Math.random() * scottishStations.length);
    }
    
    // Generate random times (ensuring end is after start)
    const startHour = Math.floor(Math.random() * 16) + 6; // 6 AM to 10 PM
    const startMin = Math.floor(Math.random() * 60);
    const journeyDuration = Math.floor(Math.random() * 150) + 30; // 30 to 180 minutes
    
    const endDateTime = new Date();
    endDateTime.setHours(startHour, startMin + journeyDuration);
    
    const startTime = `${startHour.toString().padStart(2, '0')}:${startMin.toString().padStart(2, '0')}`;
    const endTime = `${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}`;
    
    const distance = calculateDistance(
      scottishStations[startIndex],
      scottishStations[endIndex]
    );
    
    setFormData({
      date: new Date().toISOString().slice(0, 10),
      startTime,
      endTime,
      startStation: scottishStations[startIndex],
      endStation: scottishStations[endIndex],
      distance: distance.toString()
    });
    
    // Clear any errors
    setFormErrors({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-blue-600 py-3 px-5">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Train className="mr-2" size={20} />
          Log Your Journey
        </h2>
      </div>
      
      <div className="p-5">
        <div className="mb-6">
          <button
            type="button"
            onClick={handleScanTicket}
            className="w-full bg-blue-100 text-blue-700 font-medium py-3 px-4 rounded hover:bg-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            📷 Scan Ticket (Demo)
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click to simulate scanning a ticket barcode
          </p>
        </div>
        
        <div className="mb-4 text-center">
          <span className="text-gray-500 text-sm">— or enter details manually —</span>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
              <Calendar size={16} className="mr-1" />
              Journey Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              max={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                formErrors.date ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
            />
            {formErrors.date && (
              <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startTime" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                <Clock size={16} className="mr-1" />
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.startTime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {formErrors.startTime && (
                <p className="text-red-500 text-xs mt-1">{formErrors.startTime}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                <Clock size={16} className="mr-1" />
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.endTime ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              />
              {formErrors.endTime && (
                <p className="text-red-500 text-xs mt-1">{formErrors.endTime}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="startStation" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                Start Station
              </label>
              <select
                id="startStation"
                name="startStation"
                value={formData.startStation}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.startStation ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              >
                <option value="">Select start station</option>
                {scottishStations.map(station => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
              {formErrors.startStation && (
                <p className="text-red-500 text-xs mt-1">{formErrors.startStation}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="endStation" className="block text-gray-700 text-sm font-medium mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                End Station
              </label>
              <select
                id="endStation"
                name="endStation"
                value={formData.endStation}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                  formErrors.endStation ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                }`}
              >
                <option value="">Select end station</option>
                {scottishStations.map(station => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>
              {formErrors.endStation && (
                <p className="text-red-500 text-xs mt-1">{formErrors.endStation}</p>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="distance" className="block text-gray-700 text-sm font-medium mb-2">
              Distance (miles)
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 transition-colors ${
                formErrors.distance ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
              }`}
              placeholder="Distance in miles"
              step="0.1"
              min="0"
            />
            {formErrors.distance && (
              <p className="text-red-500 text-xs mt-1">{formErrors.distance}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/journeys')}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Journey'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JourneyForm;