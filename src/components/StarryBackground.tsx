'use client';
import { motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

const Star = ({ delay = 0 }) => (
  <div
    className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
    }}
  />
);

const StarryBackground = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  return (
    <>
      <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden -z-10">
        {/* Reduce number of stars */}
        {[...Array(50)].map((_, i) => (
          <Star key={i} delay={Math.random() * 3} />
        ))}

        {/* Static gradients instead of animated glows */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-black/50 opacity-30" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-50 pointer-events-none w-full flex justify-center items-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-white/40 animate-bounce">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              className="opacity-50"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
          <span className="text-xs font-light tracking-wider text-white/30">
            scroll to explore
          </span>
        </div>
      </motion.div>
    </>
  );
};

export default StarryBackground; 