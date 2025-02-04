'use client';
import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import TechStack from './TechStack';
import Hobbies from './Hobbies';

const AboutSection = () => {
  return (
    <ScrollSection id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          {/* About Me */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hey there! I'm a passionate full-stack developer who started coding at 10 and never looked back. 
              When I'm not crafting clean code or designing intuitive UIs, you'll find me exploring new technologies, 
              creating Discord bots, or turning coffee into solutions. I believe in writing code that not only works 
              but tells a story - just like how each star in the night sky has its own tale to tell. 🌟
            </p>
          </div>

          {/* GitHub Stats */}
          <motion.div
            className="flex justify-center space-x-4 overflow-x-auto py-4"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src="https://github-readme-stats.vercel.app/api?username=Osayeedjaber&show_icons=true&theme=tokyonight"
              alt="GitHub Stats"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Osayeedjaber&theme=tokyonight"
              alt="GitHub Streak"
              className="rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Tech Stack */}
          <TechStack />

          {/* Hobbies */}
          <Hobbies />
        </motion.div>
      </div>
    </ScrollSection>
  );
};

export default AboutSection; 