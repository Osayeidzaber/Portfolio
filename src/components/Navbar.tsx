'use client';
import { motion, useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Handle scroll events for navbar background
  useEffect(() => {
    return scrollY.onChange(latest => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Handle scroll events for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.href.slice(1),
        element: document.getElementById(item.href.slice(1))
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/50 backdrop-blur-md shadow-lg' : ''
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 text-sm transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-400'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                    layoutId="activeSection"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 