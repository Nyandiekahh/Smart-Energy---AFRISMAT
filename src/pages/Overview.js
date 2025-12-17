import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Overview.css';

const Overview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    currentPower: 2.4,
    todayUsage: 18.5,
    creditBalance: 245.50,
    daysRemaining: 12,
    efficiency: 94
  });

  const [devices, setDevices] = useState([
    { id: 1, name: 'DC Logger #001', code: 'DEV-001', power: '2.4 kW', status: 'Active', type: 'Solar Panel Array' },
    { id: 2, name: 'DC Logger #002', code: 'DEV-002', power: '0.0 kW', status: 'Standby', type: 'Backup System' },
    { id: 3, name: 'Battery Bank #1', code: 'BAT-001', power: '1.2 kW', status: 'Charging', type: 'Storage' }
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { id: 1, message: 'Payment of KES 500 received', time: '2 hours ago', type: 'payment' },
    { id: 2, message: 'Peak usage detected at 12:30 PM', time: '5 hours ago', type: 'alert' },
    { id: 3, message: 'DC Logger #001 connected successfully', time: '1 day ago', type: 'device' }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="overview-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">Welcome back, {user?.first_name || 'User'}</h2>
          <p className="welcome-subtitle">
            Here's your energy system overview. Need help? Navigate to support from the side menu.
          </p>
        </div>
        <div className="welcome-illustration">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle cx="60" cy="60" r="50" fill="#52b788" opacity="0.1"/>
            <path d="M60 30 L75 55 H65 L70 80 L45 50 H55 L50 30 Z" fill="#52b788"/>
          </svg>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="quick-stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon-wrapper">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="10" fill="white" opacity="0.2"/>
              <path d="M25 15 L30 25 H27 L29 35 L20 23 H23 L21 15 Z" fill="white"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Current Power</h3>
            <p className="stat-value">{stats.currentPower} kW</p>
            <p className="stat-change positive">↑ 0.3 kW from average</p>
          </div>
        </div>

        <div className="stat-card purple">
          <div className="stat-icon-wrapper">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="10" fill="white" opacity="0.2"/>
              <circle cx="25" cy="25" r="12" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M25 15 L25 25 L32 25" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Credit Balance</h3>
            <p className="stat-value">KES {stats.creditBalance}</p>
            <p className="stat-duration">≈ {stats.daysRemaining} days remaining</p>
          </div>
        </div>

        <div className="stat-card green">
          <div className="stat-icon-wrapper">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
              <rect width="50" height="50" rx="10" fill="white" opacity="0.2"/>
              <path d="M15 30 L20 25 L25 28 L30 20 L35 25" stroke="white" strokeWidth="2" fill="none"/>
            </svg>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Today's Usage</h3>
            <p className="stat-value">{stats.todayUsage} kWh</p>
            <div className="progress-bar-mini">
              <div className="progress-fill" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-content-grid">
        {/* Connected Devices Table */}
        <div className="content-card">
          <div className="card-header">
            <h3 className="card-title">Connected Devices</h3>
            <button 
              className="view-all-link"
              onClick={() => navigate('/dashboard/devices')}
            >
              View All
            </button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Device Name</th>
                  <th>Device Code</th>
                  <th>Type</th>
                  <th>Power</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id}>
                    <td className="device-name">{device.name}</td>
                    <td className="device-code">{device.code}</td>
                    <td className="device-type">{device.type}</td>
                    <td className="device-power">{device.power}</td>
                    <td>
                      <span className={`status-badge ${device.status.toLowerCase()}`}>
                        {device.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="sidebar-cards">
          {/* System Status Card */}
          <div className="info-card blue-card">
            <div className="info-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="white"/>
                <path d="M20 10 L20 22 M20 26 L20 28" stroke="#2196F3" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="info-content">
              <h4 className="info-title">System Status</h4>
              <p className="info-value">All Systems Operational</p>
              <div className="info-detail">
                <span className="detail-label">Efficiency:</span>
                <span className="detail-value">{stats.efficiency}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill-blue" style={{width: `${stats.efficiency}%`}}></div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="info-card purple-card">
            <h4 className="actions-title">Quick Actions</h4>
            <div className="actions-list">
              <button 
                className="action-btn"
                onClick={() => navigate('/dashboard/paygo')}
              >
                <span className="action-icon">💳</span>
                <span>Top Up Credit</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate('/dashboard/devices')}
              >
                <span className="action-icon">⚡</span>
                <span>Manage Devices</span>
              </button>
              <button 
                className="action-btn"
                onClick={() => navigate('/dashboard/analytics')}
              >
                <span className="action-icon">📊</span>
                <span>View Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="content-card activity-card">
        <div className="card-header">
          <h3 className="card-title">Recent Activity</h3>
        </div>
        <div className="activity-list">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="activity-item">
              <div className={`activity-dot ${activity.type}`}></div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;