// Common animation configurations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1]
  }
};

export const staggerChildren = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    staggerChildren: 0.1
  }
};

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    rotate: [-1, 1, -1],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const starAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0.7, 1, 0.7],
    opacity: [0.3, 0.7, 0.3]
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.8, 1, 0.8],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 }
};

export const simpleAnimation = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}; 