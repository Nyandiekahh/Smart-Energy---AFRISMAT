import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Devices.css';

const Devices = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [devices, setDevices] = useState([
    { 
      id: 1, 
      name: 'DC Logger #001', 
      code: 'DEV-001', 
      type: 'Solar Panel Array',
      location: 'Rooftop - Building A',
      power: '2.4 kW',
      voltage: '48V',
      current: '50A',
      status: 'Active',
      lastSeen: '2 minutes ago',
      installed: 'Jan 15, 2024'
    },
    { 
      id: 2, 
      name: 'DC Logger #002', 
      code: 'DEV-002', 
      type: 'Backup System',
      location: 'Ground Floor - Storage',
      power: '0.0 kW',
      voltage: '0V',
      current: '0A',
      status: 'Standby',
      lastSeen: '5 minutes ago',
      installed: 'Jan 20, 2024'
    },
    { 
      id: 3, 
      name: 'Battery Bank #1', 
      code: 'BAT-001', 
      type: 'Energy Storage',
      location: 'Battery Room',
      power: '1.2 kW',
      voltage: '48V',
      current: '25A',
      status: 'Charging',
      lastSeen: '1 minute ago',
      installed: 'Feb 1, 2024'
    },
  ]);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleViewDetails = (device) => {
    setSelectedDevice(device);
  };

  return (
    <div className="devices-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">My Devices</h1>
          <p className="page-description">Manage and monitor all your connected energy devices</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddModal(true)}>
          <span className="btn-icon">+</span>
          Add New Device
        </button>
      </div>

      {/* Stats Summary */}
      <div className="devices-stats">
        <div className="stat-box">
          <div className="stat-icon green">⚡</div>
          <div className="stat-info">
            <p className="stat-label">Active Devices</p>
            <h3 className="stat-number">1</h3>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon yellow">⏸</div>
          <div className="stat-info">
            <p className="stat-label">Standby</p>
            <h3 className="stat-number">1</h3>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon blue">🔋</div>
          <div className="stat-info">
            <p className="stat-label">Charging</p>
            <h3 className="stat-number">1</h3>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon gray">📊</div>
          <div className="stat-info">
            <p className="stat-label">Total Devices</p>
            <h3 className="stat-number">{devices.length}</h3>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">All Devices</h2>
          <div className="card-actions">
            <input 
              type="text" 
              placeholder="Search devices..." 
              className="search-input"
            />
            <select className="filter-select">
              <option>All Status</option>
              <option>Active</option>
              <option>Standby</option>
              <option>Charging</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Device Code</th>
                <th>Type</th>
                <th>Location</th>
                <th>Power</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.id}>
                  <td>
                    <div className="device-cell">
                      <div className="device-icon-cell">
                        {device.status === 'Active' ? '⚡' : 
                         device.status === 'Charging' ? '🔋' : '🔌'}
                      </div>
                      <span className="device-name-cell">{device.name}</span>
                    </div>
                  </td>
                  <td className="device-code">{device.code}</td>
                  <td>{device.type}</td>
                  <td className="device-location">{device.location}</td>
                  <td className="device-power">{device.power}</td>
                  <td>
                    <span className={`status-badge ${device.status.toLowerCase()}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="last-seen">{device.lastSeen}</td>
                  <td>
                    <button 
                      className="btn-action"
                      onClick={() => handleViewDetails(device)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Device Details Modal */}
      {selectedDevice && (
        <div className="modal-overlay" onClick={() => setSelectedDevice(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Device Details</h2>
              <button className="btn-close" onClick={() => setSelectedDevice(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Device Name</span>
                  <span className="detail-value">{selectedDevice.name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Device Code</span>
                  <span className="detail-value">{selectedDevice.code}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{selectedDevice.type}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{selectedDevice.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current Power</span>
                  <span className="detail-value">{selectedDevice.power}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Voltage</span>
                  <span className="detail-value">{selectedDevice.voltage}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Current</span>
                  <span className="detail-value">{selectedDevice.current}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`status-badge ${selectedDevice.status.toLowerCase()}`}>
                    {selectedDevice.status}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Seen</span>
                  <span className="detail-value">{selectedDevice.lastSeen}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Installed</span>
                  <span className="detail-value">{selectedDevice.installed}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button className="btn-secondary">Edit Device</button>
                <button className="btn-danger">Remove Device</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Device</h2>
              <button className="btn-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form className="device-form">
                <div className="form-group">
                  <label>Device Name</label>
                  <input type="text" placeholder="e.g., DC Logger #003" />
                </div>
                <div className="form-group">
                  <label>Device Code</label>
                  <input type="text" placeholder="e.g., DEV-003" />
                </div>
                <div className="form-group">
                  <label>Device Type</label>
                  <select>
                    <option>Solar Panel Array</option>
                    <option>Battery Storage</option>
                    <option>Backup System</option>
                    <option>Inverter</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" placeholder="e.g., Rooftop - Building B" />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Device
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;