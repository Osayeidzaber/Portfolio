'use client';
import { motion } from 'framer-motion';

export const LoadingAnimation = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      className="absolute w-24 h-24"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="w-full h-full border-2 border-purple-500/30 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-purple-400 rounded-full animate-spin" />
    </motion.div>
    <motion.div
      className="absolute w-16 h-16"
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
        rotate: [360, 180, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2
      }}
    >
      <div className="w-full h-full border-2 border-purple-500/20 rounded-full" />
      <div className="absolute top-0 left-0 w-full h-full border-t-2 border-purple-300 rounded-full animate-spin" />
    </motion.div>
  </div>
); 