import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

// Background images
const images = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
];

// Typing phrases
const typingPhrases = [
  'Plan Your Perfect Getaway',
  'Explore Hidden Gems',
  'Travel Beyond Expectations',
];

// Typing Hook
const useAutoType = (phrases: string[], speed = 100, delay = 2000) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [text, charIndex, isDeleting, phraseIndex, phrases, speed, delay]);

  return text;
};

const Hero: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const typedText = useAutoType(typingPhrases);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTrips = () => {
    const element = document.getElementById('trips');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden text-white"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <img
          src={images[currentImageIndex]}
          alt="background"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
            animate={{ x: [0, 100, 0], y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 2 }}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="text-center z-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/30 rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="text-cyan-400" size={20} />
            <span className="text-cyan-400 font-medium">Premium Travel Experience</span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="bg-clip-text text-transparent bg-300% inline-block 
                bg-gradient-to-r dark:from-white dark:via-cyan-400 dark:to-blue-500 
                from-black via-cyan-500 to-blue-500"
            >
              AquaPeak
            </motion.span>
            <br />
            <span className="text-4xl md:text-6xl text-gray-100 dark:text-gray-300">
              Travels
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-cyan-100 dark:text-cyan-200 mb-6 min-h-[2.5rem]">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="space-y-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTrips}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 shadow-xl"
          >
            Explore Destinations
          </motion.button>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <button
              onClick={scrollToTrips}
              className="text-cyan-400 hover:text-cyan-300 transition-colors p-4"
            >
              <ArrowDown size={32} />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
