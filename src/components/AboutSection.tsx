'use client';
import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';
import TechStack from './TechStack';
import Hobbies from './Hobbies';
import GitHubStats from './GitHubStats';

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
              I&apos;m a software engineer passionate about creating elegant solutions to
              complex problems. When I&apos;m not crafting clean code or designing intuitive UIs, you&apos;ll find me exploring new technologies, 
              creating Discord bots, or turning coffee into solutions. I believe in writing code that not only works 
              but tells a story - just like how each star in the night sky has its own tale to tell. 🌟
            </p>
          </div>

          {/* Replace the GitHub Stats section with the new component */}
          <GitHubStats />

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