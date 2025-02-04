'use client';
import { motion } from 'framer-motion';

interface ScrollSectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const ScrollSection = ({ id, className = '', children }: ScrollSectionProps) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-24 flex items-center ${className}`}
      style={{ scrollMarginTop: '64px' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-20%" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ScrollSection; 