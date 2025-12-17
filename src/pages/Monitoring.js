import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './Monitoring.css';

const Monitoring = () => {
  const [timeRange, setTimeRange] = useState('today'); // today, week, month
  const [liveData, setLiveData] = useState({
    voltage: 48.2,
    current: 12.5,
    power: 602.5,
    frequency: 50.1,
    temperature: 28.5
  });

  // Mock real-time data update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        voltage: (48 + Math.random() * 2).toFixed(1),
        current: (12 + Math.random() * 3).toFixed(1),
        power: (600 + Math.random() * 50).toFixed(1),
        frequency: (50 + Math.random() * 0.2).toFixed(2),
        temperature: (28 + Math.random() * 2).toFixed(1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Power consumption data (24 hours)
  const powerData = [
    { time: '00:00', power: 0.5, voltage: 48, current: 10 },
    { time: '02:00', power: 0.3, voltage: 47.8, current: 6 },
    { time: '04:00', power: 0.2, voltage: 47.5, current: 4 },
    { time: '06:00', power: 1.2, voltage: 48.2, current: 25 },
    { time: '08:00', power: 2.1, voltage: 48.5, current: 43 },
    { time: '10:00', power: 2.5, voltage: 48.3, current: 52 },
    { time: '12:00', power: 2.8, voltage: 48.6, current: 58 },
    { time: '14:00', power: 2.6, voltage: 48.4, current: 54 },
    { time: '16:00', power: 2.3, voltage: 48.2, current: 48 },
    { time: '18:00', power: 2.7, voltage: 48.5, current: 56 },
    { time: '20:00', power: 2.4, voltage: 48.3, current: 50 },
    { time: '22:00', power: 1.8, voltage: 48.1, current: 37 }
  ];

  // Daily consumption data (7 days)
  const dailyData = [
    { day: 'Mon', consumption: 18.5, cost: 370 },
    { day: 'Tue', consumption: 22.3, cost: 446 },
    { day: 'Wed', consumption: 19.8, cost: 396 },
    { day: 'Thu', consumption: 21.5, cost: 430 },
    { day: 'Fri', consumption: 23.1, cost: 462 },
    { day: 'Sat', consumption: 16.4, cost: 328 },
    { day: 'Sun', consumption: 15.2, cost: 304 }
  ];

  // Device breakdown
  const deviceData = [
    { name: 'Lighting', percentage: 35, value: 6.5 },
    { name: 'Refrigerator', percentage: 25, value: 4.6 },
    { name: 'TV/Entertainment', percentage: 15, value: 2.8 },
    { name: 'Phone Charging', percentage: 10, value: 1.9 },
    { name: 'Other', percentage: 15, value: 2.7 }
  ];

  // Peak hours data
  const peakHoursData = [
    { hour: '6-9 AM', usage: 2.1, label: 'Morning Peak' },
    { hour: '12-2 PM', usage: 2.8, label: 'Midday Peak' },
    { hour: '6-10 PM', usage: 2.7, label: 'Evening Peak' },
    { hour: 'Other', usage: 1.2, label: 'Off-Peak' }
  ];

  return (
    <div className="monitoring-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">Energy Monitor</h1>
          <p className="page-description">Real-time energy consumption and system monitoring</p>
        </div>
        <div className="time-range-selector">
          <button 
            className={`range-btn ${timeRange === 'today' ? 'active' : ''}`}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button 
            className={`range-btn ${timeRange === 'week' ? 'active' : ''}`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button 
            className={`range-btn ${timeRange === 'month' ? 'active' : ''}`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="live-metrics">
        <div className="metric-card voltage">
          <div className="metric-icon">⚡</div>
          <div className="metric-info">
            <p className="metric-label">Voltage</p>
            <h3 className="metric-value">{liveData.voltage}V</h3>
            <span className="metric-status good">Normal</span>
          </div>
        </div>

        <div className="metric-card current">
          <div className="metric-icon">🔌</div>
          <div className="metric-info">
            <p className="metric-label">Current</p>
            <h3 className="metric-value">{liveData.current}A</h3>
            <span className="metric-status good">Stable</span>
          </div>
        </div>

        <div className="metric-card power">
          <div className="metric-icon">💡</div>
          <div className="metric-info">
            <p className="metric-label">Power</p>
            <h3 className="metric-value">{liveData.power}W</h3>
            <span className="metric-status good">Active</span>
          </div>
        </div>

        <div className="metric-card frequency">
          <div className="metric-icon">📊</div>
          <div className="metric-info">
            <p className="metric-label">Frequency</p>
            <h3 className="metric-value">{liveData.frequency}Hz</h3>
            <span className="metric-status good">Normal</span>
          </div>
        </div>

        <div className="metric-card temperature">
          <div className="metric-icon">🌡️</div>
          <div className="metric-info">
            <p className="metric-label">Temperature</p>
            <h3 className="metric-value">{liveData.temperature}°C</h3>
            <span className="metric-status good">Optimal</span>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="charts-row">
        {/* Real-time Power Chart */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3 className="chart-title">Real-Time Power Consumption</h3>
            <div className="chart-legend">
              <span className="legend-item power-legend">Power (kW)</span>
              <span className="legend-item voltage-legend">Voltage (V)</span>
              <span className="legend-item current-legend">Current (A)</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={powerData}>
              <defs>
                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52b788" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#52b788" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#718096" style={{ fontSize: '0.85rem' }} />
              <YAxis stroke="#718096" style={{ fontSize: '0.85rem' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e9ecef',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="power" 
                stroke="#52b788" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorPower)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="charts-row two-columns">
        {/* Daily Consumption */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Daily Consumption (7 Days)</h3>
            <span className="chart-info">Total: 136.8 kWh</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#718096" style={{ fontSize: '0.85rem' }} />
              <YAxis stroke="#718096" style={{ fontSize: '0.85rem' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e9ecef',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="consumption" fill="#2196F3" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Peak Hours */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Peak Usage Hours</h3>
            <span className="chart-info">Average per day</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={peakHoursData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" stroke="#718096" style={{ fontSize: '0.85rem' }} />
              <YAxis dataKey="hour" type="category" stroke="#718096" style={{ fontSize: '0.85rem' }} width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e9ecef',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="usage" fill="#5E35B1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Device Breakdown & Stats */}
      <div className="charts-row two-columns">
        {/* Device Breakdown */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Device Consumption Breakdown</h3>
            <span className="chart-info">Today: 18.5 kWh</span>
          </div>
          <div className="device-breakdown">
            {deviceData.map((device, index) => (
              <div key={index} className="device-item">
                <div className="device-info">
                  <span className="device-name">{device.name}</span>
                  <span className="device-value">{device.value} kWh</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${device.percentage}%`,
                      backgroundColor: index === 0 ? '#52b788' : 
                                     index === 1 ? '#2196F3' : 
                                     index === 2 ? '#5E35B1' : 
                                     index === 3 ? '#FF6B35' : '#95a5a6'
                    }}
                  />
                </div>
                <span className="device-percentage">{device.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Summary */}
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Energy Statistics</h3>
            <span className="chart-info">Current period</span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon blue">📈</div>
              <div className="stat-content">
                <p className="stat-label">Peak Power</p>
                <h4 className="stat-number">2.8 kW</h4>
                <span className="stat-time">12:00 PM Today</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon green">💰</div>
              <div className="stat-content">
                <p className="stat-label">Today's Cost</p>
                <h4 className="stat-number">KES 370</h4>
                <span className="stat-time">18.5 kWh @ KES 20/kWh</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon purple">⏱️</div>
              <div className="stat-content">
                <p className="stat-label">Avg. Daily Usage</p>
                <h4 className="stat-number">19.5 kWh</h4>
                <span className="stat-time">Last 7 days</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon orange">🔋</div>
              <div className="stat-content">
                <p className="stat-label">Efficiency</p>
                <h4 className="stat-number">94%</h4>
                <span className="stat-time">System performance</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="export-section">
        <div className="export-card">
          <div className="export-content">
            <h3 className="export-title">Export Energy Data</h3>
            <p className="export-description">Download your consumption data for analysis</p>
          </div>
          <div className="export-buttons">
            <button className="btn-export">
              📄 Export CSV
            </button>
            <button className="btn-export">
              📊 Export Excel
            </button>
            <button className="btn-export">
              📑 Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;