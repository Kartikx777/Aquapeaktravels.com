import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Mail,
  Calendar,
  User,
  MessageCircle,
  Trash2,
  Phone,
} from 'lucide-react';
import {
  updateDoc,
  doc,
  deleteDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../config/firebase';
import toast from 'react-hot-toast';
import GlassCard from '../GlassCard';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: any;
  read: boolean;
}

const ContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'contactSubmissions'), orderBy('submittedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ContactSubmission[];
      console.log("Fetched Submissions:", data);

      setSubmissions(data);
    });
    return () => unsubscribe();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'contactSubmissions', id), { read: true });
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update submission');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await deleteDoc(doc(db, 'contactSubmissions', id));
        setSelectedSubmission(null);
        toast.success('Submission deleted');
      } catch (error) {
        toast.error('Failed to delete submission');
      }
    }
  };

  const formatDate = (date: any) => {
    if (!date) return 'Unknown';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Contact Submissions</h2>
        <div className="text-sm text-gray-400">
          {submissions.filter((s) => !s.read).length} unread messages
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submissions List */}
        <div className="space-y-4">
          {submissions.length === 0 ? (
            <GlassCard>
              <div className="text-center py-8">
                <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-400">No messages yet</p>
              </div>
            </GlassCard>
          ) : (
            submissions.map((submission) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`cursor-pointer ${selectedSubmission?.id === submission.id ? 'ring-2 ring-cyan-400' : ''}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <GlassCard
                  className={`transition-all ${!submission.read ? 'border-cyan-400/50 bg-cyan-500/5' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <User className="text-cyan-400" size={16} />
                      <span className="font-medium text-white">{submission.name}</span>
                      {!submission.read && (
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar size={14} />
                      {formatDate(submission.submittedAt)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-gray-300 text-sm">
                    <Mail size={14} />
                    {submission.email}
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-gray-300 text-sm">
                    <Phone size={14} />
                    {submission.number || <span className="text-red-400 italic">No number found</span>}
                  </div>


                  <p className="text-gray-300 text-sm line-clamp-2">{submission.message}</p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${submission.read
                          ? 'bg-gray-600/20 text-gray-400'
                          : 'bg-cyan-500/20 text-cyan-400'
                        }`}
                    >
                      {submission.read ? 'Read' : 'Unread'}
                    </span>
                    <Eye className="text-gray-400" size={16} />
                  </div>
                </GlassCard>
              </motion.div>
            ))
          )}
        </div>

        {/* Submission Detail */}
        <div className="sticky top-8">
          {selectedSubmission ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <GlassCard>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Message Details</h3>
                  <div className="flex gap-2">
                    {!selectedSubmission.read && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => markAsRead(selectedSubmission.id)}
                        className="px-3 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl text-sm transition-all"
                      >
                        Mark as Read
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => deleteSubmission(selectedSubmission.id)}
                      className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl text-sm transition-all"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <p className="text-white">{selectedSubmission.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <p className="text-white">{selectedSubmission.email}</p>
                  </div>

                  {selectedSubmission.number && (
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        Phone Number
                      </label>
                      <p className="text-white">{selectedSubmission.number}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Submitted
                    </label>
                    <p className="text-white">{formatDate(selectedSubmission.submittedAt)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <p className="text-white leading-relaxed whitespace-pre-wrap">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`mailto:${selectedSubmission.email}?subject=Re: Your message to AquaPeak Travels`}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center gap-2"
                  >
                    <Mail size={18} />
                    Reply via Email
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href={`tel:${selectedSubmission.number || selectedSubmission.phone || ''}`}
                    className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
                  >
                    <Phone size={18} />
                    Contact Now
                  </motion.a>

                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard>
              <div className="text-center py-16">
                <MessageCircle className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-gray-400">Select a message to view details</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSubmissions;
