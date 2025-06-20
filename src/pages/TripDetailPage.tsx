import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import {
  Calendar,
  MapPin,
  PhoneCall,
  Send,
  ClipboardList,
  FileText,
  Package,
} from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Header from '../components/Header';

interface Trip {
  id: string;
  title: string;
  duration: string;
  location: string;
  imageUrls: string[];
  itinerary: string[];
  price: number;
  triplePrice?: number;
  twinPrice?: number;
  cancellationPolicy?: string;
  termsAndConditions?: string;
  thingsToCarry?: string;
}

const TripDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'cancellation' | 'terms' | 'carry'>('cancellation');
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const docRef = doc(db, 'trips', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTrip({ id: docSnap.id, ...docSnap.data() } as Trip);
        } else {
          setTrip(null);
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const whatsappMessage = `Hey! I'm interested in the trip: *${trip?.title}*\n\nLocation: ${trip?.location}\nDuration: ${trip?.duration}\n\nSharing Prices:\n- Quad: ₹${trip?.price}\n- Triple: ₹${trip?.triplePrice || (trip?.price || 0) + 500}\n- Twin: ₹${trip?.twinPrice || (trip?.price || 0) + 1000}`;

  const renderBulletedList = (text?: string) => {
    if (!text) return null;
    const items = text.split('\n').filter(Boolean);
    return (
      <ul className="list-disc list-inside space-y-1">
        {items.map((line, i) => (
          <li key={i} className={isDark ? 'text-gray-300' : 'text-gray-700'}>
            {line}
          </li>
        ))}
      </ul>
    );
  };

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white text-xl">
        <p>Trip not found!</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
      <Header isDark={isDark} setIsDark={setIsDark} />

      <div className="pt-20 px-4 md:px-16">
        <button
          onClick={() => navigate('/')}
          className={`${
            isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-cyan-600 hover:text-cyan-500'
          } text-sm md:text-base font-medium mb-4`}
        >
          ← Back to Home
        </button>

        <Slider {...sliderSettings}>
          {trip.imageUrls.map((url, idx) => (
            <div key={idx}>
              <img
                src={url}
                alt={`Slide ${idx + 1}`}
                className="w-full h-72 md:h-[400px] object-cover rounded-xl"
              />
            </div>
          ))}
        </Slider>

        <div className="mt-8 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-cyan-400 mb-2">{trip.title}</h1>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 flex items-center gap-2`}>
              <MapPin size={18} />
              <span>{trip.location || 'Multiple Locations'}</span>
            </div>
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 flex items-center gap-2`}>
              <Calendar size={18} />
              <span>{trip.duration}</span>
            </div>

            <h2 className="text-2xl font-semibold mb-3 text-cyan-300">Itinerary</h2>
            <ul className={`${isDark ? 'text-gray-300' : 'text-gray-700'} space-y-2`}>
              {trip.itinerary.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-cyan-300">Pricing:</h2>
              <ul className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mt-2 space-y-1`}>
                <li>Quad Sharing: ₹{trip.price.toLocaleString()}</li>
                <li>
                  Triple Sharing: ₹
                  {(trip.triplePrice || trip.price + 500).toLocaleString()}
                </li>
                <li>
                  Twin Sharing: ₹
                  {(trip.twinPrice || trip.price + 1000).toLocaleString()}
                </li>
              </ul>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={`https://wa.me/919868385777?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-md text-white transition"
              >
                <Send size={18} /> Book Now via WhatsApp
              </a>

              <a
                href="tel:+919868385777"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-md text-white transition"
              >
                <PhoneCall size={18} /> Contact Us
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:max-w-[600px] mt-10 p-4 rounded-xl flex flex-col justify-between">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              {(['cancellation', 'terms', 'carry'] as const).map((tab) => {
                const isActive = activeTab === tab;
                const label =
                  tab === 'cancellation'
                    ? 'Cancellation Policy'
                    : tab === 'terms'
                    ? 'Terms & Conditions'
                    : 'Things to Carry';
                const Icon =
                  tab === 'cancellation'
                    ? ClipboardList
                    : tab === 'terms'
                    ? FileText
                    : Package;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : isDark
                        ? 'bg-neutral-800 text-white'
                        : 'bg-neutral-200 text-black'
                    }`}
                  >
                    <Icon size={18} /> {label}
                  </button>
                );
              })}
            </div>

            <div className={`${isDark ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-line h-full overflow-auto`}>
              {activeTab === 'cancellation' && renderBulletedList(trip.cancellationPolicy)}
              {activeTab === 'terms' && renderBulletedList(trip.termsAndConditions)}
              {activeTab === 'carry' && renderBulletedList(trip.thingsToCarry)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
