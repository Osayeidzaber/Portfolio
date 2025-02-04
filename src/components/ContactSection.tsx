'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/OsayeedJaber',
    icon: 'https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white',
    hoverColor: 'hover:text-gray-800'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/yourdiscord',
    icon: 'https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=discord&logoColor=white',
    hoverColor: 'hover:text-indigo-500'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/yourusername',
    icon: 'https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white',
    hoverColor: 'hover:text-pink-500'
  }
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 text-white"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let&apos;s create something amazing together
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSubmit} className="relative space-y-6 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
              {/* Input fields */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group"
              >
                <label className="block text-gray-300 mb-2 transition-colors">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           focus:border-white/20 focus:ring-1 focus:ring-white/20 
                           text-gray-200 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group"
              >
                <label className="block text-gray-300 mb-2 transition-colors">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           focus:border-white/20 focus:ring-1 focus:ring-white/20 
                           text-gray-200 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group"
              >
                <label className="block text-gray-300 mb-2 transition-colors">Message</label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
                           focus:border-white/20 focus:ring-1 focus:ring-white/20 
                           text-gray-200 transition-all duration-300"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 rounded-lg bg-white/10 hover:bg-white/20
                         text-white font-semibold relative overflow-hidden transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </motion.div>
                  ) : (
                    <span>Send Message</span>
                  )}
                </motion.div>
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Connect With Me
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="block group"
                >
                  <motion.div
                    className="relative overflow-hidden rounded-md backdrop-blur-sm 
                             bg-white/5 border border-white/10 p-4"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={link.icon}
                          alt={link.name}
                          width={100}
                          height={20}
                          unoptimized
                          className="transform transition-transform duration-300"
                        />
                        <span className="text-gray-400 transition-colors duration-300">
                          {link.name}
                        </span>
                      </div>
                      <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        →
                      </span>
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Contact Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="mt-12 p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-white/5"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <div className="relative z-10">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Quick Response
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  I typically respond within 24 hours. Feel free to reach out!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection; 