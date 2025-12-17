import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications] = useState(3);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    {
      id: 'overview',
      name: 'Overview',
      icon: '📊',
      path: '/dashboard',
      description: 'System overview and stats'
    },
    {
      id: 'devices',
      name: 'My Devices',
      icon: '⚡',
      path: '/dashboard/devices',
      description: 'Manage your energy devices'
    },
    {
      id: 'monitoring',
      name: 'Energy Monitor',
      icon: '📈',
      path: '/dashboard/monitoring',
      description: 'Real-time consumption'
    },
    {
      id: 'paygo',
      name: 'PAYGo & Credits',
      icon: '💳',
      path: '/dashboard/paygo',
      description: 'Payments and tokens'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: '📉',
      path: '/dashboard/analytics',
      description: 'Usage insights & reports'
    },
    {
      id: 'billing',
      name: 'Billing History',
      icon: '🧾',
      path: '/dashboard/billing',
      description: 'Payment records'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '⚙️',
      path: '/dashboard/settings',
      description: 'Account preferences'
    },
    {
      id: 'support',
      name: 'Support',
      icon: '💬',
      path: '/dashboard/support',
      description: 'Get help & resources'
    }
  ];

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <motion.aside
        className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo Section */}
        <div className="sidebar-header">
          <motion.div 
            className="sidebar-logo"
            whileHover={{ scale: 1.05 }}
          >
            <span className="logo-icon">⚡</span>
            {sidebarOpen && (
              <motion.span
                className="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Smart Energy
              </motion.span>
            )}
          </motion.div>
          
          <motion.button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </motion.button>
        </div>

        {/* User Info */}
        {sidebarOpen && user && (
          <motion.div 
            className="sidebar-user"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="user-avatar">
              {user.first_name?.[0]}{user.last_name?.[0]}
            </div>
            <div className="user-info">
              <p className="user-name">{user.first_name} {user.last_name}</p>
              <p className="user-role">{user.country || 'User'}</p>
            </div>
          </motion.div>
        )}

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span className="nav-icon">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <div className="nav-content">
                      <span className="nav-name">{item.name}</span>
                      <span className="nav-description">{item.description}</span>
                    </div>
                    {item.id === 'support' && notifications > 0 && (
                      <span className="nav-badge">{notifications}</span>
                    )}
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {sidebarOpen && (
            <motion.div
              className="sidebar-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="stat-item">
                <span className="stat-label">System Status</span>
                <div className="stat-value">
                  <span className="status-dot active"></span>
                  <span>Active</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.button
            className="logout-btn"
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="logout-icon">🚪</span>
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/* Top Bar */}
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <h1 className="page-title">
              {menuItems.find(item => isActive(item.path))?.name || 'Dashboard'}
            </h1>
            <p className="page-subtitle">
              {menuItems.find(item => isActive(item.path))?.description || 'Welcome back'}
            </p>
          </div>

          <div className="topbar-right">
            <div className="time-display">
              <span className="time">{formatTime()}</span>
              <span className="date">{formatDate()}</span>
            </div>

            <motion.button
              className="notification-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bell-icon">🔔</span>
              {notifications > 0 && (
                <span className="notification-badge">{notifications}</span>
              )}
            </motion.button>

            <motion.div 
              className="user-menu"
              whileHover={{ scale: 1.02 }}
            >
              <div className="user-avatar small">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
            </motion.div>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;