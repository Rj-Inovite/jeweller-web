import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation for the text on hover
  const linkVariants = {
    hover: { 
      color: "#D4AF37", 
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    initial: { color: "#1a1a1a", scale: 1 }
  };

  // Animation for the Golden Underline
  const lineVariants = {
    hidden: { width: "0%" },
    visible: { 
      width: "100%", 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* 1. Desktop Links (Centered & Stylish) */}
          <ul className="nav-menu">
            {['Home', 'Shop', 'Contact'].map((item) => (
              <li key={item} className="nav-item">
                <NavLink 
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={({ isActive }) => "nav-links" + (isActive ? " active-link" : "")}
                >
                  <motion.div
                    className="link-content"
                    initial="initial"
                    whileHover="hover"
                    variants={linkVariants}
                  >
                    {item}
                    {/* Golden Underline Animation */}
                    <motion.span 
                      className="golden-line"
                      variants={lineVariants}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 2. Icons (Right Aligned) */}
          <div className="nav-icons">
            <Link to="/wishlist" className="icon-link">
               <motion.div whileHover={{ scale: 1.1, color: "#D4AF37" }}>
                 <Heart size={22} />
               </motion.div>
            </Link>
            
            <Link to="/cart" className="icon-link">
              <motion.div whileHover={{ scale: 1.1, color: "#D4AF37" }}>
                <ShoppingBag size={22} />
              </motion.div>
            </Link>

            {/* Mobile Hamburger */}
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} color="#D4AF37"/> : <Menu size={28} />}
            </div>
          </div>
        </div>
      </nav>

      {/* 3. Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mobile-links-container">
              {['Home', 'Shop', 'Contact'].map((item) => (
                <Link 
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                  className="mobile-link" 
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;