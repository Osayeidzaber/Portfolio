'use client';
import { motion } from 'framer-motion';
import { floatingAnimation } from '@/utils/animations';

const techStack = {
  Languages: [
    { name: 'JavaScript', icon: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { name: 'Python', icon: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white', url: 'https://www.python.org/' },
    { name: 'TypeScript', icon: 'https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white', url: 'https://www.typescriptlang.org/' },
    { name: 'HTML5', icon: 'https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
    { name: 'CSS3', icon: 'https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS' }
  ],
  'Frameworks/Libraries': [
    { name: 'React', icon: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', url: 'https://reactjs.org/' },
    { name: 'Next.js', icon: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white', url: 'https://nextjs.org/' },
    { name: 'Node.js', icon: 'https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white', url: 'https://nodejs.org/' },
    { name: 'Express', icon: 'https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white', url: 'https://expressjs.com/' },
    { name: 'Discord.js', icon: 'https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white', url: 'https://discord.js.org/' }
  ],
  Tools: [
    { name: 'Git', icon: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white', url: 'https://git-scm.com/' },
    { name: 'MongoDB', icon: 'https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white', url: 'https://www.mongodb.com/' },
    { name: 'Docker', icon: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white', url: 'https://www.docker.com/' },
    { name: 'VS Code', icon: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white', url: 'https://code.visualstudio.com/' }
  ]
};

const TechStack = () => {
  return (
    <motion.div 
      className="space-y-12 relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-purple-400 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tech Stack
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(techStack).map(([category, items], categoryIndex) => (
          <motion.div
            key={category}
            className="space-y-4 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
          >
            <motion.h3 
              className="text-xl font-semibold text-blue-400 text-center mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              {category}
            </motion.h3>

            <div className="space-y-3">
              {items.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  transition={{ 
                    duration: 0.3,
                    delay: (categoryIndex * items.length + index) * 0.1 
                  }}
                >
                  <img 
                    src={item.icon} 
                    alt={item.name}
                    className="w-full h-10 object-contain hover:shadow-lg hover:shadow-purple-500/20" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Background decorations */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
    </motion.div>
  );
};

export default TechStack; 