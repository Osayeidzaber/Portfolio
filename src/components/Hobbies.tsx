'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const hobbies = [
  { 
    emoji: '🎸', 
    name: 'Guitar', 
    color: 'from-purple-500/20 to-blue-500/20',
    description: "I&apos;ve been learning guitar since I was 11 and I know a few songs. Music has always been a way for me to express myself and unwind after a long day of coding."
  },
  { 
    emoji: '🎵', 
    name: 'Music', 
    color: 'from-blue-500/20 to-cyan-500/20',
    description: "I enjoy a wide variety of music genres, but Cas is my absolute favorite. Music helps me stay focused while coding and inspires my creative process."
  },
  { 
    emoji: '🛹', 
    name: 'Skateboarding', 
    color: 'from-cyan-500/20 to-green-500/20',
    description: "I&apos;ve been skateboarding since I was 12 and can land a few tricks. Check out my Instagram to see my progress and latest tricks!",
    link: 'https://instagram.com/0.os4yed__'
  },
  { 
    emoji: '🚲', 
    name: 'Cycling', 
    color: 'from-green-500/20 to-purple-500/20',
    description: "I&apos;ve been cycling since I was 3, and it&apos;s become a lifelong passion. Whether it&apos;s a quick ride around the neighborhood or a long adventure, cycling helps me stay active and clear my mind."
  }
];

const Hobbies = () => {
  return (
    <div className="relative">
      <motion.div className="space-y-6 relative">
        <motion.h3 
          className="text-2xl font-bold text-purple-400"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          When I&apos;m Not Coding
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.name}
              className={`group relative p-6 rounded-lg bg-gradient-to-br ${hobby.color} 
                         backdrop-blur-sm border border-white/10 text-center 
                         hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.div 
                className="text-4xl mb-3"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {hobby.emoji}
              </motion.div>
              
              <h4 className="text-lg font-semibold text-white mb-2">
                {hobby.name}
              </h4>

              {/* Description overlay on hover */}
              <motion.div 
                className="absolute inset-0 bg-black/80 rounded-lg opacity-0 group-hover:opacity-100 
                          flex items-center justify-center p-4 transition-opacity duration-300"
                initial={false}
              >
                <div className="text-sm text-gray-200">
                  <p>{hobby.description}</p>
                  {hobby.link && (
                    <motion.a
                      href={hobby.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 mt-2"
                      whileHover={{ x: 2 }}
                    >
                      Check it out <span>→</span>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hobbies;