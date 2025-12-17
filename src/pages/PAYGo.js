import React, { useState } from 'react';
import './PAYGo.css';

const PAYGo = () => {
  const [activeTab, setActiveTab] = useState('topup'); // topup or token
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock balance data
  const balance = {
    amount: 245.50,
    daysRemaining: 12,
    lastTopUp: 'Just Now',
    lastTopUpAmount: 500
  };

  // Quick amount buttons
  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  // Payment history data
  const paymentHistory = [
    { id: 1, date: 'Dec 17, 2025', time: 'Just Now', type: 'M-Pesa', amount: 500, status: 'Completed', reference: 'RKJ8H3N2LP' },
    { id: 2, date: 'Dec 5, 2025', time: '11:15 AM', type: 'M-Pesa', amount: 1000, status: 'Completed', reference: 'QWE4R5T6YU' },
    { id: 3, date: 'Nov 28, 2025', time: '04:45 PM', type: 'Token', amount: 200, status: 'Completed', reference: 'TOKEN-123456' },
    { id: 4, date: 'Nov 20, 2025', time: '09:20 AM', type: 'M-Pesa', amount: 500, status: 'Completed', reference: 'ASD3F4G5HJ' },
    { id: 5, date: 'Nov 15, 2025', time: '03:10 PM', type: 'M-Pesa', amount: 300, status: 'Failed', reference: 'ZXC6V7B8NM' },
  ];

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    
    // Validate inputs
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
      // Call backend API
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
        
        // Clear form
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
    
    // Simulate token redemption
    setTimeout(() => {
      setLoading(false);
      alert(`Token ${token} redeemed successfully!`);
      setToken('');
    }, 1500);
  };

  const selectQuickAmount = (value) => {
    setAmount(value.toString());
  };

  return (
    <div className="paygo-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">PAYGo & Credits</h1>
          <p className="page-description">Manage your energy credits and make payments</p>
        </div>
      </div>

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
            <p className="balance-subtext">Based on current usage</p>
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