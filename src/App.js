import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import Devices from './pages/Devices';
import PAYGo from './pages/PAYGo';
import Monitoring from './pages/Monitoring';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Dashboard with nested routes */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Overview />} />
            <Route path="devices" element={<Devices />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="paygo" element={<PAYGo />} />
            <Route path="analytics" element={<div>Analytics Page - Coming Soon</div>} />
            <Route path="billing" element={<div>Billing Page - Coming Soon</div>} />
            <Route path="settings" element={<div>Settings Page - Coming Soon</div>} />
            <Route path="support" element={<div>Support Page - Coming Soon</div>} />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;