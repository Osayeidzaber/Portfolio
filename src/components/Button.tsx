'use client';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  href
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300";
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900",
    secondary: "bg-white/5 backdrop-blur-sm text-white hover:bg-white/10",
    outline: "border border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href, target: "_blank", rel: "noopener noreferrer" } : { onClick };

  return (
    <Component
      {...props}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-purple-600/20 opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Component>
  );
};

export default Button; 