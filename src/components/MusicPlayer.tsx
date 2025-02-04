'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const playlist = [
  {
    title: "Lofi Beats",
    artist: "Ambient",
    url: "/music/lofi-beats.mp3" // Add your music files to public/music/
  },
  {
    title: "Space Ambient",
    artist: "Cosmic",
    url: "/music/space-ambient.mp3"
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMinimized, setIsMinimized] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(playlist[currentTrack].url);
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrack, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 left-8 z-50"
    >
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="backdrop-blur-lg bg-purple-500/10 rounded-xl p-4 border border-purple-500/20
                     shadow-lg mb-4"
          >
            <div className="text-center mb-4">
              <h4 className="text-lg font-semibold text-purple-300">
                {playlist[currentTrack].title}
              </h4>
              <p className="text-sm text-gray-400">{playlist[currentTrack].artist}</p>
            </div>

            <div className="flex items-center justify-center space-x-4 mb-4">
              <button
                onClick={prevTrack}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                ⏮️
              </button>
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center
                         hover:bg-purple-500/30 transition-all text-xl"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={nextTrack}
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                ⏭️
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-400">🔈</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full accent-purple-500"
              />
              <span className="text-gray-400">🔊</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsMinimized(!isMinimized)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/20 
                 flex items-center justify-center backdrop-blur-lg shadow-lg"
      >
        {isMinimized ? '🎵' : '📱'}
      </motion.button>
    </motion.div>
  );
};

export default MusicPlayer; 