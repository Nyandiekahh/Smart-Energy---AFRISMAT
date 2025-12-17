import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Form states
  const [profile, setProfile] = useState({
    fullName: 'Demo User',
    email: 'demo@smartenergy.africa',
    phone: '0722114521',
    address: 'Nairobi, Kenya',
    language: 'en'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    billing: true,
    usage: true,
    maintenance: false
  });

  const [preferences, setPreferences] = useState({
    theme: 'light',
    currency: 'KES',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert('Password change request submitted');
  };

  return (
    <div className="settings-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">Settings</h1>
          <p className="page-description">Manage your account settings and preferences</p>
        </div>
      </div>

      <div className="settings-container">
        {/* Sidebar Navigation */}
        <div className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span>
            <span className="tab-label">Profile</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <span className="tab-icon">🔒</span>
            <span className="tab-label">Security</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <span className="tab-icon">🔔</span>
            <span className="tab-label">Notifications</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <span className="tab-icon">⚙️</span>
            <span className="tab-label">Preferences</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveTab('billing')}
          >
            <span className="tab-icon">💳</span>
            <span className="tab-label">Billing Info</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="settings-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2 className="section-heading">Profile Information</h2>
              <p className="section-description">Update your personal information</p>

              <form onSubmit={handleSaveProfile} className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      value={profile.fullName}
                      onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Language</label>
                    <select 
                      value={profile.language}
                      onChange={(e) => setProfile({...profile, language: e.target.value})}
                    >
                      <option value="en">English</option>
                      <option value="sw">Swahili</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input 
                    type="text" 
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-save">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="settings-section">
              <h2 className="section-heading">Security Settings</h2>
              <p className="section-description">Manage your password and security preferences</p>

              <form onSubmit={handleChangePassword} className="settings-form">
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" placeholder="Enter current password" />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" placeholder="Enter new password" />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" placeholder="Confirm new password" />
                </div>

                <button type="submit" className="btn-save">
                  Update Password
                </button>
              </form>

              <div className="security-options">
                <h3 className="subsection-title">Two-Factor Authentication</h3>
                <div className="option-card">
                  <div className="option-info">
                    <h4>Enable 2FA</h4>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2 className="section-heading">Notification Preferences</h2>
              <p className="section-description">Choose how you want to receive notifications</p>

              <div className="notification-groups">
                <div className="notification-group">
                  <h3 className="group-title">Communication Channels</h3>
                  
                  <div className="option-card">
                    <div className="option-info">
                      <h4>Email Notifications</h4>
                      <p>Receive updates via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.email}
                        onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="option-card">
                    <div className="option-info">
                      <h4>SMS Notifications</h4>
                      <p>Receive alerts via text message</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.sms}
                        onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="option-card">
                    <div className="option-info">
                      <h4>Push Notifications</h4>
                      <p>Receive browser push notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.push}
                        onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>

                <div className="notification-group">
                  <h3 className="group-title">Notification Types</h3>
                  
                  <div className="option-card">
                    <div className="option-info">
                      <h4>Billing Alerts</h4>
                      <p>Payment reminders and invoices</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.billing}
                        onChange={(e) => setNotifications({...notifications, billing: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="option-card">
                    <div className="option-info">
                      <h4>Usage Alerts</h4>
                      <p>High consumption warnings</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.usage}
                        onChange={(e) => setNotifications({...notifications, usage: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>

                  <div className="option-card">
                    <div className="option-info">
                      <h4>Maintenance Updates</h4>
                      <p>System maintenance notifications</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={notifications.maintenance}
                        onChange={(e) => setNotifications({...notifications, maintenance: e.target.checked})}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="settings-section">
              <h2 className="section-heading">App Preferences</h2>
              <p className="section-description">Customize your experience</p>

              <form className="settings-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Theme</label>
                    <select 
                      value={preferences.theme}
                      onChange={(e) => setPreferences({...preferences, theme: e.target.value})}
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Currency</label>
                    <select 
                      value={preferences.currency}
                      onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                    >
                      <option value="KES">KES (Kenyan Shilling)</option>
                      <option value="USD">USD (US Dollar)</option>
                      <option value="EUR">EUR (Euro)</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date Format</label>
                    <select 
                      value={preferences.dateFormat}
                      onChange={(e) => setPreferences({...preferences, dateFormat: e.target.value})}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Time Format</label>
                    <select 
                      value={preferences.timeFormat}
                      onChange={(e) => setPreferences({...preferences, timeFormat: e.target.value})}
                    >
                      <option value="12h">12 Hour</option>
                      <option value="24h">24 Hour</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-save">
                  Save Preferences
                </button>
              </form>
            </div>
          )}

          {/* Billing Info Tab */}
          {activeTab === 'billing' && (
            <div className="settings-section">
              <h2 className="section-heading">Billing Information</h2>
              <p className="section-description">Manage your billing details</p>

              <div className="billing-details">
                <div className="detail-card">
                  <h4>Account Number</h4>
                  <p>ACC-2024-00123</p>
                </div>
                <div className="detail-card">
                  <h4>Customer ID</h4>
                  <p>CUST-456789</p>
                </div>
                <div className="detail-card">
                  <h4>Billing Cycle</h4>
                  <p>Monthly (10th)</p>
                </div>
                <div className="detail-card">
                  <h4>Payment Method</h4>
                  <p>M-Pesa</p>
                </div>
              </div>

              <div className="danger-zone">
                <h3 className="danger-title">⚠️ Danger Zone</h3>
                <div className="danger-actions">
                  <button className="btn-danger-outline">
                    Close Account
                  </button>
                  <button className="btn-danger-outline">
                    Delete All Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;