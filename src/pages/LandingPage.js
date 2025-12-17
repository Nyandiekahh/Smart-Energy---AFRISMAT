import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: "⚡",
      title: "Real-Time Monitoring",
      description: "Track your DC energy consumption in real-time with precision metering and instant updates."
    },
    {
      icon: "💳",
      title: "Flexible PAYGo",
      description: "Pay-as-you-go system integrated with M-Pesa for seamless mobile payments across Africa."
    },
    {
      icon: "🌍",
      title: "Open Source",
      description: "Fully open-source platform designed for African innovators, by African innovators."
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Access detailed usage analytics and insights to optimize your energy consumption."
    },
    {
      icon: "🔒",
      title: "Secure & Encrypted",
      description: "Bank-level security with encrypted token authentication and TLS communication."
    },
    {
      icon: "☀️",
      title: "Solar Optimized",
      description: "Specifically designed for off-grid DC solar systems and productive-use applications."
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "50+", label: "African Communities" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="nav-container">
          <motion.div 
            className="nav-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-icon">⚡</span>
            <span className="logo-text">Smart Energy Africa</span>
          </motion.div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            <Link to="/login" className="nav-link nav-link-login">Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="sun-animation"></div>
          <div className="grid-pattern"></div>
        </div>
        
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-dot"></span>
            Powering Africa's Future
          </motion.div>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Smart DC Energy
            <br />
            <span className="text-gradient">Logger + PAYGo</span>
          </motion.h1>
          
          <motion.p className="hero-subtitle" variants={itemVariants}>
            Open-source smart metering and pay-as-you-go system designed for
            <br />
            off-grid solar communities across Africa
          </motion.p>
          
          <motion.div className="hero-cta" variants={itemVariants}>
            <Link to="/register" className="btn btn-primary btn-large">
              Start Your Journey
              <span className="btn-arrow">→</span>
            </Link>
            <a href="#features" className="btn btn-secondary btn-large">
              Learn More
            </a>
          </motion.div>

          <motion.div className="hero-quote" variants={itemVariants}>
            <p className="quote-text">
              "Energy is the golden thread that connects economic growth, social equity,
              <br />
              and environmental sustainability."
            </p>
            <p className="quote-author">— UN Secretary-General Ban Ki-moon</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="device-mockup">
            <div className="device-screen">
              <div className="screen-header">
                <div className="screen-dot"></div>
                <div className="screen-dot"></div>
                <div className="screen-dot"></div>
              </div>
              <div className="screen-content">
                <div className="power-display">
                  <span className="power-value">2.4</span>
                  <span className="power-unit">kW</span>
                </div>
                <div className="status-bar">
                  <div className="status-item active">
                    <span className="status-dot"></span>
                    System Active
                  </div>
                </div>
                <div className="energy-bars">
                  <div className="energy-bar" style={{width: '85%'}}></div>
                  <div className="energy-bar" style={{width: '70%'}}></div>
                  <div className="energy-bar" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Powerful Features for Africa</h2>
          <p className="section-subtitle">
            Built with African communities in mind, designed for scalability and sustainability
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="about-title">
              Bridging the Energy Gap
              <br />
              <span className="text-gradient">Across Africa</span>
            </h2>
            <p className="about-text">
              Over 600 million people in Sub-Saharan Africa lack access to electricity.
              Our open-source Smart DC Energy Logger + PAYGo system is designed to
              democratize energy access through innovative technology and flexible payment solutions.
            </p>
            <p className="about-text">
              Developed by African engineers for African communities, our system
              integrates seamlessly with M-Pesa and supports local innovation,
              customization, and sustainable growth.
            </p>
            <div className="about-quote-box">
              <p className="about-quote">
                "This is not just technology—it's a movement towards energy independence
                and economic empowerment for every African household."
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="visual-card">
              <div className="visual-icon">🌍</div>
              <h3>Pan-African Solution</h3>
              <p>Designed for communities from Kenya to Nigeria, Ghana to Rwanda</p>
            </div>
            <div className="visual-card">
              <div className="visual-icon">💡</div>
              <h3>Innovation First</h3>
              <p>Open-source platform that empowers local developers and entrepreneurs</p>
            </div>
            <div className="visual-card">
              <div className="visual-icon">🤝</div>
              <h3>Community Driven</h3>
              <p>Built with feedback from actual users in off-grid communities</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div 
          className="cta-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Transform Your Energy Access?</h2>
          <p className="cta-subtitle">
            Join thousands of users across Africa already benefiting from smart energy management
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
            <a href="#contact" className="btn btn-secondary btn-large">
              Contact Sales
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-title">
              <span className="logo-icon">⚡</span>
              Smart Energy Africa
            </h3>
            <p className="footer-text">
              Open-source smart DC energy monitoring and PAYGo system for off-grid communities.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">Twitter</a>
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Status</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact</h4>
            <p className="footer-text">
              Bradley Ondari<br />
              +254 722 114 521<br />
              bradleyndege08@gmail.com
            </p>
            <p className="footer-text">
              Emmanuel Kamau<br />
              +254 791 280 942<br />
              emmanuelryley55@gmail.com
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Smart Energy Africa. Built with ❤️ for Africa.</p>
          <p className="footer-credits">
            Department of Mechatronic Engineering, JKUAT | SDG 7: Affordable and Clean Energy
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;