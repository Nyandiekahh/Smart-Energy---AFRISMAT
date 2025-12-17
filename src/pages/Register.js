import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const africanCountries = [
    'Kenya', 'Nigeria', 'Ghana', 'Rwanda', 'Uganda', 'Tanzania',
    'South Africa', 'Ethiopia', 'Egypt', 'Morocco', 'Senegal',
    'Côte d\'Ivoire', 'Cameroon', 'Zimbabwe', 'Zambia', 'Other'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid (e.g., +254722114521)';
    }

    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
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
      // DEMO MODE: Auto-register for testing without backend
      const isDemoMode = true; // Always allow demo registration
      
      if (isDemoMode) {
        // Demo registration - simulate successful signup
        const demoUser = {
          id: Date.now(),
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country
        };
        
        const demoToken = 'demo_token_' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        // Show success message
        alert(`Welcome to Smart Energy Africa, ${formData.firstName}! 🎉`);
        
        // Navigate to dashboard
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
      } else {
        // Try real backend API
        const response = await axios.post('http://localhost:8000/api/auth/register/', {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          password: formData.password
        });

        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Show success message
        alert('Registration successful! Welcome to Smart Energy Africa.');

        // Navigate to dashboard or onboarding
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with error
        const serverErrors = error.response.data;
        const newErrors = {};
        
        // Map server errors to form fields
        if (serverErrors.email) {
          newErrors.email = serverErrors.email[0] || 'Email already exists';
        }
        if (serverErrors.phone) {
          newErrors.phone = serverErrors.phone[0];
        }
        if (!Object.keys(newErrors).length) {
          newErrors.general = serverErrors.message || 'Registration failed. Please try again.';
        }
        
        setErrors(newErrors);
      } else if (error.request) {
        setErrors({
          general: 'Unable to connect to server. Please check your internet connection.'
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
        staggerChildren: 0.08
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
              Join the Revolution in
              <br />
              <span className="text-gradient">African Energy</span>
            </h1>
            <p className="brand-subtitle">
              Be part of the movement empowering millions with clean, affordable energy
            </p>

            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Real-time energy monitoring</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Flexible pay-as-you-go plans</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>M-Pesa payment integration</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>24/7 customer support</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Community of 10K+ users</span>
              </div>
            </div>

            <div className="brand-quote">
              <p>"Together, we're lighting up Africa, one community at a time."</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Registration Form */}
        <motion.div 
          className="auth-form-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="auth-form-card register-card" variants={itemVariants}>
            <div className="form-header">
              <h2 className="form-title">Create Account</h2>
              <p className="form-subtitle">
                Start your journey to smarter energy management
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
                <strong>Demo Mode Active!</strong>
                <p>Registration works instantly - no backend needed for testing</p>
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
              <div className="form-row">
                <motion.div className="input-group" variants={itemVariants}>
                  <label htmlFor="firstName" className="input-label">
                    First Name
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`input-field ${errors.firstName ? 'error' : ''}`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <span className="error-text">{errors.firstName}</span>
                  )}
                </motion.div>

                <motion.div className="input-group" variants={itemVariants}>
                  <label htmlFor="lastName" className="input-label">
                    Last Name
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">👤</span>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`input-field ${errors.lastName ? 'error' : ''}`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <span className="error-text">{errors.lastName}</span>
                  )}
                </motion.div>
              </div>

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
                    placeholder="john.doe@example.com"
                  />
                </div>
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </motion.div>

              <div className="form-row">
                <motion.div className="input-group" variants={itemVariants}>
                  <label htmlFor="phone" className="input-label">
                    Phone Number
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">📱</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'error' : ''}`}
                      placeholder="+254 722 114 521"
                    />
                  </div>
                  {errors.phone && (
                    <span className="error-text">{errors.phone}</span>
                  )}
                </motion.div>

                <motion.div className="input-group" variants={itemVariants}>
                  <label htmlFor="country" className="input-label">
                    Country
                  </label>
                  <div className="input-wrapper">
                    <span className="input-icon">🌍</span>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={`input-field ${errors.country ? 'error' : ''}`}
                    >
                      <option value="">Select Country</option>
                      {africanCountries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country && (
                    <span className="error-text">{errors.country}</span>
                  )}
                </motion.div>
              </div>

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
                    placeholder="Create a strong password"
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
                <span className="input-hint">
                  Use 8+ characters with uppercase, lowercase & numbers
                </span>
              </motion.div>

              <motion.div className="input-group" variants={itemVariants}>
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm Password
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">🔒</span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`input-field ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </motion.div>

              <motion.div 
                className="checkbox-group"
                variants={itemVariants}
              >
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={errors.agreeTerms ? 'error' : ''}
                  />
                  <span>
                    I agree to the{' '}
                    <a href="#" className="terms-link">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="terms-link">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && (
                  <span className="error-text">{errors.agreeTerms}</span>
                )}
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
                    Creating account...
                  </span>
                ) : (
                  <>
                    Create Account
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </motion.button>

              <motion.p 
                className="form-footer"
                variants={itemVariants}
              >
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in here
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
              <span>Secure Registration</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Verified Platform</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">🌍</span>
              <span>Pan-African</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;