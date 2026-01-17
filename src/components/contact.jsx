import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { MapPin, Phone, Clock, Star, Send, ChevronDown, ChevronUp } from 'lucide-react';
import './contact.css';

const Contact = () => {
  // --- State Management ---
  const [formSent, setFormSent] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  // --- Refs for GSAP Animations ---
  const bgShape1 = useRef(null);
  const bgShape2 = useRef(null);
  const titleRef = useRef(null);

  // --- GSAP Animation ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Golden Elements
      gsap.to(bgShape1.current, {
        y: 50,
        rotation: 360,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      gsap.to(bgShape2.current, {
        y: -40,
        x: 30,
        duration: 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Title Text Reveal
      gsap.fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );
    });

    return () => ctx.revert();
  }, []);

  // --- Handlers ---
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setFormSent(true), 500);
  };

  const handleRating = (rate) => {
    setRating(rate);
    setTimeout(() => setFeedbackSent(true), 600);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "Is your jewelry BIS Hallmarked?", a: "Yes, every piece of gold jewelry at Jai Maa Bhagvatu is 100% BIS Hallmarked for purity." },
    { q: "Do you accept custom designs?", a: "Absolutely. Bring us your sketch or idea, and our artisans will bring it to life." },
    { q: "What are your return policies?", a: "We offer a 7-day exchange policy on all non-customized items." }
  ];

  return (
    <div className="contact-container">
      {/* Decorative Background Elements */}
      <div ref={bgShape1} className="deco-shape shape-1"></div>
      <div ref={bgShape2} className="deco-shape shape-2"></div>

      <div className="content-wrapper">
        {/* Header */}
        <header className="contact-header">
          <h1 ref={titleRef} className="brand-name">Jai Maa Bhagvatu</h1>
          <p className="brand-tagline">Adorning Your Soul with Divine Elegance</p>
        </header>

        <div className="grid-layout">
          {/* LEFT COLUMN: Info & FAQ */}
          <motion.div 
            className="left-column"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact Details Card */}
            <div className="info-card glass-panel">
              <h3>Get in Touch</h3>
              <div className="info-item">
                <MapPin className="icon-gold" />
                <p>108 Jewel Lane, Golden Market, Jaipur, India</p>
              </div>
              <div className="info-item">
                <Phone className="icon-gold" />
                <p>+91 98765 43210</p>
              </div>
              <div className="info-item">
                <Clock className="icon-gold" />
                <div>
                  <p>Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section glass-panel">
              <h3>Frequently Asked Questions</h3>
              {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                  <button onClick={() => toggleFaq(index)} className="faq-question">
                    {item.q}
                    {activeFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="faq-answer"
                      >
                        <p>{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Form & Feedback */}
          <motion.div 
            className="right-column"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Form */}
            <div className="form-card glass-panel">
              <AnimatePresence mode="wait">
                {!formSent ? (
                  <motion.form 
                    key="contact-form"
                    onSubmit={handleFormSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3>Send us a Message</h3>
                    <div className="input-group">
                      <label>Name</label>
                      <input type="text" placeholder="Your Name" required />
                    </div>
                    <div className="input-group">
                      <label>Message</label>
                      <textarea placeholder="Tell us what you are looking for..." rows="4" required></textarea>
                    </div>
                    <motion.button 
                      type="submit" 
                      className="btn-gold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message <Send size={16} style={{marginLeft: '8px'}}/>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success-msg"
                    className="success-state"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <div className="icon-circle">
                      <Send size={40} color="#D4AF37" />
                    </div>
                    <h4>Your msg has been sent</h4>
                    <p>We will contact you shortly.</p>
                    <button className="btn-link" onClick={() => setFormSent(false)}>Send another</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feedback Section */}
            <div className="feedback-card glass-panel">
              <AnimatePresence mode="wait">
                {!feedbackSent ? (
                  <motion.div 
                    key="rating-ui"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="rating-ui"
                  >
                    <h3>Rate your Experience</h3>
                    <div className="stars-container">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={32}
                          className="star-icon"
                          fill={(hoverRating || rating) >= star ? "#D4AF37" : "transparent"}
                          color="#D4AF37"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => handleRating(star)}
                        />
                      ))}
                    </div>
                    <p className="small-text">Click a star to submit</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="thank-you"
                    className="thank-you-msg"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <h3>Thankyou for your response</h3>
                    <p>We value your feedback!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;