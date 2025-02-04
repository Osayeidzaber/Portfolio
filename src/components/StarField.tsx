'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    pulse: number;
  }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      starsRef.current = Array.from({ length: 250 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.2 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.1
      }));
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      starsRef.current.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }

        // Pulsing effect
        star.opacity += Math.sin(Date.now() * 0.001 + star.pulse) * 0.02;
        star.opacity = Math.min(Math.max(star.opacity, 0.2), 0.8);

        // Draw star with gradient
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(0.4, `rgba(147, 51, 234, ${star.opacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    resizeCanvas();
    initStars();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initStars();
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-black/80 to-black pointer-events-none" />
      
      {/* Premium ambient effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Main gradients */}
        <motion.div
          className="absolute top-0 left-1/4 w-1/2 h-1/3 bg-purple-900/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-purple-800/10 rounded-full blur-[100px]"
          animate={{
            opacity: [0.1, 0.15, 0.1],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />

        {/* Floating orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute w-32 h-32 bg-purple-500/5 rounded-full blur-xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              duration: 15 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Accent lines */}
        <div className="absolute inset-0">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
              style={{
                top: `${25 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scaleX: [0.95, 1, 0.95],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1
              }}
            />
          ))}
        </div>

        {/* Corner accents */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`corner-${i}`}
            className="absolute w-32 h-32"
            style={{
              top: i < 2 ? 0 : 'auto',
              bottom: i >= 2 ? 0 : 'auto',
              left: i % 2 === 0 ? 0 : 'auto',
              right: i % 2 === 1 ? 0 : 'auto',
            }}
          >
            <motion.div
              className="w-full h-full bg-gradient-radial from-purple-500/5 to-transparent"
              animate={{
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 1.5
              }}
            />
          </motion.div>
        ))}

        {/* Center spotlight */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
          animate={{
            opacity: [0.03, 0.05, 0.03],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent blur-3xl" />
        </motion.div>
      </div>
    </>
  );
};

export default StarField; 