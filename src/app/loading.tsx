'use client';
import { motion } from 'framer-motion';

const loadingMessages = [
  "Loading Osayeed's brain...",
  "Getting Osayeed's Info From his Braincells...",
  "Fetching data From his Brain..."
];

export default function Loading({ progress }: { progress: number }) {
  const messageIndex = Math.floor((progress / 100) * loadingMessages.length);
  const currentMessage = loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Main loading spinner */}
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <motion.div
            className="absolute inset-0 border-4 border-purple-400/20 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Loading message */}
        <motion.div
          key={currentMessage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-purple-400 text-lg font-medium text-center"
        >
          {currentMessage}
        </motion.div>

        {/* Progress bar */}
        <div className="relative w-64">
          <div className="w-full h-1 bg-purple-500/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
          <motion.span 
            className="absolute -top-6 right-0 text-sm text-purple-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
} 