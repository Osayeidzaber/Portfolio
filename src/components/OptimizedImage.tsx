'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { placeholders } from '@/utils/placeholders';
import { errorHandler } from '@/utils/errorHandler';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  type?: keyof typeof placeholders;
  priority?: boolean;
  fallback?: string;
  unoptimized?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  type = "project",
  priority = false,
  fallback,
  unoptimized = false
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);
  const [error, setError] = useState(false);

  const isExternal = src.startsWith('http') || src.startsWith('https');

  useEffect(() => {
    if (!isExternal) {
      fetch(src, { method: 'HEAD' }).catch(() => {
        setError(true);
        errorHandler.handle(
          `Image not found: ${src}`,
          'info',
          'OptimizedImage'
        );
      });
    }
  }, [src, isExternal]);

  const handleError = () => {
    setError(true);
    setIsLoading(false);
    if (fallback) {
      setImageSrc(fallback);
    } else {
      setImageSrc(placeholders[type]);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && !error && (
        <div 
          className="absolute inset-0 backdrop-blur-xl"
          style={{
            backgroundImage: `url(${placeholders[type]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}
      
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        priority={priority}
        unoptimized={unoptimized || isExternal}
      />
    </div>
  );
};

export default OptimizedImage; 