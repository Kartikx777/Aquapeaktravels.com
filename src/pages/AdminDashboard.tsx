import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { Trip, ContactSubmission, LegalPage } from '../types';
import { LogOut, Plus, Edit, Trash2, Eye, MessageCircle, FileText, Package, BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import GlassCard from '../components/GlassCard';
import TripModal from '../components/admin/TripModal';
import LegalPageModal from '../components/admin/LegalPageModal';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import Analytics from '../components/admin/Analytics';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trips');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [legalPages, setLegalPages] = useState<LegalPage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'trip' | 'legal'>('trip');
  const [editingItem, setEditingItem] = useState<Trip | LegalPage | null>(null);

  useEffect(() => {
    fetchTrips();
    fetchContactSubmissions();
    fetchLegalPages();
  }, []);

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
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contactSubmissions'));
      const submissionsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ContactSubmission[];
      setContactSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    }
  };

  const fetchLegalPages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'legalPages'));
      const pagesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LegalPage[];
      setLegalPages(pagesData);
    } catch (error) {
      console.error('Error fetching legal pages:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleDeleteTrip = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteDoc(doc(db, 'trips', id));
        setTrips(trips.filter(trip => trip.id !== id));
        toast.success('Trip deleted successfully');
      } catch (error) {
        toast.error('Failed to delete trip');
      }
    }
  };

  const openModal = (type: 'trip' | 'legal', item?: Trip | LegalPage) => {
    setModalType(type);
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    fetchTrips();
    fetchLegalPages();
  };

  const tabs = [
    { id: 'trips', label: 'Trips', icon: Package },
    { id: 'submissions', label: 'Messages', icon: MessageCircle },
    { id: 'legal', label: 'Legal Pages', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'trips' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Trip Management</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal('trip')}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-cyan-500/30"
              >
                <Plus size={18} />
                Add New Trip
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map((trip) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard>
                    <div className="relative">
                      <img
                        src={trip.imageUrl}
                        alt={trip.title}
                        className="w-full h-32 object-cover rounded-xl mb-4"
                      />
                      {trip.featured && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Featured
                        </div>
                      )}
                      {trip.comingSoon && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{trip.title}</h3>
                    <p className="text-cyan-400 font-semibold mb-2">₹{trip.price.toLocaleString()}</p>
                    <p className="text-gray-400 text-sm mb-4">{trip.duration}</p>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openModal('trip', trip)}
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleDeleteTrip(trip.id)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'submissions' && (
          <ContactSubmissions
            submissions={contactSubmissions}
            onRefresh={fetchContactSubmissions}
          />
        )}

        {activeTab === 'legal' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Legal Pages</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal('legal')}
                className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-cyan-500/30"
              >
                <Plus size={18} />
                Add New Page
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {legalPages.map((page) => (
                <motion.div
                  key={page.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <GlassCard>
                    <h3 className="text-lg font-bold text-white mb-2">{page.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {page.content.substring(0, 100)}...
                    </p>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => openModal('legal', page)}
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && <Analytics />}
      </div>

      {/* Modals */}
      {isModalOpen && modalType === 'trip' && (
        <TripModal trip={editingItem as Trip} onClose={closeModal} />
      )}
      {isModalOpen && modalType === 'legal' && (
        <LegalPageModal page={editingItem as LegalPage} onClose={closeModal} />
      )}
    </div>
  );
};

export default AdminDashboard;