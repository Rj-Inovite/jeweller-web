import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, ZoomIn, ShoppingBag } from 'lucide-react';
import './shop.css';

// --- MOCK DATA GENERATOR ---
const generateProducts = () => {
  const categories = ['Ring', 'Bracelet', 'Earring', 'Pendent'];
  
  // Specific Images requested by user
  const images = {
    'Ring': [
      "https://th.bing.com/th/id/OIP.FHs3Ty3asyMBwhYQ9ywOMwAAAA?w=184&h=260&c=7&r=0&o=7&pid=1.7&rm=3",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
      "https://th.bing.com/th/id/OIP.E40EkdlmMVk7GDoKYr2kwgHaLG?w=184&h=276&c=7&r=0&o=7&pid=1.7&rm=3",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiwLa7gHR9q2WyjHpvw02233ydc942LcVGLw&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUkm9Yjuiuo3q-e-lVDrUDwfwmRKN5OKIyxw&s",
      "https://m.media-amazon.com/images/I/61uT60nDeXL._AC_UF894,1000_QL80_.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu0IbbFWG0UuKgRwkY6rVKuJ8plfdJ1inkCmLqxooV7Q&s",
      "https://i.pinimg.com/236x/d9/74/2f/d9742fa13f05eca4d94665bc8a62e05f.jpg"
    ],
    'Bracelet': [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
      "https://cdn.pixabay.com/photo/2018/11/02/16/50/gold-jewelry-3790542_640.jpg",
      "https://i.pinimg.com/originals/79/4a/9d/794a9dde3c0bb5c9973ccd6ab0cf62ba.jpg",
      "https://i.pinimg.com/736x/ba/ef/1b/baef1b7caf45a00945432751f6f780b2.jpg",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80", // reused for demo to hit 8 count if needed
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80",
      "https://cdn.pixabay.com/photo/2018/11/02/16/50/gold-jewelry-3790542_640.jpg"
    ],
    'Earring': [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
       "https://www.shutterstock.com/image-photo/earring-gold-black-zirconia-stones-260nw-2522928583.jpg",
      "https://thumbs.dreamstime.com/b/pair-gold-earrings-diamonds-white-plate-shiny-sparkly-417406069.jpg",
      "https://www.wamanharipethesons.com/portalrepository/images/product/WHPS3300_0_r.jpg",
      "https://images.unsplash.com/photo-1596944924616-00cc3c78b549?w=600&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
      "https://thumbs.dreamstime.com/b/pair-gold-earrings-diamonds-white-plate-shiny-sparkly-417406069.jpg"
    ],
    'Pendent': [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://rukminim2.flixcart.com/image/480/580/l4ln8nk0/shopsy-mangalsutra-tanmaniya/u/a/k/sopy-reg-chain-t-letter-yes-jewel-world-original-imagfgftprpkdcgr.jpeg?q=90",
      "https://images.meesho.com/images/products/572485671/ddpsf_512.webp?width=512",
      "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021158151_437Wx649H_202402140303221.jpeg",
      "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?w=600&q=80",
      "https://rukminim2.flixcart.com/image/480/580/l4ln8nk0/shopsy-mangalsutra-tanmaniya/u/a/k/sopy-reg-chain-t-letter-yes-jewel-world-original-imagfgftprpkdcgr.jpeg?q=90",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
      "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021158151_437Wx649H_202402140303221.jpeg"
    ]
  };

  const tags = ['Special Edition', 'Best Seller', 'New Arrival', 'Limited'];
  const subCats = {
    'Ring': ['Engagement', 'For Her', 'For Him', 'Promise'],
    'Bracelet': ['Charm', 'Cuff', 'Chain', 'Tennis'],
    'Earring': ['Studs', 'Drops', 'Hoops', 'Chandeliers'],
    'Pendent': ['Lockets', 'Solitaire', 'Religious', 'Modern']
  };

  let products = [];
  let idCounter = 1;

  // Generate 8 items for each category
  categories.forEach(cat => {
    for (let i = 0; i < 8; i++) {
      products.push({
        id: idCounter++,
        category: cat,
        subCategory: subCats[cat][i % 4],
        title: `${cat} - ${subCats[cat][i % 4]} Collection`,
        price: (Math.random() * 5000 + 1000).toFixed(0),
        // Use the specific image based on index, loop if fewer than 8 provided
        image: images[cat][i % images[cat].length], 
        tag: i % 3 === 0 ? tags[i % 4] : null,
        shape: i % 5 === 0 ? 'wide' : (i % 4 === 0 ? 'tall' : 'square') 
      });
    }
  });

  return products;
};

const allProducts = generateProducts();

const Shop = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (activeFilter === 'All') {
      // Pick a diverse set of 15 images for the "All" view
      // We want to make sure we don't just show the first 15 rings
      const mixed = [];
      const categories = ['Ring', 'Bracelet', 'Earring', 'Pendent'];
      for(let i=0; i<4; i++) {
         const catProducts = allProducts.filter(p => p.category === categories[i]);
         mixed.push(...catProducts.slice(0, 4)); // Take 4 from each
      }
      setFilteredProducts(mixed.slice(0, 15));
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === activeFilter));
    }
  }, [activeFilter]);

  const toggleWishlist = (e, id) => {
    e.stopPropagation();
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  const categories = ['All', 'Ring', 'Bracelet', 'Earring', 'Pendent'];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="shop-container">
      
      {/* SIDEBAR */}
      <aside className="shop-sidebar">
        <div className="sidebar-header">
          <h2>Collection</h2>
          <div className="gold-line"></div>
        </div>
        
        <nav className="filter-nav">
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {activeFilter === cat && <motion.span layoutId="activeDot" className="active-dot" />}
              {cat === 'All' ? 'View All' : `${cat}s`}
            </button>
          ))}
        </nav>
        
        {/* Added some sidebar visual interest */}
        <div className="sidebar-decor">
             <img src="https://cdn-icons-png.flaticon.com/512/408/408428.png" alt="Jewelry Icon" style={{width: '40px', opacity: 0.5, marginBottom: '10px'}}/>
             <p>Discover unique pieces curated for your divine moments.</p>
        </div>
      </aside>

      {/* MAIN GRID */}
      <main className="shop-grid-area">
        <div className="grid-header">
          <motion.h1
             key={activeFilter}
             initial={{ y: -20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.5 }}
          >
            {activeFilter === 'All' ? 'Curated Selection' : `${activeFilter} Collection`}
          </motion.h1>
          <p>{filteredProducts.length} Exquisite Items Found</p>
        </div>

        <motion.div 
          layout 
          className="product-masonry"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          // We use key to re-trigger staggered animation when filter changes
          key={activeFilter + "-grid"} 
        >
          <AnimatePresence mode='wait'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                variants={itemVariants}
                key={product.id}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`product-card ${product.shape}`}
                onClick={() => setSelectedImage(product)}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.2)" }}
              >
                <div className="image-wrapper">
                  <img src={product.image} alt={product.title} loading="lazy" />
                  
                  <div className="card-overlay">
                     <ZoomIn size={32} color="#fff" />
                     <span>Click to Zoom</span>
                  </div>
                  
                  {product.tag && (
                    <div className="special-tag">{product.tag}</div>
                  )}

                  <button 
                    className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                    onClick={(e) => toggleWishlist(e, product.id)}
                  >
                    <Heart size={18} fill={wishlist.includes(product.id) ? "#D4AF37" : "none"} />
                  </button>
                </div>

                <div className="product-info">
                  <span className="sub-category">{product.subCategory}</span>
                  <h3>{product.title}</h3>
                  <div className="price-row">
                    <span className="price">₹{product.price}</span>
                    <button className="add-cart-btn">Add +</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* ZOOM MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedImage(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-grid">
                <div className="modal-img-box">
                  <img src={selectedImage.image} alt={selectedImage.title} />
                </div>
                
                <div className="modal-details">
                  <span className="modal-sub">{selectedImage.subCategory}</span>
                  <h2>{selectedImage.title}</h2>
                  <div className="gold-divider"></div>
                  <p>
                    Handcrafted with precision. This <strong>{selectedImage.tag || 'Classic Piece'}</strong> is designed 
                    to reflect the divine elegance of the wearer. Perfect for {selectedImage.subCategory} occasions.
                  </p>
                  <h3 className="modal-price">₹{selectedImage.price}</h3>
                  
                  <div className="modal-actions">
                    <button className="btn-primary-gold">
                      <ShoppingBag size={18} style={{marginRight: '8px'}} /> Add to Cart
                    </button>
                    <button 
                      className="btn-outline-gold"
                      onClick={(e) => toggleWishlist(e, selectedImage.id)}
                    >
                      {wishlist.includes(selectedImage.id) ? 'Wishlisted' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Shop;