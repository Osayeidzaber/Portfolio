'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/app/loading';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (elapsed < duration) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        // Add a small delay before removing loading screen
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    const animation = requestAnimationFrame(updateProgress);

    // Preload critical assets
    const preloadAssets = async () => {
      try {
        // Add your critical images/assets here
        const criticalImages = [
          '/apple-touch-icon.png',
          '/favicon-32x32.png',
          // Add other critical images
        ];

        await Promise.all(
          criticalImages.map(src => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
      } catch (error) {
        console.error('Failed to preload assets:', error);
      }
    };

    preloadAssets();
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading key="loading" progress={progress} />
      ) : (
        children
      )}
    </AnimatePresence>
  );
} 