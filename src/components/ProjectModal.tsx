'use client';
import { motion } from 'framer-motion';
import type { ProjectDetails } from '@/types/project';

interface ProjectModalProps {
  project: ProjectDetails;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-4xl w-full bg-black/90 rounded-xl border border-white/10 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Preview Image Banner */}
        {project.preview_image && (
          <div className="relative h-64 w-full">
            <motion.img
              src={project.preview_image}
              alt={project.name}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
          </div>
        )}

        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <motion.h3 
              className="text-3xl font-bold text-purple-400"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              {project.name.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, letter => letter.toUpperCase())}
            </motion.h3>
            <motion.button
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              ✕
            </motion.button>
          </div>

          {/* Project Stats */}
          <motion.div 
            className="flex gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-yellow-400">
              <span>⭐</span>
              <span>{project.stats.stars}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <span>🔄</span>
              <span>{project.stats.forks}</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span>📅</span>
              <span>{new Date(project.created_at).toLocaleDateString()}</span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            className="text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {project.description}
          </motion.p>

          {/* Technologies */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-semibold text-blue-400 mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 
                             border border-blue-500/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Features */}
            {project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h4 className="text-xl font-semibold text-purple-400 mb-3">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {project.features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 
                               border border-purple-500/20"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-500/10 
                       text-purple-400 hover:bg-purple-500/20 transition-all"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Source</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            {project.homepage && (
              <motion.a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 
                         text-blue-400 hover:bg-blue-500/20 transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
                <motion.span
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ↗
                </motion.span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}; 