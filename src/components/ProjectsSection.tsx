'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ScrollSection from './ScrollSection';

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  language: string;
  topics: string[];
}

const ProjectCard = ({ project, index }: { project: GitHubRepo; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl 
                 border border-white/10 p-4 sm:p-6 h-full flex flex-col"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-purple-400 mb-2 sm:mb-3">
        {project.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
      </h3>

      <p className="text-gray-300 mb-4 text-sm sm:text-base flex-grow">
        {project.description || 'No description available'}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
        {project.language && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 
                       text-blue-300 border border-blue-500/20 whitespace-nowrap">
            {project.language}
          </span>
        )}
        {project.topics.map(topic => (
          <span
            key={topic}
            className="px-2 py-0.5 text-xs rounded-full bg-purple-500/10 
                     text-purple-300 border border-purple-500/20 whitespace-nowrap"
          >
            {topic}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-3 mt-auto">
        <motion.a
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                   rounded-lg bg-purple-500/10 text-purple-400 
                   hover:bg-purple-500/20 transition-all text-xs sm:text-sm"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>View Code</span>
          <span>→</span>
        </motion.a>
        {project.homepage && (
          <motion.a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
                     rounded-lg bg-blue-500/10 text-blue-400 
                     hover:bg-blue-500/20 transition-all text-xs sm:text-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Demo
            <span>↗</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

const LoadingCard = () => (
  <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-white/10 p-6">
    <div className="h-8 bg-white/10 rounded mb-4 w-3/4 animate-pulse"></div>
    <div className="h-4 bg-white/10 rounded mb-2 animate-pulse"></div>
    <div className="h-4 bg-white/10 rounded mb-4 w-5/6 animate-pulse"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 bg-white/10 rounded-full animate-pulse"></div>
      <div className="h-6 w-20 bg-white/10 rounded-full animate-pulse"></div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Osayeedjaber/repos');
        if (!response.ok) throw new Error('Failed to fetch repos');
        
        const data = await response.json();
        const publicRepos = data
          .filter((repo: GitHubRepo) => !repo.name.includes('.github.io'))
          .slice(0, 6);
        
        setRepos(publicRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <ScrollSection id="projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            [...Array(6)].map((_, i) => <LoadingCard key={i} />)
          ) : (
            repos.map((repo, index) => (
              <ProjectCard key={repo.name} project={repo} index={index} />
            ))
          )}
        </div>
      </div>
    </ScrollSection>
  );
};

export default ProjectsSection; 