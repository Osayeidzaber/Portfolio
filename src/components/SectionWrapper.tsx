'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeInUp } from '@/utils/animations';

interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const SectionWrapper = ({ children, id, className = "" }: SectionWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: true
  });

  return (
    <section
      id={id}
      ref={ref}
      className={`min-h-screen py-32 flex items-center justify-center ${className}`}
    >
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate={isInView ? "animate" : "initial"}
        className="w-full"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper; 