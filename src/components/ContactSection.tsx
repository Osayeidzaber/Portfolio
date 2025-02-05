'use client';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SectionWrapper from './SectionWrapper';
import Image from 'next/image';
import { logErrorToDiscord } from '@/lib/errorLogging';

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
    url: 'https://instagram.com/0.os4yed__',
    icon: 'https://img.shields.io/badge/Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white',
    hoverColor: 'hover:text-pink-500'
  }
];

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

    // Preload contact section images
    const preloadImages: string[] = [
      // Add your contact section images here if needed
      // Example:
      // '/images/contact1.png',
      // '/images/contact2.png',
    ];

    // Use HTMLImageElement instead of next/image
    preloadImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });

    setIsReady(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const error = new Error('Missing EmailJS configuration');
      await logErrorToDiscord(error, 'ContactSection - EmailJS Config');
      setSubmitStatus('error');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus('idle');

      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      await logErrorToDiscord(error as Error, 'ContactSection - Form Submit');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isReady) return null;

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
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative space-y-6 p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg 
                             text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50
                             placeholder-gray-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg 
                             text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50
                             placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 bg-black/40 border border-white/10 rounded-lg 
                           text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50
                           placeholder-gray-500 resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <div className="flex items-center justify-between">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg
                           border border-purple-500/30 text-purple-400 font-medium
                           transition-colors duration-300 disabled:opacity-50
                           disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.p
                    className="text-green-400 text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Message sent successfully!
                  </motion.p>
                )}

                {submitStatus === 'error' && (
                  <motion.p
                    className="text-red-400 text-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    Failed to send message. Please try again.
                  </motion.p>
                )}
              </div>
            </motion.form>
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