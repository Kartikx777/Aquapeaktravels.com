// src/pages/TripsPage.tsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Trip } from '../types';
import TripCard from '../components/TripCard';
import { useNavigate } from 'react-router-dom';

const TripsPage = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'trips'));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Trip[];
        setTrips(data);
      } catch (error) {
        console.error('Failed to fetch trips:', error);
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };

    fetchTrips();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="text-cyan-400 hover:text-cyan-300  mb-4"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl sm:text-4xl font-bold mb-6">All Trips</h1>

      {trips.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No trips available at the moment.
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip, index) => (
            <TripCard key={trip.id} trip={trip} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
