import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, MessageCircle, Phone } from 'lucide-react';
import Slider from 'react-slick';
import { Trip } from '../types';
import GlassCard from './GlassCard';

interface TripCardProps {
  trip: Trip;
  index: number;
}

const TripCard: React.FC<TripCardProps> = ({ trip, index }) => {
  const [showAllItinerary, setShowAllItinerary] = useState(false);
  const [roomType, setRoomType] = useState<'Quad' | 'Triple' | 'Twin'>('Quad');
  const navigate = useNavigate();

  const basePrice = Number(trip.price);
  const triplePrice = trip.triplePrice ? Number(trip.triplePrice) : basePrice + 500;
  const twinPrice = trip.twinPrice ? Number(trip.twinPrice) : basePrice + 1000;

  const roomPrices: { [key: string]: number } = {
    Quad: basePrice,
    Triple: triplePrice,
    Twin: twinPrice,
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi AquaPeak Travels! I'm interested in booking the "${trip.title}" package.

Trip Details:
- Package: ${trip.title}
- Duration: ${trip.duration}
- Price: ₹${roomPrices[roomType].toLocaleString()} per person (${roomType})
- Itinerary: ${trip.itinerary.slice(0, 3).join(', ')}${trip.itinerary.length > 3
        ? ` and ${trip.itinerary.length - 3} more places`
        : ''}

Please send me more details about:
- Available dates
- Inclusions & exclusions
- Booking process
- Payment options

Thanks! Looking forward to it.`;

    const whatsappUrl = `https://wa.me/919868385777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactUs = () => {
    window.location.href = 'tel:+919868385777';
  };

  const handleMoreInfo = () => {
    navigate(`/trip/${trip.id}`);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const visibleItinerary = showAllItinerary ? trip.itinerary : trip.itinerary.slice(0, 2);
  const remainingCount = trip.itinerary.length - 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      <GlassCard className="overflow-hidden border border-black dark:border-white bg-white dark:bg-black">
        {trip.featured && (
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1"
            >
              <Star size={14} fill="currentColor" />
              Featured
            </motion.div>
          </div>
        )}

        {trip.comingSoon && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold text-lg"
            >
              Coming Soon
            </motion.div>
          </div>
        )}

        <div className="relative overflow-hidden rounded-2xl mb-4">
          <Slider {...sliderSettings}>
            {trip.imageUrls.map((url, idx) => (
              <div key={idx}>
                <img
                  src={url}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            ))}
          </Slider>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white group-hover:text-cyan-400 transition-colors">
                {trip.title}
              </h3>
              <div className="mt-1 text-sm text-gray-700 dark:text-gray-400 flex items-center gap-2">
                <Calendar size={16} />
                <span>{trip.duration}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-cyan-500">
                ₹{roomPrices[roomType].toLocaleString()}
              </div>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as 'Quad' | 'Triple' | 'Twin')}
                className="mt-2 w-full bg-cyan-100 dark:bg-cyan-950/30 text-sm text-cyan-700 dark:text-cyan-300 border border-cyan-400 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              >
                <option value="Quad">Quad Sharing</option>
                <option value="Triple">Triple Sharing</option>
                <option value="Twin">Twin Sharing</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <MapPin size={16} />
              <span className="font-medium">Itinerary</span>
            </div>

            <div className="grid gap-1">
              {visibleItinerary.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  className="text-sm text-gray-700 dark:text-gray-400 flex items-center gap-2"
                >
                  <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                  {item}
                </motion.div>
              ))}
            </div>

            {trip.itinerary.length > 2 && (
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => setShowAllItinerary(!showAllItinerary)}
                  className="text-cyan-600 dark:text-cyan-400 text-sm hover:underline"
                >
                  {showAllItinerary ? 'Show less' : `+${remainingCount} more places`}
                </button>
                <button
                  onClick={handleMoreInfo}
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  More Information →
                </button>
              </div>
            )}
          </div>

          {!trip.comingSoon && (
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsAppBooking}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle size={18} />
                Book Now via WhatsApp
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactUs}
                className="w-full bg-gradient-to-r from-cyan-100/60 to-blue-100/60 dark:from-cyan-500/20 dark:to-blue-500/20 hover:from-cyan-200 hover:to-blue-200 dark:hover:from-cyan-500/30 dark:hover:to-blue-500/30 border border-cyan-400 dark:border-cyan-500/30 hover:border-cyan-500 dark:hover:border-cyan-400/50 text-cyan-700 dark:text-cyan-400 font-medium py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Contact Us
              </motion.button>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default TripCard;
