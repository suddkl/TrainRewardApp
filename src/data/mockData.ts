import { Badge, Challenge, Journey, Reward, User, BadgeType } from '../types';

// Mock badges
export const badges: Record<BadgeType, Badge> = {
  bronze: {
    type: 'bronze',
    name: 'Bronze Explorer',
    description: 'Starting your railway adventure',
    milesRequired: 0,
    iconUrl: '/badges/bronze.svg'
  },
  silver: {
    type: 'silver',
    name: 'Silver Traveler',
    description: 'Traveled 200 miles by train',
    milesRequired: 200,
    iconUrl: '/badges/silver.svg'
  },
  gold: {
    type: 'gold',
    name: 'Gold Voyager',
    description: 'Traveled 700 miles by train',
    milesRequired: 700,
    iconUrl: '/badges/gold.svg'
  },
  diamond: {
    type: 'diamond',
    name: 'Diamond Commuter',
    description: 'Traveled 2500 miles by train',
    milesRequired: 2500,
    iconUrl: '/badges/diamond.svg'
  },
  platinum: {
    type: 'platinum',
    name: 'Platinum Railway Master',
    description: 'Traveled 8000 miles by train',
    milesRequired: 8000,
    iconUrl: '/badges/platinum.svg'
  }
};

// Helper to get the appropriate badge for miles traveled
export const getBadgeForMiles = (miles: number): Badge => {
  if (miles >= 8000) return badges.platinum;
  if (miles >= 2500) return badges.diamond;
  if (miles >= 700) return badges.gold;
  if (miles >= 200) return badges.silver;
  return badges.bronze;
};

// Mock challenges
export const mockChallenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Back-to-Back',
    description: 'Travel 5 weekdays in a row',
    type: 'backToBack',
    progress: 2,
    target: 5,
    completed: false
  },
  {
    id: 'challenge-2',
    title: 'Off-Peak Hero',
    description: 'Take 3 off-peak trips this month',
    type: 'offPeak',
    progress: 1,
    target: 3,
    completed: false
  },
  {
    id: 'challenge-3',
    title: 'Monthly Goal Master',
    description: 'Take 25 trips & travel 500+ miles this month',
    type: 'monthlyGoal',
    progress: 8,
    target: 25,
    completed: false
  }
];

// Sample Scottish stations
export const scottishStations = [
  'Glasgow Central',
  'Edinburgh Waverley',
  'Aberdeen',
  'Inverness',
  'Dundee',
  'Perth',
  'Stirling',
  'Aviemore',
  'Fort William',
  'Kyle of Lochalsh',
  'Oban',
  'Mallaig',
  'Pitlochry',
  'Gleneagles',
  'Ayr',
  'Dumfries',
  'Kilmarnock',
  'Motherwell',
  'Paisley Gilmour Street',
  'Haymarket'
];

// Calculate random miles between stations
const calculateRandomMiles = (): number => {
  return Math.floor(Math.random() * 100) + 5;
};

// Calculate points earned based on miles
const calculatePointsEarned = (miles: number): number => {
  return Number((miles * 0.0005).toFixed(2));
};

// Generate random time between 6:00 and 22:00
const generateRandomTime = (): string => {
  const hour = Math.floor(Math.random() * 16) + 6;
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// Generate a random journey
const generateRandomJourney = (userId: string, date: Date): Journey => {
  const startStation = scottishStations[Math.floor(Math.random() * scottishStations.length)];
  let endStation = scottishStations[Math.floor(Math.random() * scottishStations.length)];
  
  // Ensure start and end stations are different
  while (endStation === startStation) {
    endStation = scottishStations[Math.floor(Math.random() * scottishStations.length)];
  }
  
  const startTime = generateRandomTime();
  
  // Generate end time that's 30 mins to 3 hours after start time
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const journeyDuration = Math.floor(Math.random() * 150) + 30; // 30 to 180 minutes
  
  const endDateTime = new Date();
  endDateTime.setHours(startHour, startMinute + journeyDuration);
  
  const endTime = `${endDateTime.getHours().toString().padStart(2, '0')}:${endDateTime.getMinutes().toString().padStart(2, '0')}`;
  
  const distance = calculateRandomMiles();
  
  return {
    id: `journey-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    userId,
    date: date.toISOString().split('T')[0],
    startTime,
    endTime,
    startStation,
    endStation,
    distance,
    pointsEarned: calculatePointsEarned(distance)
  };
};

// Generate a month of random journeys for a user
export const generateMonthOfJourneys = (userId: string, monthOffset = 0): Journey[] => {
  const journeys: Journey[] = [];
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth() - monthOffset, 1);
  const monthEnd = new Date(today.getFullYear(), today.getMonth() - monthOffset + 1, 0);
  
  // Generate between 5 and 25 journeys for the month
  const journeyCount = Math.floor(Math.random() * 20) + 5;
  
  for (let i = 0; i < journeyCount; i++) {
    const journeyDate = new Date(
      monthStart.getTime() + Math.random() * (monthEnd.getTime() - monthStart.getTime())
    );
    journeys.push(generateRandomJourney(userId, journeyDate));
  }
  
  // Sort journeys by date
  return journeys.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Mock user data
export const mockUser: User = {
  id: 'user-123',
  name: 'Jamie MacDonald',
  email: 'jamie@example.com',
  age: 24,
  dob: '1999-05-12',
  scotRailId: 'SR-98765',
  totalMiles: 342,
  totalTrips: 15,
  points: 35,
  currentBadge: getBadgeForMiles(342),
  joinedDate: '2023-09-01'
};

// Mock rewards
export const mockRewards: Reward[] = [
  {
    id: 'reward-1',
    title: '£1 Off Next Ticket',
    description: 'Redeem 10 points for £1 off your next train ticket',
    pointsCost: 10,
    discountValue: 1
  },
  {
    id: 'reward-2',
    title: '£5 Off Next Ticket',
    description: 'Redeem 50 points for £5 off your next train ticket',
    pointsCost: 50,
    discountValue: 5
  },
  {
    id: 'reward-3',
    title: '£10 Off Next Ticket',
    description: 'Redeem 100 points for £10 off your next train ticket',
    pointsCost: 100,
    discountValue: 10
  },
  {
    id: 'reward-4',
    title: 'Free Single Journey',
    description: 'Redeem 200 points for a free single journey ticket',
    pointsCost: 200,
    discountValue: 20
  }
];

// Generate journeys for the mock user
export const mockJourneys = generateMonthOfJourneys(mockUser.id);