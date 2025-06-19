import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare } from 'lucide-react';

const images = [
  'https://media.istockphoto.com/id/1453838542/photo/last-light-on-mount-sneffels.jpg?s=612x612&w=0&k=20&c=IBOZYpAjhV5hFEL8yKYmY2ZCyCaGEOrXR5VZI13NMRI=',
  'https://media.istockphoto.com/id/1443409611/photo/man-on-stone-on-the-hill-and-beautiful-mountains-in-haze-at-colorful-sunset-in-autumn.jpg?s=612x612&w=0&k=20&c=dcyDpPqlhCWMZYgqgHSrJZdoaH_ARrlgkpUcARp1_GU=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz8RlFPHHJ_HHE9H4FeKVi8GwVPhPTkzmrWA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU2mSBdiPEe2sO-KBL_99z7tOGEwQERVdrrw&s',
  'https://www.celebritycruises.com/blog/content/uploads/2022/01/most-beautiful-mountains-in-the-world-kirkjufell-iceland-1024x580.jpg',
  'https://t3.ftcdn.net/jpg/03/17/76/14/360_F_317761488_lUO7Enkcskj6wppf9Ycf5zck5Jm2Y2b9.jpg',
];

const CustomizeTrip: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const whatsappLink = `https://wa.me/919868385777?text=${encodeURIComponent(
    'Hi! I am interested in customizing a trip with AquaPeak Travels. Please provide more details.'
  )}`;

  return (
    <section
      id="customize"
      className="bg-gradient-to-b from-white to-cyan-50 dark:from-black dark:to-gray-900 py-20 px-4 sm:px-6 lg:px-12"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
          Customize Your Trip
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Your Dates <span className="text-cyan-500 font-bold">+</span> Your Group{' '}
          <span className="text-cyan-500 font-bold">+</span> Your Budget
        </p>
      </motion.div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden rounded-2xl shadow-lg group aspect-[4/3] md:aspect-[3/2] cursor-pointer"
            onClick={() => setSelectedImage(src)}
          >
            <motion.img
              src={src}
              alt={`Travel ${idx}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 rounded-2xl"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-xl w-full relative shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
              >
                <X size={24} />
              </button>

              {/* Image */}
              <img
                src={selectedImage}
                alt="Selected Travel"
                className="rounded-md w-full h-64 object-cover mb-4"
              />

              {/* Buttons */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Plan This Trip?
                </h3>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  {/* WhatsApp Button */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold shadow-md transition-all"
                  >
                    <MessageSquare size={18} /> Book Now via WhatsApp
                  </a>

                  {/* Contact Us Button */}
                  <a
                    href="tel:9868385777"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-2xl border border-cyan-500 bg-gradient-to-r from-white to-cyan-50 text-cyan-700 hover:bg-cyan-100 font-semibold shadow-sm transition-all"
                  >
                    <Phone size={18} /> Contact Us
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CustomizeTrip;
