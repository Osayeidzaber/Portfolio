'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SpaceElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Brighter stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            background: 'white',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white"
          initial={{ 
            top: '-5%',
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            top: '105%',
            left: `${Math.random() * 100}%`,
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4,
            ease: 'linear',
          }}
          style={{
            boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.5)',
            transform: 'rotate(45deg)',
          }}
        />
      ))}

      {/* Nebula effects */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Interactive star field */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={`interactive-${i}`}
          className="absolute w-2 h-2 bg-white rounded-full"
          animate={{
            x: mousePosition.x * (i % 3 + 1) * -30,
            y: mousePosition.y * (i % 3 + 1) * -30,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default SpaceElements; 