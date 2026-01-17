import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './components/WishlistContext.jsx';
import Layout from './components/Layout.jsx';
import Home from './components/home.jsx';
import Shop from './components/shop.jsx';
import Contact from './components/contact.jsx';
import './App.css';

function App() {
  return (
    <WishlistProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </WishlistProvider>
  );
}

export default App;
