'use client';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loading from '@/app/loading';
import { logWebsiteStatus } from '@/lib/statusLogging';
import { logErrorToDiscord } from '@/lib/errorLogging';

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 6000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      if (elapsed < duration) {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          // Send online status when loading completes
          logWebsiteStatus('online').catch(error => 
            logErrorToDiscord(error as Error, 'Website Status Logging')
          );
        }, 300);
      }
    };

    const animation = requestAnimationFrame(updateProgress);

    // Add window beforeunload event to log when user leaves
    const handleBeforeUnload = () => {
      logWebsiteStatus('offline').catch(console.error);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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