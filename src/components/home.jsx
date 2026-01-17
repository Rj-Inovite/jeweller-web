import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// --- Placeholder Data ---
const heroImages = [
    "https://www.globalitsolutionsgroup.com/in/blog/wp-content/uploads/2025/02/2.jpg",
    "https://cdn2.f-cdn.com/contestentries/1858382/50358845/5fd2541625cc1_thumb900.jpg",
  "https://royalediamonds.com/uploads/slider_banner/202411121102202405031748RD%20992%20X%20525px%20Banner.webp", 
  "https://thumbs.dreamstime.com/b/high-quality-illustration-elegant-bracelet-featuring-sparkling-diamonds-perfect-glamorous-jewelry-design-concept-banner-335292164.jpg", 
 ];

const bestSellers = [
  "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80",
  "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2NQcDsESYSGFwEf25c_XOv5lwqkmh0XfOow&s",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFDt5PhpfEdTNH2EzEI4Z50hCfVcKMSkqYQ&s",
  "https://cdn2.f-cdn.com/contestentries/1858382/50358845/5fd2541625cc1_thumb900.jpg",
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80"
];

const specialOfferImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&q=80", title: "Eternal Rings" },
  { id: 2, src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80", title: "Divine Bracelets" },
  { id: 3, src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80", title: "Royal Necklaces" },
  { id: 4, src: "https://cdn2.f-cdn.com/contestentries/1858382/50358845/5fd2541625cc1_thumb900.jpg", title: "Graceful " },
];

const founderImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop"; 

const testimonials = [
  { id: 1, name: "Anjali Sharma", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARFglvwwUIjhsRz14zqeNErkQDhHyO5iFUw&s", text: "The craftsmanship of Jai Maa Bhagvatu is unparalleled. My wedding set is a dream come true." },
  { id: 2, name: "Rajesh Verma", img: "https://i.pinimg.com/564x/69/f9/fa/69f9faeae9581bae93b3fb7d1cf3c939.jpg", text: "Excellent service and truly divine designs. They understand the soul of jewelry." },
  { id: 3, name: "Priya Desai", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-nQlcY0Qz9MwPUhvD5OixoLGN7NI4VnOGVg&s", text: "I've never seen such intricate detailing. Every piece feels like a blessing." }
];

const Home = () => {
  const navigate = useNavigate();
  
  // --- State ---
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- Refs for GSAP ---
  const eosRef = useRef(null); // End of Season Section
  const offerRef = useRef(null); // Special Offers Section
  const founderRef = useRef(null);
  const journeyRef = useRef(null);

  // --- Hero Slider Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentHeroSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentHeroSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));

  // --- GSAP Animations ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. End Of Season (Slide In + Continuous Float)
      const eosTl = gsap.timeline({
        scrollTrigger: { trigger: eosRef.current, start: "top 75%" }
      });

      eosTl
        .from(".eos-img-box.left", { x: -100, opacity: 0, duration: 1.2, ease: "power2.out" })
        .from(".eos-img-box.right", { x: 100, opacity: 0, duration: 1.2, ease: "power2.out" }, "<") // Run simultaneously
        .from(".eos-content", { y: 50, opacity: 0, scale: 0.9, duration: 1 }, "-=0.8");

      // Continuous Floating Effect for EOS Images
      gsap.to(".eos-img-box", {
        y: 15, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut"
      });


      // 2. Special Offers (Staggered Pop Effect)
      gsap.from(".offer-box", {
        scrollTrigger: { trigger: offerRef.current, start: "top 80%" },
        scale: 0.8,
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Domino effect
        ease: "back.out(1.7)" // "Pop" effect
      });


      // 3. Founder Section Animation
      gsap.from(".founder-content", {
        scrollTrigger: { trigger: founderRef.current, start: "top 70%" },
        x: 100, opacity: 0, duration: 1.5, ease: "power3.out"
      });
      gsap.from(".founder-img-box", {
        scrollTrigger: { trigger: founderRef.current, start: "top 70%" },
        x: -100, opacity: 0, duration: 1.5, ease: "power3.out", delay: 0.2
      });


      // 4. Journey Section Animation
      gsap.utils.toArray(".journey-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, delay: i * 0.2, ease: "power2.out"
        });
      });

    });
    return () => ctx.revert();
  }, []);

  // --- Typing Animation Variant ---
  const typingContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 } 
    }
  };

  const typingLetter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="home-container">
      
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentHeroSlide}
            className="hero-slide"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{ backgroundImage: `url(${heroImages[currentHeroSlide]})` }}
          />
        </AnimatePresence>
        
        <button className="slider-btn left" onClick={prevSlide}><ChevronLeft size={40}/></button>
        <button className="slider-btn right" onClick={nextSlide}><ChevronRight size={40}/></button>
      </section>


      {/* 2. END OF SEASON SALE (Animated) */}
      <section className="eos-section" ref={eosRef}>
        <div className="eos-container grid-3">
          {/* Added 'left' class for GSAP targeting */}
          <div className="eos-img-box left">
            <img src={specialOfferImages[2].src} alt="Sale Left" />
          </div>
          
          <div className="eos-content glass-panel">
            <h2>End of Season Sale</h2>
            <div className="divider-gold"></div>
            <p>Discover exclusive pieces at exceptional prices. Adorn yourself in luxury before it's gone.</p>
            <motion.button 
              className="btn-gold-solid"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/shop')}
            >
              SHOP NOW
            </motion.button>
          </div>
          
          {/* Added 'right' class for GSAP targeting */}
          <div className="eos-img-box right">
            <img src={specialOfferImages[3].src} alt="Sale Right" />
          </div>
        </div>
      </section>


      {/* 3. SPECIAL OFFERS (Animated) */}
      <section className="section-padding" ref={offerRef}>
        <h2 className="section-title">Special Offers</h2>
        <div className="offer-grid grid-4">
          {specialOfferImages.map((item) => (
            <motion.div 
              key={item.id} 
              className="offer-box"
              whileHover={{ y: -10 }} // Extra interaction on hover
            >
              <div className="img-wrapper"><img src={item.src} alt={item.title} /></div>
              <div className="offer-overlay">
                <h3>{item.title}</h3>
                <button className="btn-link-white" onClick={() => navigate('/shop')}>View Collection</button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 4. BEST SELLERS (Marquee) */}
      <section className="section-padding bg-pink">
        <h2 className="section-title">Our Best Sellers</h2>
        <div className="marquee-container">
          <motion.div 
            className="marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...bestSellers, ...bestSellers].map((img, index) => (
              <div key={index} className="marquee-item">
                <img src={img} alt="Best seller jewelry" />
              </div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* 5. FOUNDER SECTION */}
      <section className="section-padding" ref={founderRef}>
        <div className="founder-wrapper">
          <div className="founder-img-box">
            <img src={founderImage} alt="Devanand Jasmatiya" />
            <div className="founder-frame"></div>
          </div>
          
          <div className="founder-content">
            <h4 className="subtitle-gold">The Man Behind The Vision</h4>
            <h2 className="founder-name">Devanand Jasmatiya</h2>
            <div className="divider-gold left-align"></div>
            
            <p className="founder-text">
              With a heart forged in devotion and eyes that see the divine in every stone, 
              Mr. Devanand Jasmatiya founded <strong>Jai Maa Bhagvatu</strong> not as a business, but as a legacy of grace.
            </p>
            <p className="founder-text">
              "To create jewelry is to capture a fragment of the eternal light. Every curve, 
              every polish, and every setting is done with the prayer that it brings 
              prosperity and beauty to the one who wears it."
            </p>
            
            <div className="signature">Devanand J.</div>
          </div>
        </div>
      </section>


      {/* 6. JOURNEY SECTION */}
      <section className="section-padding bg-white" ref={journeyRef}>
        <h2 className="section-title">Our Journey</h2>
        <div className="journey-container">
          
          <div className="journey-card card-left">
            <div className="j-number">01</div>
            <h3>The Beginning</h3>
            <p>Started in a humble workshop in Jaipur, fueled by passion and ancient techniques passed down through generations.</p>
          </div>

          <div className="journey-card card-right">
            <div className="j-number">02</div>
            <h3>The Expansion</h3>
            <p>Growing into a trusted name, we blended traditional artistry with modern elegance, winning hearts across the nation.</p>
          </div>

          <div className="journey-card card-center">
            <div className="j-number">03</div>
            <h3>The Legacy</h3>
            <p>"Jai Maa Bhagvatu" now stands as a symbol of purity, devotion, and timeless beauty, adorning thousands of souls.</p>
          </div>

        </div>
      </section>


      {/* 7. TESTIMONIALS */}
      <section className="section-padding bg-pink">
        <h2 className="section-title">Client Testimonials</h2>
        
        <div className="testimonial-wrapper glass-panel">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={currentTestimonial}
              className="testimonial-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="testi-img-col">
                <motion.img 
                  src={testimonials[currentTestimonial].img} 
                  alt="Client" 
                  initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}
                />
              </div>

              <div className="testi-text-col">
                <Quote size={40} className="quote-icon" color="#D4AF37" />
                
                <motion.div 
                  className="typing-text"
                  variants={typingContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {testimonials[currentTestimonial].text.split("").map((char, index) => (
                    <motion.span key={index} variants={typingLetter}>{char}</motion.span>
                  ))}
                </motion.div>

                <div className="testi-author">
                  <h4>{testimonials[currentTestimonial].name}</h4>
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" color="#D4AF37"/>)}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          <div className="testi-dots">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;