import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import TestAuth from './pages/TestAuth';
import TestLocation from './pages/TestLocation';
import Explore from './pages/Explore';
import PlanTrip from './pages/PlanTrip';
import MyRoutes from './pages/MyRoutes';
import Profile from './pages/Profile';
import MyJournal from './pages/MyJournal';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LocationProvider>
          <div className="min-h-screen bg-neutral">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<TestAuth />} />
              <Route path="/test-location" element={<TestLocation />} />
              <Route path="/profile" element={<Profile />} />
              
              <Route path="/explore" element={<Explore />} />
              
              <Route path="/plan-trip" element={<PlanTrip />} />
              <Route path="/my-routes" element={<MyRoutes />} />
              
              <Route path="/my-journal" element={<MyJournal />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </LocationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
