'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function SpaceBackground() {
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
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Parallax stars */}
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          animate={{
            x: mousePosition.x * (i % 3 + 1) * -20,
            y: mousePosition.y * (i % 3 + 1) * -20,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
          }}
        />
      ))}

      {/* Nebula effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moving gradients */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 70%)",
            "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 70%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
} 