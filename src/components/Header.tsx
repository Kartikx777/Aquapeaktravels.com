import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image3 from '../assets/Image3.png';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, setIsDark }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const textColor = isDark ? 'text-white' : 'text-black';
  const hoverColor = isDark ? 'hover:text-cyan-400' : 'hover:text-cyan-600';

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl ${
        isDark ? 'bg-black/20 border-white/10' : 'bg-white/30 border-black/10'
      } border-b transition-colors duration-300`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <img
                src={Image3}
                alt="Logo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${textColor}`}>AquaPeak</h1>
              <p className="text-xs text-cyan-400">Travels</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-4">
            {['home', 'trips', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`${textColor} ${hoverColor} transition-colors`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/admin"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
            >
              Admin
            </motion.a>

            {/* Toggle Theme Button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className={`ml-2 p-2 transition-all duration-300 rounded-full shadow ${
                isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Sun size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Moon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
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
            {['home', 'trips', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`block w-full text-left ${textColor} ${hoverColor} transition-colors py-2`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}

            <a
              href="/admin"
              className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium"
            >
              Admin
            </a>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDark(!isDark)}
              className={`block w-full text-center mt-2 py-2 rounded-full transition-all ${
                isDark
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-black/10 text-black hover:bg-black/20'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div
                    key="sun-mobile"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sun size={18} />
                    Switch to Light Mode
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon-mobile"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Moon size={18} />
                    Switch to Dark Mode
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
