import type { ProjectDetails } from '@/types/project';

export const projects: ProjectDetails[] = [
  {
    name: 'Portfolio Website',
    description: 'A modern, cosmic-themed portfolio website built with Next.js and Framer Motion.',
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'Framer-Motion'],
    features: ['Responsive Design', 'Animations', 'Dark Mode'],
    html_url: 'https://github.com/Osayeedjaber/portfolio',
    homepage: 'https://osayeedjaber.netlify.app',
    stats: {
      stars: 0,
      forks: 0
    },
    created_at: new Date().toISOString()
  },
  {
    name: 'Discord Bot',
    description: 'A feature-rich Discord bot with music playback, moderation, and custom commands.',
    technologies: ['TypeScript', 'Discord.js', 'Node.js', 'MongoDB'],
    features: ['Music Playback', 'Moderation', 'Custom Commands'],
    html_url: 'https://github.com/Osayeedjaber/discord-bot',
    stats: {
      stars: 0,
      forks: 0
    },
    created_at: new Date().toISOString()
  },
  {
    name: 'Music Player',
    description: 'A web-based music player with playlist management and visualizations.',
    technologies: ['TypeScript', 'React', 'Web Audio API', 'GSAP'],
    features: ['Playlist Management', 'Audio Visualizations', 'Custom Controls'],
    html_url: 'https://github.com/Osayeedjaber/music-player',
    stats: {
      stars: 0,
      forks: 0
    },
    created_at: new Date().toISOString()
  }
]; 