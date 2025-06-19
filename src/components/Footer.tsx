import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { LegalPage } from '../types';
import Image3 from '../assets/Image3.png';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [legalPages, setLegalPages] = useState<LegalPage[]>([]);

  useEffect(() => {
    const fetchLegalPages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'legalPages'));
        const pages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as LegalPage[];
        setLegalPages(pages);
      } catch (error) {
        console.error('Error fetching legal pages:', error);
      }
    };

    fetchLegalPages();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-6 bg-white text-black dark:bg-black dark:from-black dark:to-gray-900/50 dark:text-white border-t border-gray-300 dark:border-white/10">
      {/* Animated background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <img src={Image3} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black dark:text-white">AquaPeak</h3>
                <p className="text-cyan-600 dark:text-cyan-400 text-sm">Travels</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Creating unforgettable travel experiences that connect you with nature's most breathtaking destinations.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/aqpeak/"
                target="_blank"
                className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center text-black dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-400/20 transition-all"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/aquapeak_travels"
                target="_blank"
                className="w-10 h-10 bg-black/10 dark:bg-white/10 rounded-full flex items-center justify-center text-black dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-400/20 transition-all"
              >
                <Facebook size={18} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xl font-bold text-black dark:text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#trips" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Destinations</a></li>
              <li><a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </motion.div>

          {/* Legal Pages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold text-black dark:text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalPages.map((page) => (
                <li key={page.id}>
                  <Link
                    to={`/legal/${page.id}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-xl font-bold text-black dark:text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-600 dark:text-cyan-400" />
                <a href="mailto:aquapeaktravels@gmail.com">aquapeaktravels@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-600 dark:text-cyan-400" />
                <a href="tel:9868385777">+91 9868385777</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-cyan-600 dark:text-cyan-400 mt-1" />
                <span>Delhi</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-gray-300 dark:border-white/10 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} AquaPeak Travels. All rights reserved. Made by{' '}
            <a
              className="text-cyan-600 dark:text-cyan-400 hover:underline"
              href="https://portfoliochandrakantteotia.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chandrakant Teotia
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
