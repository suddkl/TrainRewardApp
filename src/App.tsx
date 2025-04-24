import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { JourneyProvider } from './context/JourneyContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import JourneysPage from './pages/JourneysPage';
import CalendarPage from './pages/CalendarPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackgroundAnimation from './components/layout/BackgroundAnimation';

function App() {
  return (
    <AuthProvider>
      <JourneyProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <BackgroundAnimation />
            <Header />
            
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/journeys/*" element={<JourneysPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </JourneyProvider>
    </AuthProvider>
  );
}

export default App;