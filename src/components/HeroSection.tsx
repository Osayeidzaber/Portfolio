'use client';
import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';

const HeroSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  return (
    <SectionWrapper id="hero" className="min-h-screen flex flex-col justify-center relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I&apos;m Osayeed Jaber
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-purple-400 font-semibold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            I&apos;m someone who is... creative by ❤️ & I won&apos;t break yours
          </motion.p>

          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Hey! I&apos;m a full-stack developer who&apos;s just as passionate about writing clean code as I am about anime marathons. Think of me as the character who grinds to level up, always looking for new quests!
          </motion.p>
        </motion.div>
      </div>

      {/* Updated scroll indicator */}
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? 20 : 0
        }}
        transition={{ 
          duration: 0.6,
          ease: "easeOut"
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="text-purple-400/80"
            animate={{ 
              y: [0, 8, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="animate-pulse"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </motion.div>
          <motion.span 
            className="text-sm font-light tracking-wider text-purple-400/60"
            animate={{ 
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Scroll to explore
          </motion.span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default HeroSection; 