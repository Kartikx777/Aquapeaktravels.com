import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ArrowLeft } from 'lucide-react';

const LegalPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const docRef = doc(db, 'legalPages', id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title || 'Untitled');
          setContent(data.content || '');
          document.title = `${data.title} | AquaPeak`;
        } else {
          setError('This legal page does not exist.');
        }
      } catch (err) {
        console.error('Error fetching legal page:', err);
        setError('Failed to load the legal document.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  const renderPoints = (text: string) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    return (
      <ul className="list-disc pl-6 space-y-2 text-gray-300">
        {lines.map((line, index) => (
          <li key={index} className="text-base leading-relaxed">
            {line.trim().replace(/^[-•]\s*/, '')}
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 text-lg px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-20 max-w-3xl mx-auto animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Home
      </button>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-cyan-400">{title}</h1>

      {/* Content Rendered as Points */}
      <div>{renderPoints(content)}</div>
    </div>
  );
};

export default LegalPage;
