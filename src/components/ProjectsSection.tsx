'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollSection from './ScrollSection';
import { fetchGitHubRepos } from '@/utils/githubApi';

interface ProjectDetails {
  name: string;
  description: string;
  html_url: string;
  topics: string[];
  language: string;
  homepage: string;
  created_at: string;
  updated_at: string;
  technologies: string[];
  features: string[];
  preview_image?: string;
}

const ProjectCard = ({ project, index }: { project: ProjectDetails; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}
        className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm 
                  border border-white/10 p-6 cursor-pointer"
        whileHover={{ y: -5 }}
      >
        {/* Project header */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-purple-400">
            {project.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, letter => letter.toUpperCase())}
          </h3>
          {project.language && (
            <span className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-300 
                         border border-blue-500/20">
              {project.language}
            </span>
          )}
        </div>

        {/* Project description */}
        <p className="text-gray-300 mb-4">{project.description}</p>

        {/* Technologies used */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies?.map(tech => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 
                       border border-purple-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Preview image or placeholder */}
        {project.preview_image && (
          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
            <motion.img
              src={project.preview_image}
              alt={project.name}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-4">
          <motion.a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 
                     text-purple-400 hover:bg-purple-500/20 transition-all"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View Code</span>
            <motion.span
              animate={{ x: isHovered ? [0, 4, 0] : 0 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
          {project.homepage && (
            <motion.a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 
                       text-blue-400 hover:bg-blue-500/20 transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
              <motion.span
                animate={{ y: isHovered ? [-2, 2, -2] : 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ↗
              </motion.span>
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* Project details modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          >
            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full mx-4 p-6 bg-black/90 rounded-xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              {/* ... Modal content ... */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const LoadingCard = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-6 animate-pulse">
    <div className="h-8 bg-white/10 rounded mb-4 w-3/4"></div>
    <div className="h-4 bg-white/10 rounded mb-2"></div>
    <div className="h-4 bg-white/10 rounded mb-4 w-5/6"></div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 bg-white/10 rounded-full"></div>
      <div className="h-6 w-20 bg-white/10 rounded-full"></div>
    </div>
    <div className="flex gap-4">
      <div className="h-10 w-28 bg-white/10 rounded-lg"></div>
      <div className="h-10 w-28 bg-white/10 rounded-lg"></div>
    </div>
  </div>
);

const ProjectsSection = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const repos = await fetchGitHubRepos();
        setProjects(repos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
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

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400">
            <p className="text-xl mb-2">Oops! Something went wrong</p>
            <p className="text-sm opacity-75">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.name} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </ScrollSection>
  );
};

export default ProjectsSection; 