'use client';
import { motion } from 'framer-motion';

const loadingStates = [
  "Waiting for Osayeed's brain to respond...",
  "Collecting data from brain...",
  "Starting brain processes..."
];

const Loading = ({ progress }: { progress: number }) => {
  const stateIndex = Math.floor((progress / 100) * loadingStates.length);
  const currentState = loadingStates[Math.min(stateIndex, loadingStates.length - 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Simple progress circle */}
        <motion.div className="relative w-32 h-32 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#9333ea"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                rotate: "-90deg",
                transformOrigin: "center",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-400">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Simple status text */}
        <motion.p
          key={currentState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-xl text-purple-400"
        >
          {currentState}
        </motion.p>
      </div>
    </div>
  );
};

export default Loading; 