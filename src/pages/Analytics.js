import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Analytics.css';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30days');

  // Monthly comparison data
  const monthlyData = [
    { month: 'Jan', usage: 580, cost: 11600, target: 500 },
    { month: 'Feb', usage: 620, cost: 12400, target: 500 },
    { month: 'Mar', usage: 590, cost: 11800, target: 500 },
    { month: 'Apr', usage: 550, cost: 11000, target: 500 },
    { month: 'May', usage: 610, cost: 12200, target: 500 },
    { month: 'Jun', usage: 570, cost: 11400, target: 500 }
  ];

  // Usage by category
  const categoryData = [
    { name: 'Lighting', value: 35, color: '#52b788' },
    { name: 'Appliances', value: 30, color: '#2196F3' },
    { name: 'Cooling', value: 20, color: '#5E35B1' },
    { name: 'Entertainment', value: 10, color: '#FF6B35' },
    { name: 'Other', value: 5, color: '#95a5a6' }
  ];

  // Hourly pattern
  const hourlyPattern = [
    { hour: '12AM', weekday: 0.3, weekend: 0.5 },
    { hour: '3AM', weekday: 0.2, weekend: 0.4 },
    { hour: '6AM', weekday: 1.2, weekend: 0.8 },
    { hour: '9AM', weekday: 2.1, weekend: 1.5 },
    { hour: '12PM', weekday: 2.8, weekend: 2.3 },
    { hour: '3PM', weekday: 2.6, weekend: 2.5 },
    { hour: '6PM', weekday: 2.9, weekend: 2.7 },
    { hour: '9PM', weekday: 2.4, weekend: 2.2 }
  ];

  // Cost breakdown
  const costData = [
    { category: 'Energy Usage', amount: 370, percentage: 74 },
    { category: 'Connection Fee', amount: 50, percentage: 10 },
    { category: 'Taxes', amount: 60, percentage: 12 },
    { category: 'Other Charges', amount: 20, percentage: 4 }
  ];

  // Efficiency metrics
  const efficiencyData = [
    { week: 'Week 1', efficiency: 92, savings: 45 },
    { week: 'Week 2', efficiency: 94, savings: 52 },
    { week: 'Week 3', efficiency: 91, savings: 41 },
    { week: 'Week 4', efficiency: 95, savings: 58 }
  ];

  return (
    <div className="analytics-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">Analytics & Reports</h1>
          <p className="page-description">Comprehensive energy usage analysis and insights</p>
        </div>
        <div className="header-actions">
          <select className="date-range-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <button className="btn-primary">
            📊 Generate Report
          </button>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="metrics-summary">
        <div className="summary-card green">
          <div className="summary-icon">⚡</div>
          <div className="summary-content">
            <p className="summary-label">Total Consumption</p>
            <h2 className="summary-value">570 kWh</h2>
            <span className="summary-change positive">↓ 8% from last month</span>
          </div>
        </div>

        <div className="summary-card blue">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <p className="summary-label">Total Cost</p>
            <h2 className="summary-value">KES 11,400</h2>
            <span className="summary-change positive">↓ KES 960 saved</span>
          </div>
        </div>

        <div className="summary-card purple">
          <div className="summary-icon">📈</div>
          <div className="summary-content">
            <p className="summary-label">Avg. Daily Usage</p>
            <h2 className="summary-value">19 kWh</h2>
            <span className="summary-change neutral">→ Same as average</span>
          </div>
        </div>

        <div className="summary-card orange">
          <div className="summary-icon">🎯</div>
          <div className="summary-content">
            <p className="summary-label">Efficiency Score</p>
            <h2 className="summary-value">93%</h2>
            <span className="summary-change positive">↑ 3% improved</span>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="charts-grid">
        {/* Monthly Comparison */}
        <div className="chart-card large">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Monthly Usage & Cost Trend</h3>
              <p className="chart-subtitle">Last 6 months comparison</p>
            </div>
            <div className="chart-legend-inline">
              <span className="legend-item"><span className="dot blue"></span> Usage (kWh)</span>
              <span className="legend-item"><span className="dot green"></span> Cost (KES)</span>
              <span className="legend-item"><span className="dot gray"></span> Target</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e9ecef', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="usage" stroke="#2196F3" strokeWidth={3} dot={{ r: 5 }} />
              <Line type="monotone" dataKey="target" stroke="#95a5a6" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Usage by Category */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Usage by Category</h3>
              <p className="chart-subtitle">Current month breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Charts */}
      <div className="charts-grid two-columns">
        {/* Hourly Pattern */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Usage Pattern by Hour</h3>
              <p className="chart-subtitle">Weekday vs Weekend</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={hourlyPattern}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e9ecef', borderRadius: '8px' }} />
              <Legend />
              <Bar dataKey="weekday" fill="#52b788" radius={[8, 8, 0, 0]} name="Weekday" />
              <Bar dataKey="weekend" fill="#2196F3" radius={[8, 8, 0, 0]} name="Weekend" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Efficiency Trend */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Efficiency & Savings</h3>
              <p className="chart-subtitle">Weekly performance</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={efficiencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e9ecef', borderRadius: '8px' }} />
              <Legend />
              <Line type="monotone" dataKey="efficiency" stroke="#5E35B1" strokeWidth={3} name="Efficiency %" />
              <Line type="monotone" dataKey="savings" stroke="#52b788" strokeWidth={3} name="Savings (KES)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="cost-breakdown-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3 className="chart-title">Cost Breakdown</h3>
            <span className="total-cost">Total: KES 500</span>
          </div>
          <div className="cost-items">
            {costData.map((item, index) => (
              <div key={index} className="cost-item">
                <div className="cost-info">
                  <span className="cost-category">{item.category}</span>
                  <span className="cost-amount">KES {item.amount}</span>
                </div>
                <div className="cost-bar-container">
                  <div className="cost-bar" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <span className="cost-percentage">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="insights-section">
        <h2 className="section-title">AI-Powered Insights</h2>
        <div className="insights-grid">
          <div className="insight-card">
            <div className="insight-icon green">💡</div>
            <div className="insight-content">
              <h4 className="insight-title">Peak Usage Alert</h4>
              <p className="insight-text">Your highest consumption is between 6-10 PM. Consider shifting some activities to off-peak hours to save costs.</p>
              <span className="insight-impact">Potential savings: KES 150/month</span>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon blue">🔋</div>
            <div className="insight-content">
              <h4 className="insight-title">Efficiency Improvement</h4>
              <p className="insight-text">Your system efficiency improved by 3% this month. Keep maintaining your devices for optimal performance.</p>
              <span className="insight-impact">Current efficiency: 93%</span>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon purple">📊</div>
            <div className="insight-content">
              <h4 className="insight-title">Usage Pattern</h4>
              <p className="insight-text">Weekend usage is 15% lower than weekdays. Your energy habits are consistent and predictable.</p>
              <span className="insight-impact">Avg. difference: 2.8 kWh/day</span>
            </div>
          </div>

          <div className="insight-card">
            <div className="insight-icon orange">⚠️</div>
            <div className="insight-content">
              <h4 className="insight-title">Cost Optimization</h4>
              <p className="insight-text">Lighting accounts for 35% of usage. Consider LED upgrades to reduce consumption by up to 40%.</p>
              <span className="insight-impact">Potential savings: KES 200/month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;