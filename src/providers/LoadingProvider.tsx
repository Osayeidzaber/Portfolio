'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import { getLoadingProgress } from '@/utils/imagePreloader';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  hasError: boolean;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  progress: 0,
  hasError: false,
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initial delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load all images and track progress
        await getLoadingProgress((progress) => {
          setProgress(progress);
        });

        // Ensure minimum loading time for UX
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load resources:', error);
        setHasError(true);
        // Still hide loading screen after error
        setTimeout(() => setIsLoading(false), 1000);
      }
    };

    initializeApp();
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, hasError }}>
      <LoadingScreen />
      {(!isLoading || hasError) && children}
    </LoadingContext.Provider>
  );
} 