import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Trip } from '../types';
import Loader from '../components/Loader';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CustomizeTrip from '../components/CustomizeTrip';
import TripCard from '../components/TripCard';
import WhyChooseUs from '../components/WhyChooseUs';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [isDark, setIsDark] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'trips'));
        const tripsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Trip[];
        setTrips(tripsData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(trip =>
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!trip.price || trip.price <= maxPrice)
  );

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <Hero />

      <section id="trips" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
              Discover Amazing
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"> Destinations</span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-black'}`}>
              From snow-capped mountains to serene valleys, explore handpicked destinations that will take your breath away.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center p-6 rounded-xl shadow-inner mb-12 bg-gray-100 dark:bg-[#1a1a1a]">
            <input
              type="text"
              placeholder="Search by trip title..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full md:w-1/3 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-cyan-500 ${isDark ? 'bg-[#2a2a2a] text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            />
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full md:w-1/3"
            />
            <p className={`${isDark ? 'text-gray-400' : 'text-black'}`}>Max Price: ₹{maxPrice.toLocaleString()}</p>
          </div>

          {filteredTrips.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-black'}`}>No trips match your filters.</p>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-black'}`}>Try adjusting search or price range.</p>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTrips.slice(0, 6).map((trip, index) => (
                  <TripCard key={trip.id} trip={trip} index={index} />
                ))}
              </div>

              {filteredTrips.length > 6 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => navigate('/trips')}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Explore More Trips →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <WhyChooseUs />
      <ContactForm />
      <CustomizeTrip />
      <Footer />
    </div>
  );
};

export default HomePage;