import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = "", 
  hover = true 
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        backdrop-blur-xl bg-white/10 border border-white/20 
        rounded-3xl p-6 shadow-2xl hover:shadow-cyan-500/20 
        transition-all duration-300 ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;