import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // DEMO MODE: Use demo credentials for testing without backend
      // Demo credentials: email: demo@smartenergy.africa, password: demo123
      
      const isDemoLogin = formData.email === 'demo@smartenergy.africa' && formData.password === 'demo123';
      
      if (isDemoLogin) {
        // Demo login - simulate successful authentication
        const demoUser = {
          id: 1,
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@smartenergy.africa',
          country: 'Kenya',
          phone: '+254722114521'
        };
        
        const demoToken = 'demo_token_' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        // Try real backend API
        const response = await axios.post('http://localhost:8000/api/auth/login/', {
          email: formData.email,
          password: formData.password
        });

        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error
        setErrors({
          general: error.response.data.message || 'Invalid credentials. Please try again.'
        });
      } else if (error.request) {
        // Request made but no response - suggest demo mode
        setErrors({
          general: 'Unable to connect to server. Try demo login: demo@smartenergy.africa / demo123'
        });
      } else {
        setErrors({
          general: 'An unexpected error occurred. Please try again.'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="auth-page">
      {/* Background Decoration */}
      <div className="auth-background">
        <div className="sun-glow"></div>
        <div className="grid-overlay"></div>
      </div>

      {/* Back to Home Button */}
      <Link to="/" className="back-home">
        <span className="back-arrow">←</span>
        Back to Home
      </Link>

      <div className="auth-container">
        {/* Left Side - Branding */}
        <motion.div 
          className="auth-brand"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="brand-content">
            <motion.div 
              className="brand-icon"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚡
            </motion.div>
            <h1 className="brand-title">
              Welcome Back to
              <br />
              <span className="text-gradient">Smart Energy Africa</span>
            </h1>
            <p className="brand-subtitle">
              Empowering communities across Africa with intelligent energy solutions
            </p>

            <div className="brand-stats">
              <div className="stat-item">
                <div className="stat-icon">🌍</div>
                <div className="stat-text">
                  <strong>50+</strong>
                  <span>African Communities</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">⚡</div>
                <div className="stat-text">
                  <strong>10K+</strong>
                  <span>Active Users</span>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">💡</div>
                <div className="stat-text">
                  <strong>99.9%</strong>
                  <span>Uptime</span>
                </div>
              </div>
            </div>

            <div className="brand-quote">
              <p>"Energy access is the foundation of economic development and social progress."</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div 
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="auth-form-card" variants={itemVariants}>
            <div className="form-header">
              <h2 className="form-title">Sign In</h2>
              <p className="form-subtitle">
                Access your energy dashboard and manage your power
              </p>
            </div>

            {/* Demo Mode Banner */}
            <motion.div 
              className="demo-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="demo-icon">🎯</span>
              <div className="demo-content">
                <strong>Demo Mode Available!</strong>
                <p>Email: demo@smartenergy.africa | Password: demo123</p>
              </div>
            </motion.div>

            {errors.general && (
              <motion.div 
                className="error-banner"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="error-icon">⚠️</span>
                {errors.general}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <motion.div className="input-group" variants={itemVariants}>
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </motion.div>

              <motion.div className="input-group" variants={itemVariants}>
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`input-field ${errors.password ? 'error' : ''}`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">{errors.password}</span>
                )}
              </motion.div>

              <motion.div 
                className="form-options"
                variants={itemVariants}
              >
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">
                  Forgot password?
                </a>
              </motion.div>

              <motion.button
                type="submit"
                className="btn btn-primary btn-full"
                variants={itemVariants}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? (
                  <span className="btn-loading">
                    <span className="spinner"></span>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Sign In
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </motion.button>

              <motion.div 
                className="form-divider"
                variants={itemVariants}
              >
                <span>OR</span>
              </motion.div>

              <motion.div 
                className="social-login"
                variants={itemVariants}
              >
                <button type="button" className="social-btn google-btn">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Cpath fill='%234285F4' d='M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z'/%3E%3Cpath fill='%2334A853' d='M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z'/%3E%3Cpath fill='%23FBBC05' d='M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z'/%3E%3Cpath fill='%23EA4335' d='M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z'/%3E%3C/svg%3E" alt="" />
                  Continue with Google
                </button>
              </motion.div>

              <motion.p 
                className="form-footer"
                variants={itemVariants}
              >
                Don't have an account?{' '}
                <Link to="/register" className="auth-link">
                  Create one now
                </Link>
              </motion.p>
            </form>
          </motion.div>

          <motion.div 
            className="trust-badges"
            variants={itemVariants}
          >
            <div className="badge-item">
              <span className="badge-icon">🔒</span>
              <span>256-bit Encryption</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>ISO Certified</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">💳</span>
              <span>M-Pesa Secure</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;