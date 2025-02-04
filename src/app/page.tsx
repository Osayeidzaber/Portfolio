'use client';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import CustomCursor from '@/components/CustomCursor';
import { LoadingProvider } from '@/components/LoadingProvider';
import { ErrorBoundary } from 'react-error-boundary';

// Dynamically import heavier components
const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const ProjectsSection = dynamic(() => import('@/components/ProjectsSection'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="h-screen" />,
  ssr: false
});

const VSCodeUI = dynamic(() => import('@/components/VSCodeUI'), {
  loading: () => <div className="h-96" />,
  ssr: false
});

// Minimal StarField component
const StarField = () => (
  <div className="fixed inset-0 pointer-events-none">
    {/* Reduced number of stars for better performance */}
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.3,
        }}
      />
    ))}
  </div>
);

const SectionWithErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary>
    {children}
  </ErrorBoundary>
);

export default function Home() {
  return (
    <LoadingProvider>
      <motion.main
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <CustomCursor />
        <StarField />
        <Navbar />
        
        <div className="relative z-10">
          <SectionWithErrorBoundary>
            <HeroSection />
          </SectionWithErrorBoundary>
          
          <SectionWithErrorBoundary>
            <AboutSection />
          </SectionWithErrorBoundary>
          
          <SectionWithErrorBoundary>
            <VSCodeUI />
          </SectionWithErrorBoundary>
          
          <SectionWithErrorBoundary>
            <ProjectsSection />
          </SectionWithErrorBoundary>
          
          <SectionWithErrorBoundary>
            <ContactSection />
          </SectionWithErrorBoundary>
        </div>
        
        <footer className="py-8 text-center space-y-4">
          <div className="text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Osayeed Jaber. All rights reserved.</p>
            <p className="mt-2 opacity-75">
              Made with ❤️, a lot of ☕, and occasional moments of 
              <span className="group relative inline-block mx-1">
                rage quitting
                <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 p-2 bg-black/80 rounded text-xs whitespace-nowrap">
                  *throws keyboard*
                </span>
              </span>
              🤬
            </p>
            <p className="mt-1 text-xs opacity-60">
              No keyboards were harmed in the making of this portfolio
              <span className="text-xs opacity-50">*</span>
            </p>
            <p className="mt-4 text-xs text-purple-400/60">
              Powered by caffeine, anime openings, and Stack Overflow 🚀
            </p>
          </div>
          
          <motion.div 
            className="max-w-2xl mx-auto px-4 text-xs text-gray-500 border-t border-gray-800 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2">
              NOTICE: This portfolio and all its contents are protected by copyright law.
            </p>
            <p>
              All rights reserved. No part of this website, including but not limited to its code, 
              design, text, graphics, or animations may be reproduced, distributed, or transmitted 
              in any form or by any means without the prior written permission of Osayeed Jaber.
            </p>
            <p className="mt-2 text-[10px] opacity-50">
              * Okay, maybe one keyboard was slightly damaged... but it had it coming
            </p>
          </motion.div>
        </footer>
      </motion.main>
    </LoadingProvider>
  );
} 