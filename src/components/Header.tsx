import React from 'react';
import { motion } from 'framer-motion';
import { Mountain, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image3 from '../assets/image3.png'; // Adjust the path as necessary


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-black/20 border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10  from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              {/* <Mountain size={24} className="text-white" />  */}
              <img
    src={Image3}
    alt="Logo"
    className="w-full h-full object-cover"
  />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AquaPeak</h1>
              <p className="text-xs text-cyan-400">Travels</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('trips')}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Trips
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-cyan-400 transition-colors"
            >
              Contact
            </button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/admin"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Admin
            </motion.a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 space-y-4 pb-4"
          >
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-white hover:text-cyan-400 transition-colors py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('trips')}
              className="block w-full text-left text-white hover:text-cyan-400 transition-colors py-2"
            >
              Trips
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-white hover:text-cyan-400 transition-colors py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-white hover:text-cyan-400 transition-colors py-2"
            >
              Contact
            </button>
            <a
              href="/admin"
              className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium"
            >
              Admin
            </a>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;