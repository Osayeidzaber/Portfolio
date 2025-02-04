interface Project {
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  languages: string[];
  topics: string[];
}

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description: 'A modern, cosmic-themed portfolio website built with Next.js and Framer Motion.',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    topics: ['Next.js', 'TailwindCSS', 'Framer-Motion'],
    repoUrl: 'https://github.com/Osayeedjaber/portfolio',
    demoUrl: 'https://osayeedjaber.netlify.app'
  },
  {
    title: 'Discord Bot',
    description: 'A feature-rich Discord bot with music playback, moderation, and custom commands.',
    languages: ['TypeScript', 'JavaScript'],
    topics: ['Discord.js', 'Node.js', 'MongoDB'],
    repoUrl: 'https://github.com/Osayeedjaber/discord-bot'
  },
  {
    title: 'Music Player',
    description: 'A web-based music player with playlist management and visualizations.',
    languages: ['TypeScript', 'JavaScript', 'CSS'],
    topics: ['React', 'Web Audio API', 'GSAP'],
    repoUrl: 'https://github.com/Osayeedjaber/music-player'
  }
]; 