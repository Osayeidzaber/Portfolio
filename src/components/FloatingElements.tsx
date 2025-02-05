'use client';
import { motion, useScroll, useTransform } from 'framer-motion';

const FloatingText = ({ delay = 0, children, className }: { 
  delay: number; 
  children: React.ReactNode;
  className: string;
}) => (
  <motion.div
    className={`absolute font-mono text-purple-500/20 text-sm ${className}`}
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 4,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

export const FloatingElements = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none"
      style={{ opacity }}
    >
      {/* Purple Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      
      {/* Code Snippets */}
      <FloatingText delay={0} className="top-20 left-20">
        {`function init() {`}
      </FloatingText>
      <FloatingText delay={0.5} className="top-32 left-28">
        {`  createMagic();`}
      </FloatingText>
      <FloatingText delay={1} className="top-44 left-20">
        {`}`}
      </FloatingText>

      <FloatingText delay={1.5} className="top-20 right-20">
        {`const passion = "coding";`}
      </FloatingText>
      <FloatingText delay={2} className="top-32 right-28">
        {`while(alive) { code(); }`}
      </FloatingText>

      <FloatingText delay={0.8} className="bottom-40 left-1/4">
        {`// Debug with patience`}
      </FloatingText>
      <FloatingText delay={1.2} className="bottom-28 right-1/4">
        {`/* Code with passion */`}
      </FloatingText>
    </motion.div>
  );
}; 