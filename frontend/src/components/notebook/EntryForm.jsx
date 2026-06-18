

import { useState, useEffect } from 'react';
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../../utils/constants';
import { 
  Calendar, Star, Plus, X, Loader, Upload, Lock, Globe
} from 'lucide-react';

const EntryForm = ({ entry, places, routes, prefillRoute, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    route: '',
    visitDate: new Date().toISOString().split('T')[0],
    mood: 'happy',
    weather: '',
    companions: [],
    highlights: [],
    tips: '',
    rating: 0,
    tags: [],
    images: [],
    isPrivate: true
  });

  const [newCompanion, setNewCompanion] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newTag, setNewTag] = useState('');
  const [imageUpload, setImageUpload] = useState(null);
  const [imageCaption, setImageCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      route: '',
      visitDate: new Date().toISOString().split('T')[0],
      mood: 'happy',
      weather: '',
      companions: [],
      highlights: [],
      tips: '',
      rating: 0,
      tags: [],
      images: [],
      isPrivate: true
    });
    setNewCompanion('');
    setNewHighlight('');
    setNewTag('');
    setImageUpload(null);
    setImageCaption('');
    setErrors({});
  };

  
  useEffect(() => {
    if (entry) {
      
      setFormData({
        title: entry.title || '',
        content: entry.content || '',
        route: entry.route?._id || entry.route || '',
        visitDate: entry.visitDate 
          ? new Date(entry.visitDate).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        mood: entry.mood || 'happy',
        weather: entry.weather || '',
        companions: entry.companions || [],
        highlights: entry.highlights || [],
        tips: entry.tips || '',
        rating: entry.rating || 0,
        tags: entry.tags || [],
        images: entry.images || [],
        isPrivate: entry.isPrivate !== undefined ? entry.isPrivate : true
      });
    } else {
      
      resetForm();
      
      if (prefillRoute) {
        setFormData(prev => ({
          ...prev,
          route: prefillRoute._id,
          title: `Journey through ${prefillRoute.name}`,
          content: `My experience traveling through the ${prefillRoute.name} route...`
        }));
      }
    }
  }, [entry, prefillRoute]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddCompanion = () => {
    if (newCompanion.trim()) {
      setFormData(prev => ({
        ...prev,
        companions: [...prev.companions, newCompanion.trim()]
      }));
      setNewCompanion('');
    }
  };

  const handleRemoveCompanion = (index) => {
    setFormData(prev => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index)
    }));
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim().toLowerCase()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    if (imageUpload) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, {
          url: imageUpload,
          caption: imageCaption,
          uploadedAt: new Date()
        }]
      }));
      setImageUpload(null);
      setImageCaption('');
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Please fill out this field.';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Please fill out this field.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      
      
      const submitData = {
        ...formData,
        isPrivate: formData.isPrivate === false ? false : true
      };
      
      console.log('Form Data isPrivate value:', formData.isPrivate);
      console.log('Submitting with isPrivate:', submitData.isPrivate);
      
      await onSubmit(submitData);
      
      if (!entry) {
        resetForm();
      }
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const selectedMood = MOOD_OPTIONS.find(m => m.value === formData.mood);
  const selectedWeather = WEATHER_OPTIONS.find(w => w.value === formData.weather);

  return (
    <form onSubmit={handleSubmit} className="pb-6 space-y-6">
      {}
      <div className="flex items-center justify-between mb-4 pt-6 px-6">
        <h3 className="text-2xl font-bold text-white">
          {entry ? 'Edit Entry' : 'New Journal Entry'}
        </h3>
        <div className="flex items-center gap-4">
          <span className="text-sm text-white/70">
            {formData.content.length}/5000 characters
          </span>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Entry Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={100}
          placeholder="Give your entry a memorable title..."
          className={`w-full px-4 py-3 bg-white/10 border-2 rounded-lg focus:outline-none text-white placeholder-white/50 ${
            errors.title ? 'border-red-500' : 'border-white/20 focus:border-[#FF8C42]'
          }`}
        />
        {errors.title && (
          <p className="text-xs text-red-400 mt-1">{errors.title}</p>
        )}
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Your Story *
        </label>
        <div className="relative">
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={8}
            maxLength={5000}
            placeholder="Share your travel experience, memories, and thoughts..."
            className={`w-full px-4 py-3 bg-white/10 border-2 rounded-lg focus:outline-none text-white placeholder-white/50 resize-none ${
              errors.content ? 'border-red-500' : 'border-white/20 focus:border-[#FF8C42]'
            }`}
          />
          {errors.content && (
            <div className="absolute bottom-2 right-2 bg-black/90 text-white text-xs px-2 py-1 rounded shadow-lg">
              {errors.content}
            </div>
          )}
        </div>
        <p className="text-xs text-white/50 mt-1">
          {formData.content.length}/5000 characters
        </p>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Route
        </label>
        <select
          name="route"
          value={formData.route}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#021E1B]">Select a route (optional)</option>
          {routes && routes.map(route => (
            <option key={route._id} value={route._id} className="bg-[#021E1B]">
              {route.name}
            </option>
          ))}
        </select>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Visit Date
        </label>
        <div className="relative">
          <input
            type="date"
            name="visitDate"
            value={formData.visitDate}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-10 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white appearance-none"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
        </div>
        {formData.visitDate && (
          <p className="text-xs text-white/50 mt-1">
            {formatDateForDisplay(formData.visitDate)}
          </p>
        )}
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Mood
        </label>
        <select
          name="mood"
          value={formData.mood}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white appearance-none cursor-pointer"
        >
          {MOOD_OPTIONS.map(mood => (
            <option key={mood.value} value={mood.value} className="bg-[#021E1B]">
              {mood.emoji} {mood.label}
            </option>
          ))}
        </select>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Weather
        </label>
        <select
          name="weather"
          value={formData.weather}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white appearance-none cursor-pointer"
        >
          <option value="" className="bg-[#021E1B]">Select weather</option>
          {WEATHER_OPTIONS.map(weather => (
            <option key={weather.value} value={weather.value} className="bg-[#021E1B]">
              {weather.icon} {weather.label}
            </option>
          ))}
        </select>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Overall Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= formData.rating
                    ? 'text-[#FF8C42] fill-[#FF8C42]'
                    : 'text-white/30 fill-none'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Travel Companions
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newCompanion}
            onChange={(e) => setNewCompanion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCompanion();
              }
            }}
            placeholder="Add companion name..."
            className="flex-1 px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
          />
          <button
            type="button"
            onClick={handleAddCompanion}
            className="w-12 h-12 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90 transition flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {formData.companions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.companions.map((companion, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-[#FF8C42]/20 text-[#FF8C42] px-3 py-1 rounded-full border border-[#FF8C42]/30 text-sm"
              >
                {companion}
                <button
                  type="button"
                  onClick={() => handleRemoveCompanion(index)}
                  className="hover:bg-[#FF8C42]/30 rounded-full p-0.5 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Trip Highlights
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newHighlight}
            onChange={(e) => setNewHighlight(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddHighlight();
              }
            }}
            placeholder="Add a memorable moment..."
            className="flex-1 px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
          />
          <button
            type="button"
            onClick={handleAddHighlight}
            className="w-12 h-12 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90 transition flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {formData.highlights.length > 0 && (
          <div className="space-y-2 mt-2">
            {formData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <span className="text-[#FF8C42] mt-0.5">•</span>
                <span className="flex-1 text-sm text-white/90">{highlight}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(index)}
                  className="text-white/50 hover:text-red-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Travel Tips
        </label>
        <textarea
          name="tips"
          value={formData.tips}
          onChange={handleChange}
          rows={3}
          placeholder="Share helpful tips for future travelers..."
          className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 resize-none"
        />
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Tags
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Add tags..."
            className="flex-1 px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="w-12 h-12 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90 transition flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-2 bg-[#0B6E66]/20 text-[#0B6E66] px-3 py-1 rounded-full border border-[#0B6E66]/30 text-sm"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="hover:bg-[#0B6E66]/30 rounded-full p-0.5 transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {}
      <div className="px-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Photos
        </label>
        
        {}
        <div className="mb-4 p-6 bg-white/5 rounded-lg border-2 border-dashed border-white/20">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <Upload className="w-8 h-8 text-white/50 mb-2" />
            <span className="text-sm text-white/70">Click to upload image</span>
            <span className="text-xs text-white/50 mt-1">Max 5MB</span>
          </label>
          
          {imageUpload && (
            <div className="mt-4">
              <img
                src={imageUpload}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
              <input
                type="text"
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Add caption (optional)..."
                className="w-full px-4 py-2 bg-white/10 border-2 border-white/20 rounded-lg focus:border-[#FF8C42] focus:outline-none text-white placeholder-white/50 mb-2"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="w-full px-4 py-2 bg-[#FF8C42] text-white rounded-lg hover:bg-[#FF8C42]/90 transition"
              >
                Add Image
              </button>
            </div>
          )}
        </div>

        {}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={img.url}
                  alt={img.caption || `Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                {img.caption && (
                  <p className="text-xs text-white/70 mt-1 truncate">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {}
      <div className="px-6">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center gap-3">
            {formData.isPrivate ? (
              <Lock className="w-5 h-5 text-white" />
            ) : (
              <Globe className="w-5 h-5 text-[#0B6E66]" />
            )}
            <div>
              <div className="font-semibold text-white">
                {formData.isPrivate ? 'Private Entry' : 'Public Entry'}
              </div>
              <p className="text-xs text-white/60">
                {formData.isPrivate 
                  ? 'Only you can see this entry' 
                  : 'This entry will be visible to all users'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newPrivacyState = !formData.isPrivate;
              console.log('Toggling privacy from', formData.isPrivate, 'to', newPrivacyState);
              setFormData(prev => ({ 
                ...prev, 
                isPrivate: newPrivacyState
              }));
            }}
            className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${
              formData.isPrivate ? 'bg-white/20' : 'bg-[#0B6E66]'
            }`}
            aria-label={formData.isPrivate ? 'Switch to Public' : 'Switch to Private'}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                formData.isPrivate ? 'translate-x-0' : 'translate-x-7'
              }`}
            />
          </button>
        </div>
      </div>

      {}
      <div className="flex gap-3 pt-6 px-6 border-t border-white/20">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 bg-white/10 text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition font-semibold"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-[#FF8C42] text-white rounded-lg font-semibold hover:bg-[#FF8C42]/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>{entry ? 'Update Entry' : 'Create Entry'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default EntryForm;
