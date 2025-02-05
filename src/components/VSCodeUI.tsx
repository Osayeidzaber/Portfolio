'use client';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
// Add custom VS Code-like styles
import styles from './vscode-dark.module.css';
import { fetchGitHubData } from '../lib/github';
import type { GithubRepo } from '../lib/github';
import { logErrorToDiscord } from '@/lib/errorLogging';

const ShootingStar = () => (
  <motion.div
    className="absolute w-0.5 h-0.5 bg-white"
    initial={{ 
      opacity: 0,
      x: Math.random() * 500,
      y: -10,
    }}
    animate={{
      opacity: [0, 1, 0],
      x: `+=${Math.random() * 200 + 100}`,
      y: `+=${Math.random() * 200 + 100}`,
    }}
    transition={{
      duration: Math.random() * 2 + 1,
      repeat: Infinity,
      repeatDelay: Math.random() * 3,
    }}
  />
);

const VSCodeUI = () => {
  const [activeTab, setActiveTab] = useState('about.ts');
  const [githubData, setGithubData] = useState<{
    repos: GithubRepo[];
    stats: { totalRepos: number; totalStars: number };
  }>({
    repos: [],
    stats: { totalRepos: 0, totalStars: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Initialize Prism.js
  const initializePrism = useCallback(() => {
    if (typeof window !== 'undefined') {
      require('prismjs/components/prism-typescript');
      Prism.highlightAll();
    }
  }, []);

  // Load GitHub data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGitHubData('OsayeedJaber');
        if (Array.isArray(data)) {
          setGithubData({
            repos: data as GithubRepo[],
            stats: {
              totalRepos: data.length,
              totalStars: data.reduce((acc: number, repo: GithubRepo) => acc + (repo.stargazers_count || 0), 0)
            }
          });
        }
      } catch (error) {
        await logErrorToDiscord(error as Error, 'VSCodeUI - GitHub Data Load');
      } finally {
        setIsLoading(false);
        // Initialize Prism after data is loaded
        setTimeout(() => {
          initializePrism();
          setIsReady(true);
        }, 100);
      }
    };

    loadData();
  }, [initializePrism]);

  // Re-highlight when tab changes
  useEffect(() => {
    if (!isLoading && isReady) {
      setTimeout(initializePrism, 0);
    }
  }, [activeTab, isLoading, isReady, initializePrism]);

  const aboutCode = `
// About Me
const developer = {
  name: "Osayeed Jaber",
  role: "Full Stack Developer",
  location: "Bangladesh",

  skills: {
    languages: ["TypeScript", "JavaScript", "Python"],
    frontend: ["React", "Next.js", "TailwindCSS"],
    backend: ["Node.js", "Express", "MongoDB"]
  },

  hobbies: ["Guitar", "Music", "Skateboarding", "Cycling"],

  contact: {
    email: "osayeedjaber@gmail.com",
    github: "OsayeedJaber",
    instagram: "@0.os4yed__"
  },

  currentlyWorking: [
    "Portfolio Website",
    "Discord Bot"
  ]
};

// Code with passion, debug with patience
export default developer;
`;

  const projectsCode = `
// Featured Projects
const projects = [
  {
    name: "Portfolio Website",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    description: "Personal portfolio with animated UI and dark theme"
  },
  {
    name: "Todo List",
    tech: ["JavaScript", "CSS"],
    description: "A todolist with Glassmorphism UI"
  },
  {
    name: "Valentine's Day",
    tech: ["TypeScript", "React"],
    description: "Interactive Valentine's day special website"
  }
];

// GitHub Stats
const stats = {
  totalRepos: ${githubData.stats.totalRepos},
  totalStars: ${githubData.stats.totalStars},
  mainLanguages: ["TypeScript", "JavaScript", "React"]
};

export default { projects, stats };
`;

  const getActiveCode = () => {
    return activeTab === 'about.ts' ? aboutCode : projectsCode;
  };

  const Header = () => (
    <div className="text-center mb-12 relative">
      <motion.h2
        className="text-4xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Moon is beautiful, isn&apos;t it?
      </motion.h2>
      <motion.p
        className="text-xl text-purple-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        But my designs are also beautiful...
      </motion.p>
    </div>
  );

  const VSCodeFrame = ({ children }: { children: React.ReactNode }) => (
    <motion.div 
      className="max-w-4xl mx-auto rounded-lg overflow-hidden bg-[#1e1e1e] shadow-2xl border border-black/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title Bar */}
      <div className="bg-[#323233] p-2 flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="text-gray-400 text-sm font-mono">portfolio.ts</div>
        <div className="w-12" />
      </div>

      <div className="flex">
        {/* File Explorer */}
        <div className="w-52 bg-[#252526] border-r border-[#1e1e1e]">
          <div className="p-3 text-gray-400 text-xs uppercase tracking-wide font-semibold">
            Explorer
          </div>
          <div className="px-3 space-y-2">
            <div className="text-gray-300 text-sm mb-2">
              <span className="font-mono opacity-75">Osayeed Jaber</span>
            </div>
            <motion.div
              className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer ${
                activeTab === 'about.ts' ? 'bg-[#37373d]' : 'hover:bg-[#37373d]'
              }`}
              onClick={() => setActiveTab('about.ts')}
              whileHover={{ x: 2 }}
            >
              <span className="text-sm text-gray-300 font-mono opacity-75">
                {`>>`} about me
              </span>
            </motion.div>
            <motion.div
              className={`flex items-center gap-2 px-3 py-1 rounded cursor-pointer ${
                activeTab === 'projects.ts' ? 'bg-[#37373d]' : 'hover:bg-[#37373d]'
              }`}
              onClick={() => setActiveTab('projects.ts')}
              whileHover={{ x: 2 }}
            >
              <span className="text-sm text-gray-300 font-mono opacity-75">
                {`>>`} works
              </span>
            </motion.div>
            <div className="text-gray-300 text-sm px-3 py-1 font-mono opacity-75">
              {`>>`} src
            </div>
            <div className="text-gray-300 text-sm px-6 font-mono opacity-75">
              index.ts
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 font-mono text-sm">
            {children}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#007acc] text-white text-xs px-3 py-1 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1">
            <span className="font-mono opacity-75">{`>>`}</span>
            <span className="opacity-90">main</span>
          </span>
          <span className="opacity-90">TypeScript</span>
        </div>
        <div className="flex items-center space-x-3 opacity-75">
          <span>UTF-8</span>
          <span>LF</span>
          <span>2 spaces</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative">
      <Header />
      <VSCodeFrame>
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-purple-500/20">
              <div className="absolute top-0 left-0 w-full h-full border-t-2 border-purple-500 rounded-full" />
            </div>
          </div>
        ) : (
          <div className={`flex ${!isReady ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
            <div className="text-gray-600 mr-6 select-none text-right w-8">
              {getActiveCode().split('\n').map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
            <div className="flex-1">
              <pre className={`${styles.codeBlock} language-typescript`}>
                <code>{getActiveCode()}</code>
              </pre>
            </div>
          </div>
        )}
      </VSCodeFrame>
    </div>
  );
};

export default VSCodeUI; 