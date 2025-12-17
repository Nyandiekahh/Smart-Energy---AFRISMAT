import React, { useState } from 'react';
import './Billing.css';

const Billing = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('all');

  // Billing history data
  const billingHistory = [
    {
      id: 'INV-2024-001',
      date: 'Dec 10, 2024',
      period: 'Nov 2024',
      amount: 11400,
      usage: 570,
      status: 'paid',
      paymentMethod: 'M-Pesa',
      dueDate: 'Dec 15, 2024'
    },
    {
      id: 'INV-2024-002',
      date: 'Nov 10, 2024',
      period: 'Oct 2024',
      amount: 12360,
      usage: 618,
      status: 'paid',
      paymentMethod: 'M-Pesa',
      dueDate: 'Nov 15, 2024'
    },
    {
      id: 'INV-2024-003',
      date: 'Oct 10, 2024',
      period: 'Sep 2024',
      amount: 11800,
      usage: 590,
      status: 'paid',
      paymentMethod: 'Token',
      dueDate: 'Oct 15, 2024'
    },
    {
      id: 'INV-2024-004',
      date: 'Sep 10, 2024',
      period: 'Aug 2024',
      amount: 11000,
      usage: 550,
      status: 'paid',
      paymentMethod: 'M-Pesa',
      dueDate: 'Sep 15, 2024'
    },
    {
      id: 'INV-2024-005',
      date: 'Aug 10, 2024',
      period: 'Jul 2024',
      amount: 12200,
      usage: 610,
      status: 'overdue',
      paymentMethod: '-',
      dueDate: 'Aug 15, 2024'
    }
  ];

  // Summary stats
  const stats = {
    totalSpent: 58760,
    avgMonthly: 11752,
    currentBalance: 245.50,
    nextBilling: 'Jan 10, 2025'
  };

  const handleDownloadInvoice = (invoiceId) => {
    alert(`Downloading invoice ${invoiceId}`);
  };

  const handlePayNow = (invoiceId) => {
    alert(`Redirecting to payment for ${invoiceId}`);
  };

  return (
    <div className="billing-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">Billing History</h1>
          <p className="page-description">View and manage your payment records and invoices</p>
        </div>
        <button className="btn-primary">
          📥 Download Statement
        </button>
      </div>

      {/* Summary Cards */}
      <div className="billing-summary">
        <div className="summary-card-billing">
          <div className="summary-icon-billing">💰</div>
          <div className="summary-content-billing">
            <p className="summary-label-billing">Total Spent (YTD)</p>
            <h3 className="summary-value-billing">KES {stats.totalSpent.toLocaleString()}</h3>
          </div>
        </div>

        <div className="summary-card-billing">
          <div className="summary-icon-billing">📊</div>
          <div className="summary-content-billing">
            <p className="summary-label-billing">Avg. Monthly Bill</p>
            <h3 className="summary-value-billing">KES {stats.avgMonthly.toLocaleString()}</h3>
          </div>
        </div>

        <div className="summary-card-billing">
          <div className="summary-icon-billing">💳</div>
          <div className="summary-content-billing">
            <p className="summary-label-billing">Current Balance</p>
            <h3 className="summary-value-billing">KES {stats.currentBalance}</h3>
          </div>
        </div>

        <div className="summary-card-billing">
          <div className="summary-icon-billing">📅</div>
          <div className="summary-content-billing">
            <p className="summary-label-billing">Next Billing Date</p>
            <h3 className="summary-value-billing">{stats.nextBilling}</h3>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="billing-filters">
        <div className="filter-group">
          <label>Status</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Period</label>
          <select value={filterPeriod} onChange={(e) => setFilterPeriod(e.target.value)}>
            <option value="all">All Time</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Search</label>
          <input type="text" placeholder="Search invoice ID..." />
        </div>
      </div>

      {/* Billing Table */}
      <div className="content-card">
        <div className="card-header">
          <h2 className="card-title">All Invoices</h2>
          <span className="invoice-count">{billingHistory.length} invoices</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Billing Period</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Usage (kWh)</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="invoice-id">{invoice.id}</td>
                  <td className="billing-period">{invoice.period}</td>
                  <td>{invoice.date}</td>
                  <td>{invoice.dueDate}</td>
                  <td className="usage-value">{invoice.usage} kWh</td>
                  <td className="amount-value">KES {invoice.amount.toLocaleString()}</td>
                  <td>
                    <span className="payment-method">
                      {invoice.paymentMethod === 'M-Pesa' ? '💳' : 
                       invoice.paymentMethod === 'Token' ? '🔑' : '-'} {invoice.paymentMethod}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${invoice.status}`}>
                      {invoice.status === 'paid' ? '✓ Paid' :
                       invoice.status === 'pending' ? '⏳ Pending' :
                       '⚠ Overdue'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-action-small"
                        onClick={() => handleDownloadInvoice(invoice.id)}
                      >
                        📄 Download
                      </button>
                      {invoice.status === 'overdue' && (
                        <button 
                          className="btn-action-small pay"
                          onClick={() => handlePayNow(invoice.id)}
                        >
                          💳 Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods-section">
        <h2 className="section-title">Payment Methods</h2>
        <div className="payment-methods-grid">
          <div className="payment-method-card">
            <div className="payment-icon">💳</div>
            <h4 className="payment-title">M-Pesa</h4>
            <p className="payment-description">Pay instantly via M-Pesa STK Push</p>
            <span className="payment-status active">Active</span>
          </div>

          <div className="payment-method-card">
            <div className="payment-icon">🔑</div>
            <h4 className="payment-title">Token</h4>
            <p className="payment-description">Redeem prepaid energy tokens</p>
            <span className="payment-status active">Active</span>
          </div>

          <div className="payment-method-card">
            <div className="payment-icon">🏦</div>
            <h4 className="payment-title">Bank Transfer</h4>
            <p className="payment-description">Direct bank account transfer</p>
            <span className="payment-status inactive">Coming Soon</span>
          </div>

          <div className="payment-method-card">
            <div className="payment-icon">💰</div>
            <h4 className="payment-title">Credit/Debit Card</h4>
            <p className="payment-description">Pay with Visa, Mastercard</p>
            <span className="payment-status inactive">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Billing Info */}
      <div className="billing-info-section">
        <div className="info-card">
          <h3 className="info-title">📋 Billing Information</h3>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Billing Cycle:</span>
              <span className="info-value">Monthly (10th of each month)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rate:</span>
              <span className="info-value">KES 20 per kWh</span>
            </div>
            <div className="info-item">
              <span className="info-label">Connection Fee:</span>
              <span className="info-value">KES 50 per month</span>
            </div>
            <div className="info-item">
              <span className="info-label">Tax Rate:</span>
              <span className="info-value">16% VAT</span>
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3 className="info-title">💡 Payment Tips</h3>
          <ul className="tips-list">
            <li>Pay before the due date to avoid late fees</li>
            <li>Set up auto-payment for convenience</li>
            <li>Check your email for monthly statements</li>
            <li>Contact support for payment issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Billing;