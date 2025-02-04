'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Faster spring config
  const springConfig = { damping: 12, stiffness: 200, mass: 0.1 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
      });
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed w-4 h-4 pointer-events-none z-[100]"
      style={{ x, y }}
    >
      <motion.div 
        className="w-full h-full bg-white rounded-full opacity-50"
        layoutId="cursor"
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};

export default CustomCursor; 