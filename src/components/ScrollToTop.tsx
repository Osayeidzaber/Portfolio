'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Smooth scroll animation
    const scrollStep = -window.scrollY / 20; // Divide the distance into 20 steps
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15); // Adjust timing for smoothness
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-3 bg-purple-500/20 backdrop-blur-sm 
                 border border-purple-500/30 rounded-full z-50"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
    >
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        className="text-purple-400"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </motion.svg>
    </motion.button>
  );
};

export default ScrollToTop; 