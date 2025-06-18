import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, MapPin, Clock, Star, Heart } from 'lucide-react';
import GlassCard from './GlassCard';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority with experienced guides and secure accommodations.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Expert Guides',
    description: 'Local experts who know every hidden gem and story behind each destination.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: MapPin,
    title: 'Unique Destinations',
    description: 'Discover off-the-beaten-path locations that create unforgettable memories.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock assistance to ensure your journey is smooth and worry-free.',
    color: 'from-orange-400 to-red-500'
  },
  {
    icon: Star,
    title: 'Premium Experience',
    description: 'Handpicked accommodations and activities for a truly premium travel experience.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every trip is crafted with passion and attention to detail for maximum enjoyment.',
    color: 'from-pink-400 to-rose-500'
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Travel With
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> AquaPeak?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We don't just plan trips, we create life-changing experiences that stay with you forever.
            Here's what makes us different from the rest.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="h-full text-center group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <feature.icon className="text-white" size={32} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <GlassCard className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-bold text-cyan-400 mb-2"
                >
                  500+
                </motion.div>
                <p className="text-gray-300">Happy Travelers</p>
              </div>
              <div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="text-3xl font-bold text-blue-400 mb-2"
                >
                  50+
                </motion.div>
                <p className="text-gray-300">Destinations</p>
              </div>
              <div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="text-3xl font-bold text-purple-400 mb-2"
                >
                  5+
                </motion.div>
                <p className="text-gray-300">Years Experience</p>
              </div>
              <div>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="text-3xl font-bold text-green-400 mb-2"
                >
                  4.9★
                </motion.div>
                <p className="text-gray-300">Average Rating</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;