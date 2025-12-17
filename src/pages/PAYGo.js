import React, { useState, useEffect } from 'react';
import EnergyMLPredictor from '../utils/mlPredictor';
import './PAYGo.css';

const PAYGo = () => {
  const [activeTab, setActiveTab] = useState('topup');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [mlPredictions, setMlPredictions] = useState(null);
  const [showMLInsights, setShowMLInsights] = useState(true);

  // Mock balance data
  const balance = {
    amount: 745.50,
    daysRemaining: 12,
    lastTopUp: 'Just Now',
    lastTopUpAmount: 500
  };

  // Mock historical data for ML (in production, fetch from API)
  const historicalUsageData = [
    { date: '2024-12-01', kWh: 18.2, amount: 364, dayOfWeek: 0, month: 12 },
    { date: '2024-12-02', kWh: 19.5, amount: 390, dayOfWeek: 1, month: 12 },
    { date: '2024-12-03', kWh: 21.3, amount: 426, dayOfWeek: 2, month: 12 },
    { date: '2024-12-04', kWh: 20.1, amount: 402, dayOfWeek: 3, month: 12 },
    { date: '2024-12-05', kWh: 22.5, amount: 450, dayOfWeek: 4, month: 12 },
    { date: '2024-12-06', kWh: 19.8, amount: 396, dayOfWeek: 5, month: 12 },
    { date: '2024-12-07', kWh: 17.4, amount: 348, dayOfWeek: 6, month: 12 },
    { date: '2024-12-08', kWh: 16.9, amount: 338, dayOfWeek: 0, month: 12 },
    { date: '2024-12-09', kWh: 20.3, amount: 406, dayOfWeek: 1, month: 12 },
    { date: '2024-12-10', kWh: 21.7, amount: 434, dayOfWeek: 2, month: 12 },
    { date: '2024-12-11', kWh: 19.9, amount: 398, dayOfWeek: 3, month: 12 },
    { date: '2024-12-12', kWh: 22.1, amount: 442, dayOfWeek: 4, month: 12 },
    { date: '2024-12-13', kWh: 20.5, amount: 410, dayOfWeek: 5, month: 12 },
    { date: '2024-12-14', kWh: 18.3, amount: 366, dayOfWeek: 6, month: 12 },
    { date: '2024-12-15', kWh: 17.8, amount: 356, dayOfWeek: 0, month: 12 },
    { date: '2024-12-16', kWh: 20.8, amount: 416, dayOfWeek: 1, month: 12 },
  ];

  // Quick amount buttons
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Payment history
  const paymentHistory = [
    { id: 1, date: 'Dec 17, 2025', time: 'Just Now', type: 'M-Pesa', amount: 500, status: 'Completed', reference: 'RKJ8H3N2LP' },
    { id: 2, date: 'Dec 5, 2025', time: '11:15 AM', type: 'M-Pesa', amount: 1000, status: 'Completed', reference: 'QWE4R5T6YU' },
    { id: 3, date: 'Nov 28, 2025', time: '04:45 PM', type: 'Token', amount: 200, status: 'Completed', reference: 'TOKEN-123456' },
    { id: 4, date: 'Nov 20, 2025', time: '09:20 AM', type: 'M-Pesa', amount: 500, status: 'Completed', reference: 'ASD3F4G5HJ' },
    { id: 5, date: 'Nov 15, 2025', time: '03:10 PM', type: 'M-Pesa', amount: 300, status: 'Failed', reference: 'ZXC6V7B8NM' },
  ];

  // Initialize ML predictor on component mount
  useEffect(() => {
    const predictor = new EnergyMLPredictor();
    predictor.loadHistoricalData(historicalUsageData);
    
    const predictions = predictor.predictConsumption(7);
    const patterns = predictor.analyzePatterns();
    const recommendations = predictor.recommendPaymentAmount(balance.amount, 20);
    const runway = predictor.calculateRunway(balance.amount, 20);
    const anomalies = predictor.detectAnomalies();
    
    setMlPredictions({
      predictions,
      patterns,
      recommendations,
      runway,
      anomalies
    });
  }, []);

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || !amount) {
      alert('Please enter phone number and amount');
      return;
    }

    if (amount < 50) {
      alert('Minimum amount is KES 50');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/mpesa/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: parseInt(amount)
        })
      });

      const data = await response.json();

      if (data.success) {
        alert(`✅ ${data.message}\n\nCheck your phone for the M-Pesa prompt.`);
        setPhoneNumber('');
        setAmount('');
      } else {
        alert(`❌ Payment failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('❌ Failed to connect to payment service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTokenRedeem = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      alert(`Token ${token} redeemed successfully!`);
      setToken('');
    }, 1500);
  };

  const selectQuickAmount = (value) => {
    setAmount(value.toString());
  };

  const selectRecommendedAmount = (value) => {
    setAmount(value.toString());
    setActiveTab('topup');
  };

  return (
    <div className="paygo-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">PAYGo & Credits</h1>
          <p className="page-description">ML-powered energy management and payments</p>
        </div>
      </div>

      {/* ML Insights Section */}
      {mlPredictions && showMLInsights && (
        <div className="ml-insights-section">
          <div className="insights-header">
            <h2 className="insights-title">🤖 AI-Powered Insights</h2>
            <button className="btn-close-insights" onClick={() => setShowMLInsights(false)}>✕</button>
          </div>
          
          <div className="insights-grid">
            {/* Prediction Card */}
            <div className="insight-card primary">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h4>Usage Prediction</h4>
                <div className="prediction-details">
                  <div className="prediction-item">
                    <span className="prediction-label">Tomorrow:</span>
                    <span className="prediction-value">{mlPredictions.predictions.daily} kWh</span>
                  </div>
                  <div className="prediction-item">
                    <span className="prediction-label">Next 7 days:</span>
                    <span className="prediction-value">{mlPredictions.predictions.weekly} kWh</span>
                  </div>
                  <div className="prediction-item">
                    <span className="prediction-label">Trend:</span>
                    <span className={`trend-badge ${mlPredictions.predictions.trend}`}>
                      {mlPredictions.predictions.trend === 'increasing' ? '↗' : 
                       mlPredictions.predictions.trend === 'decreasing' ? '↘' : '→'} 
                      {mlPredictions.predictions.trend}
                    </span>
                  </div>
                </div>
                <span className={`confidence-badge ${mlPredictions.predictions.confidence}`}>
                  {mlPredictions.predictions.confidence} confidence
                </span>
              </div>
            </div>

            {/* Recommendation Card */}
            <div className="insight-card success">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>Smart Recommendation</h4>
                <p className="recommendation-text">{mlPredictions.recommendations.insight}</p>
                <div className="recommended-amounts">
                  <button 
                    className="amount-chip recommended"
                    onClick={() => selectRecommendedAmount(mlPredictions.recommendations.recommended)}
                  >
                    <span className="chip-label">Recommended</span>
                    <span className="chip-amount">KES {mlPredictions.recommendations.recommended}</span>
                  </button>
                  <button 
                    className="amount-chip optimal"
                    onClick={() => selectRecommendedAmount(mlPredictions.recommendations.optimal)}
                  >
                    <span className="chip-label">Optimal</span>
                    <span className="chip-amount">KES {mlPredictions.recommendations.optimal}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Runway Card */}
            <div className="insight-card warning">
              <div className="insight-icon">⏰</div>
              <div className="insight-content">
                <h4>Credit Runway</h4>
                <div className="runway-display">
                  <div className="runway-days">{mlPredictions.runway.days}</div>
                  <div className="runway-label">days remaining</div>
                </div>
                <p className="runway-date">Balance runs out: {mlPredictions.runway.runoutDate}</p>
                <span className={`urgency-badge ${mlPredictions.runway.urgency}`}>
                  {mlPredictions.runway.urgency === 'critical' ? '🔴' : 
                   mlPredictions.runway.urgency === 'warning' ? '🟡' : '🟢'} 
                  {mlPredictions.runway.urgency}
                </span>
              </div>
            </div>

            {/* Pattern Card */}
            <div className="insight-card info">
              <div className="insight-icon">📊</div>
              <div className="insight-content">
                <h4>Usage Pattern</h4>
                <p className="pattern-text">{mlPredictions.patterns.pattern}</p>
                <div className="pattern-comparison">
                  <div className="pattern-stat">
                    <span className="stat-label">Weekday Avg:</span>
                    <span className="stat-value">{mlPredictions.patterns.weekdayAvg} kWh</span>
                  </div>
                  <div className="pattern-stat">
                    <span className="stat-label">Weekend Avg:</span>
                    <span className="stat-value">{mlPredictions.patterns.weekendAvg} kWh</span>
                  </div>
                </div>
                <span className="difference-badge">
                  {mlPredictions.patterns.difference}% difference
                </span>
              </div>
            </div>
          </div>

          {/* Anomalies Alert */}
          {mlPredictions.anomalies && mlPredictions.anomalies.length > 0 && (
            <div className="anomalies-alert">
              <span className="alert-icon">⚠️</span>
              <span className="alert-text">
                Detected {mlPredictions.anomalies.length} unusual consumption pattern(s) in your history
              </span>
            </div>
          )}
        </div>
      )}

      {/* Balance Summary */}
      <div className="balance-section">
        <div className="balance-card main-balance">
          <div className="balance-icon">💳</div>
          <div className="balance-content">
            <p className="balance-label">Current Balance</p>
            <h2 className="balance-amount">KES {balance.amount}</h2>
            <p className="balance-info">≈ {balance.daysRemaining} days remaining</p>
          </div>
        </div>

        <div className="balance-card">
          <div className="balance-icon blue">📅</div>
          <div className="balance-content">
            <p className="balance-label">Days Remaining</p>
            <h3 className="balance-number">{balance.daysRemaining}</h3>
            <p className="balance-subtext">Based on ML prediction</p>
          </div>
        </div>

        <div className="balance-card">
          <div className="balance-icon green">✓</div>
          <div className="balance-content">
            <p className="balance-label">Last Top-Up</p>
            <h3 className="balance-number">KES {balance.lastTopUpAmount}</h3>
            <p className="balance-subtext">{balance.lastTopUp}</p>
          </div>
        </div>

        <div className="balance-card">
          <div className="balance-icon purple">📊</div>
          <div className="balance-content">
            <p className="balance-label">Total Spent</p>
            <h3 className="balance-number">KES 3,500</h3>
            <p className="balance-subtext">This month</p>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="payment-section">
        <div className="payment-form-card">
          <div className="tab-header">
            <button 
              className={`tab-btn ${activeTab === 'topup' ? 'active' : ''}`}
              onClick={() => setActiveTab('topup')}
            >
              <span className="tab-icon">💰</span>
              Top Up Credit
            </button>
            <button 
              className={`tab-btn ${activeTab === 'token' ? 'active' : ''}`}
              onClick={() => setActiveTab('token')}
            >
              <span className="tab-icon">🔑</span>
              Redeem Token
            </button>
          </div>

          {/* M-Pesa Top Up Form */}
          {activeTab === 'topup' && (
            <div className="tab-content">
              <form onSubmit={handleMpesaPayment}>
                <div className="form-section">
                  <h3 className="form-section-title">M-Pesa Payment</h3>
                  <p className="form-section-desc">Enter your M-Pesa number and amount to top up</p>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">+254</span>
                      <input 
                        type="tel" 
                        placeholder="722 114 521"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                    <p className="input-hint">Enter your Safaricom M-Pesa number</p>
                  </div>

                  <div className="form-group">
                    <label>Amount (KES)</label>
                    <input 
                      type="number" 
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="50"
                      required
                    />
                    <p className="input-hint">Minimum amount: KES 50</p>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="quick-amounts">
                    <p className="quick-amounts-label">Quick amounts:</p>
                    <div className="quick-amounts-grid">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          className={`quick-amount-btn ${amount === amt.toString() ? 'selected' : ''}`}
                          onClick={() => selectQuickAmount(amt)}
                        >
                          KES {amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary full-width"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span>💳</span>
                        Pay with M-Pesa
                      </>
                    )}
                  </button>

                  <div className="payment-info">
                    <p className="info-text">
                      <span className="info-icon">ℹ️</span>
                      You will receive an M-Pesa prompt on your phone. Enter your PIN to complete the transaction.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Token Redemption Form */}
          {activeTab === 'token' && (
            <div className="tab-content">
              <form onSubmit={handleTokenRedeem}>
                <div className="form-section">
                  <h3 className="form-section-title">Redeem Energy Token</h3>
                  <p className="form-section-desc">Enter your 20-digit token number to add credits</p>

                  <div className="form-group">
                    <label>Token Number</label>
                    <input 
                      type="text" 
                      placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      maxLength="24"
                      required
                      className="token-input"
                    />
                    <p className="input-hint">Enter the 20-digit token from your voucher</p>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary full-width"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Validating...
                      </>
                    ) : (
                      <>
                        <span>🔑</span>
                        Redeem Token
                      </>
                    )}
                  </button>

                  <div className="payment-info">
                    <p className="info-text">
                      <span className="info-icon">ℹ️</span>
                      Tokens can be purchased from authorized dealers or online platforms.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Payment Tips Card */}
        <div className="tips-card">
          <h3 className="tips-title">Payment Tips</h3>
          <div className="tips-list">
            <div className="tip-item">
              <span className="tip-icon">💡</span>
              <div className="tip-content">
                <h4>Save on Costs</h4>
                <p>Top up with larger amounts to enjoy better rates</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">⚡</span>
              <div className="tip-content">
                <h4>Instant Credit</h4>
                <p>Credits are added immediately after successful payment</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">🔒</span>
              <div className="tip-content">
                <h4>Secure Payments</h4>
                <p>All transactions are encrypted and secure</p>
              </div>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📱</span>
              <div className="tip-content">
                <h4>24/7 Support</h4>
                <p>Contact us anytime for payment assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">Payment History</h2>
          <div className="card-actions">
            <select className="filter-select">
              <option>All Transactions</option>
              <option>M-Pesa Only</option>
              <option>Tokens Only</option>
              <option>Completed</option>
              <option>Failed</option>
            </select>
            <button className="btn-secondary">
              📥 Export
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Reference</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="payment-date">{payment.date}</td>
                  <td className="payment-time">{payment.time}</td>
                  <td>
                    <span className="payment-method">
                      {payment.type === 'M-Pesa' ? '💳' : '🔑'} {payment.type}
                    </span>
                  </td>
                  <td className="payment-amount">KES {payment.amount}</td>
                  <td>
                    <span className={`status-badge ${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="payment-reference">{payment.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PAYGo;