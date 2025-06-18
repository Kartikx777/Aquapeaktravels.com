import React from 'react';
import { motion } from 'framer-motion';
import Image3 from '../assets/image 3.png';

const Loader: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mx-auto mb-8 border-4 border-cyan-500 border-t-transparent rounded-full flex items-center justify-center relative  "
        >
          <img
            src={Image3} 
            alt="Logo"
            className="w-10 h-10 object-contain rounded-full"
          />
        </motion.div>

        <motion.h2
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-2xl font-bold text-white mb-4"
        >
          Welcome AquaPeak Travels...
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="w-64 h-2 mx-auto bg-gray-800 rounded-full overflow-hidden"
        >
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Loader;
