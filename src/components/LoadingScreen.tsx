'use client';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 mb-4 mx-auto"
        >
          <div className="w-full h-full rounded-full border-4 border-t-purple-500 border-r-transparent border-b-blue-500 border-l-transparent animate-spin" />
        </motion.div>
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-gray-400"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 