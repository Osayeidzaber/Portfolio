'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = '' }: SectionWrapperProps) => {
  return (
    <section id={id} className={`py-16 sm:py-24 relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper; 