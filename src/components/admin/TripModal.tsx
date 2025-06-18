import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Trip } from '../../types';
import toast from 'react-hot-toast';

const IMGBB_API_KEY = '48684a12e5ef9358f090d5d87c4e8d26';

interface TripModalProps {
  trip?: Trip;
  onClose: () => void;
}

const TripModal: React.FC<TripModalProps> = ({ trip, onClose }) => {
  const [formData, setFormData] = useState({
    title: trip?.title || '',
    price: trip?.price || 0,
    triplePrice: trip?.triplePrice || 0,
    twinPrice: trip?.twinPrice || 0,
    duration: trip?.duration || '',
    imageUrls: trip?.imageUrls || [],
    featured: trip?.featured || false,
    comingSoon: trip?.comingSoon || false,
    itinerary: trip?.itinerary || [''],
    location: trip?.location || '',
    cancellationPolicy: trip?.cancellationPolicy || '',
    termsAndConditions: trip?.termsAndConditions || '',
    thingsToCarry: trip?.thingsToCarry || '',
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const uploadToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json?.success && json.data?.url) {
        return json.data.url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      toast.error('Image upload failed');
      return '';
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const url = await uploadToImgBB(file);
      if (url) newUrls.push(url);
    }
    setFormData((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...newUrls],
    }));
    setUploading(false);
    toast.success('Images uploaded successfully!');
  };

  const handleChange = async (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'location' && value.length > 2) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
        const data = await res.json();
        const suggestions = data.map((item: any) => item.display_name);
        setLocationSuggestions(suggestions.slice(0, 5));
      } catch {
        setLocationSuggestions([]);
      }
    } else if (name === 'location') {
      setLocationSuggestions([]);
    }
  };

  const updateItinerary = (index: number, value: string) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = value;
    setFormData((prev) => ({ ...prev, itinerary: newItinerary }));
  };

  const addItinerary = () => {
    setFormData((prev) => ({ ...prev, itinerary: [...prev.itinerary, ''] }));
  };

  const removeItinerary = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formData,
      itinerary: formData.itinerary.filter((item) => item.trim() !== ''),
      updatedAt: new Date(),
    };
    try {
      if (trip?.id) {
        await updateDoc(doc(db, 'trips', trip.id), payload);
        toast.success('Trip updated successfully');
      } else {
        await addDoc(collection(db, 'trips'), { ...payload, createdAt: new Date() });
        toast.success('Trip created successfully');
      }
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Error saving trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <motion.div className="bg-white/10 rounded-xl p-6 w-full max-w-3xl backdrop-blur-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">{trip ? 'Edit Trip' : 'Add New Trip'}</h2>
          <button onClick={onClose}><X className="text-white" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Trip Title" required className="bg-white/10 p-3 rounded-xl text-white" />
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Base Price" required className="bg-white/10 p-3 rounded-xl text-white" />
            <input type="number" name="triplePrice" value={formData.triplePrice} onChange={handleChange} placeholder="Triple Room Price" className="bg-white/10 p-3 rounded-xl text-white" />
            <input type="number" name="twinPrice" value={formData.twinPrice} onChange={handleChange} placeholder="Twin Room Price" className="bg-white/10 p-3 rounded-xl text-white" />
          </div>

          <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration (e.g., 5 Days 4 Nights)" className="bg-white/10 p-3 rounded-xl w-full text-white" required />

          <div className="relative">
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="bg-white/10 p-3 rounded-xl w-full text-white" />
            {locationSuggestions.length > 0 && (
              <ul className="absolute z-10 left-0 right-0 bg-white text-black rounded-md mt-1 shadow-md max-h-40 overflow-y-auto">
                {locationSuggestions.map((suggestion, i) => (
                  <li key={i} className="p-2 hover:bg-blue-100 cursor-pointer" onClick={() => {
                    setFormData((prev) => ({ ...prev, location: suggestion }));
                    setLocationSuggestions([]);
                  }}>{suggestion}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="text-white block mb-1">Upload Images</label>
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
            {uploading && <p className="text-sm text-yellow-400 mt-2">Uploading images...</p>}
          </div>

          {formData.imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.imageUrls.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt={`Trip ${i}`} className="w-full h-32 object-cover rounded-xl" />
                  <button type="button" onClick={() => setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.filter((_, index) => index !== i) }))} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Remove</button>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {formData.itinerary.map((item, i) => (
              <div key={i} className="flex gap-2">
                <input value={item} onChange={(e) => updateItinerary(i, e.target.value)} className="w-full bg-white/10 p-3 rounded-xl text-white" placeholder={`Day ${i + 1}`} />
                {formData.itinerary.length > 1 && (
                  <button type="button" onClick={() => removeItinerary(i)} className="text-red-400"><Minus size={18} /></button>
                )}
              </div>
            ))}
            <button type="button" onClick={addItinerary} className="text-cyan-400 flex items-center gap-1"><Plus size={18} /> Add Day</button>
          </div>

          <textarea name="cancellationPolicy" placeholder="Cancellation Policy" value={formData.cancellationPolicy} onChange={handleChange} className="bg-white/10 p-3 rounded-xl w-full text-white" rows={3} />
          <textarea name="termsAndConditions" placeholder="Terms & Conditions" value={formData.termsAndConditions} onChange={handleChange} className="bg-white/10 p-3 rounded-xl w-full text-white" rows={3} />
          <textarea name="thingsToCarry" placeholder="Things to Carry" value={formData.thingsToCarry} onChange={handleChange} className="bg-white/10 p-3 rounded-xl w-full text-white" rows={3} />

          <div className="flex gap-4">
            <label className="text-white flex items-center">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="mr-2" />
              Featured
            </label>
            <label className="text-white flex items-center">
              <input type="checkbox" name="comingSoon" checked={formData.comingSoon} onChange={handleChange} className="mr-2" />
              Coming Soon
            </label>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl">
            {isSubmitting ? 'Saving...' : trip ? 'Update Trip' : 'Create Trip'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default TripModal;
