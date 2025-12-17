import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // FAQ data
  const faqs = [
    {
      category: 'billing',
      question: 'How do I make a payment?',
      answer: 'You can make payments via M-Pesa STK Push on the PAYGo page, or redeem prepaid tokens. Payments are instant and your credit is updated immediately.'
    },
    {
      category: 'billing',
      question: 'What happens if my credit runs out?',
      answer: 'When your credit balance reaches zero, your energy supply will be temporarily suspended. Top up immediately to restore service.'
    },
    {
      category: 'technical',
      question: 'How do I add a new device?',
      answer: 'Go to the Devices page and click "Add New Device". Enter the device code and follow the setup instructions.'
    },
    {
      category: 'technical',
      question: 'Why is my device showing offline?',
      answer: 'Check the device connection and ensure it\'s powered on. If the issue persists, try restarting the device or contact support.'
    },
    {
      category: 'account',
      question: 'How do I change my password?',
      answer: 'Go to Settings > Security and follow the password change process. You\'ll need your current password to set a new one.'
    },
    {
      category: 'account',
      question: 'Can I update my contact information?',
      answer: 'Yes, go to Settings > Profile to update your name, email, phone number, and address.'
    }
  ];

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const handleSubmitContact = (e) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We\'ll get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="support-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title-main">Help & Support</h1>
          <p className="page-description">Get help with your Smart Energy account</p>
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="quick-help-grid">
        <div className="help-card">
          <div className="help-icon">📞</div>
          <h3 className="help-title">Call Us</h3>
          <p className="help-text">+254 722 114 521</p>
          <p className="help-hours">Mon-Fri: 8AM - 6PM</p>
        </div>

        <div className="help-card">
          <div className="help-icon">📧</div>
          <h3 className="help-title">Email Support</h3>
          <p className="help-text">support@smartenergy.africa</p>
          <p className="help-hours">Response within 24hrs</p>
        </div>

        <div className="help-card">
          <div className="help-icon">💬</div>
          <h3 className="help-title">Live Chat</h3>
          <p className="help-text">Chat with our team</p>
          <button className="btn-chat">Start Chat</button>
        </div>

        <div className="help-card">
          <div className="help-icon">🌐</div>
          <h3 className="help-title">Visit Website</h3>
          <p className="help-text">www.smartenergy.africa</p>
          <p className="help-hours">More resources available</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2 className="section-title">Frequently Asked Questions</h2>
        
        <div className="faq-categories">
          <button 
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button 
            className={`category-btn ${activeCategory === 'billing' ? 'active' : ''}`}
            onClick={() => setActiveCategory('billing')}
          >
            Billing
          </button>
          <button 
            className={`category-btn ${activeCategory === 'technical' ? 'active' : ''}`}
            onClick={() => setActiveCategory('technical')}
          >
            Technical
          </button>
          <button 
            className={`category-btn ${activeCategory === 'account' ? 'active' : ''}`}
            onClick={() => setActiveCategory('account')}
          >
            Account
          </button>
        </div>

        <div className="faq-list">
          {filteredFaqs.map((faq, index) => (
            <details key={index} className="faq-item">
              <summary className="faq-question">{faq.question}</summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-section">
        <h2 className="section-title">Send Us a Message</h2>
        <p className="section-subtitle">Can't find what you're looking for? We're here to help!</p>

        <form onSubmit={handleSubmitContact} className="contact-form">
          <div className="form-row-support">
            <div className="form-group-support">
              <label>Full Name</label>
              <input 
                type="text" 
                value={contactForm.name}
                onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group-support">
              <label>Email Address</label>
              <input 
                type="email" 
                value={contactForm.email}
                onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group-support">
            <label>Subject</label>
            <input 
              type="text" 
              value={contactForm.subject}
              onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
              required
            />
          </div>

          <div className="form-group-support">
            <label>Message</label>
            <textarea 
              rows="5"
              value={contactForm.message}
              onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            📨 Send Message
          </button>
        </form>
      </div>

      {/* Resources */}
      <div className="resources-section">
        <h2 className="section-title">Additional Resources</h2>
        <div className="resources-grid">
          <a href="#" className="resource-card">
            <div className="resource-icon">📚</div>
            <h4>User Guide</h4>
            <p>Complete guide to using Smart Energy</p>
          </a>

          <a href="#" className="resource-card">
            <div className="resource-icon">🎥</div>
            <h4>Video Tutorials</h4>
            <p>Watch step-by-step tutorials</p>
          </a>

          <a href="#" className="resource-card">
            <div className="resource-icon">📖</div>
            <h4>Documentation</h4>
            <p>Technical documentation and APIs</p>
          </a>

          <a href="#" className="resource-card">
            <div className="resource-icon">🔧</div>
            <h4>Troubleshooting</h4>
            <p>Common issues and solutions</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Support;