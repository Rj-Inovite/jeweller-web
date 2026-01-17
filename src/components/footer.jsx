import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react';
import './footer.css';

const Footer = () => {
  // Replace this with your actual WhatsApp number (International format without +)
  // Example: 919876543210 for India
  const chatNumber = "919876543210"; 
  const chatLink = `https://wa.me/${chatNumber}?text=Hello! I am interested in your jewelry collection.`;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
        {/* 1. Brand Section */}
        <motion.div 
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="brand-title">Jai Maa Bhagvatu</h2>
          <div className="gold-divider-small"></div>
          <p className="brand-tagline">Divine Grace in Every Thread.</p>
        </motion.div>

        {/* 2. Chat With Us Section */}
        <motion.div 
          className="chat-section"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a href={chatLink} target="_blank" rel="noopener noreferrer" className="chat-button">
            <MessageCircle size={20} style={{ marginRight: '10px' }} />
            <span>Chat with Us</span>
          </a>
          <p className="chat-helper-text">Have a query? We are online.</p>
        </motion.div>

        {/* 3. Social & Links */}
        <div className="footer-links-row">
          <div className="social-icons">
             {/* Placeholder Social Links */}
             <a href="#" className="social-link"><Instagram size={20} /></a>
             <a href="#" className="social-link"><Facebook size={20} /></a>
             <a href="#" className="social-link"><Twitter size={20} /></a>
          </div>
          
          <div className="policy-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>

        {/* 4. Copyright */}
        <div className="footer-bottom">
          <p>&copy; 2026 Jai Maa Bhagvatu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;