'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const codeContent = [
  {
    file: 'AboutMe.tsx',
    code: `import { Developer } from './types';

const AboutMe: Developer = {
  name: 'Osayeed Jaber',
  role: 'Full Stack Developer',
  location: 'Bangladesh 🇧🇩',
  interests: [
    'Web Development',
    'UI/UX Design',
    'Open Source',
    'Space Exploration 🚀'
  ],

  skills: {
    frontend: ['React', 'Next.js', 'TypeScript'],
    backend: ['Node.js', 'Express', 'MongoDB'],
    other: ['Git', 'Docker', 'AWS']
  },
  contact: {
    email: 'Osayeedjaber18@gmail.com',
    github: 'Osayeedjaber',
    instagram: '@0.os4yed__'
  }
};

export default AboutMe;`
  },
  {
    file: 'Projects.tsx',
    code: `import { Project } from './types';

const Projects: Project[] = [
  {
    name: 'Portfolio',
    description: 'My personal portfolio with space theme',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/Osayeedjaber'
  },
  // More projects...
];

export default Projects;`
  }
];

const VSCodeUI = () => {
  const [selectedFile, setSelectedFile] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [lineNumbers, setLineNumbers] = useState<string[]>([]);

  useEffect(() => {
    setTypedText('');
    let currentText = '';
    const codeLines = codeContent[selectedFile].code.split('\n');
    setLineNumbers(codeLines.map((_, i) => (i + 1).toString().padStart(2, ' ')));

    const typeText = async () => {
      for (let i = 0; i < codeContent[selectedFile].code.length; i++) {
        currentText += codeContent[selectedFile].code[i];
        setTypedText(currentText);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
    };

    typeText();
  }, [selectedFile]);

  return (
    <motion.div 
      className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl my-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* VSCode window frame */}
      <div className="bg-[#1e1e1e] rounded-t-lg">
        {/* Title bar */}
        <div className="flex items-center px-4 py-2 bg-[#323233] border-b border-[#424242]">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="text-white/60 text-sm">
            {codeContent[selectedFile].file} - Visual Studio Code
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-48 bg-[#252526] p-4 border-r border-[#424242]">
            <div className="text-sm text-gray-400 mb-2">EXPLORER</div>
            <div className="space-y-1">
              {codeContent.map((file, index) => (
                <motion.button
                  key={file.file}
                  className={`w-full text-left px-2 py-1 rounded text-sm ${
                    selectedFile === index 
                      ? 'bg-[#37373d] text-white' 
                      : 'text-gray-400 hover:bg-[#2a2d2e]'
                  }`}
                  onClick={() => setSelectedFile(index)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {file.file}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Editor content */}
          <div className="flex-1 p-4 font-mono text-sm overflow-x-auto">
            <div className="flex">
              {/* Line numbers */}
              <div className="text-gray-600 pr-4 select-none text-right">
                {lineNumbers.map((num, i) => (
                  <div key={i}>{num}</div>
                ))}
              </div>
              {/* Code content */}
              <pre className="text-gray-300">
                <code>{typedText}</code>
                <motion.span
                  className="inline-block w-2 h-4 bg-white/50 ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Terminal */}
      <div className="bg-[#1e1e1e] border-t border-[#424242] p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="font-mono text-sm"
        >
          <span className="text-[#3fb950]">➜</span>
          <span className="text-[#9cdcfe]"> ~/portfolio</span>
          <span className="text-white"> npm run dev</span>
          <div className="mt-2 text-[#3fb950]">
            ready - started server on 0.0.0.0:3000
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VSCodeUI; 