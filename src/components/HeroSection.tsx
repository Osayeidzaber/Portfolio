'use client';
import { motion } from 'framer-motion';
import SectionWrapper from './SectionWrapper';

const HeroSection = () => {
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
    </SectionWrapper>
  );
};

export default HeroSection; 