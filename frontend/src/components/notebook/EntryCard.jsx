

import { motion } from 'framer-motion';
import { formatDate, truncateText } from '../../utils/helpers';
import { MOOD_OPTIONS, WEATHER_OPTIONS } from '../../utils/constants';
import {
  MapPin,
  Calendar,
  Star,
  Heart,
  Edit,
  Trash2,
  Users,
  Route as RouteIcon,
  Lock,
  Globe,
  Eye
} from 'lucide-react';

const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/500x320?text=';

const EntryCard = ({ entry, onView, onEdit, onDelete, onToggleFavorite, index = 0 }) => {
  const hasImages = Array.isArray(entry.images) && entry.images.length > 0;
  const mainImage = hasImages ? entry.images[0].url : null;
  const moodData = MOOD_OPTIONS.find(m => m.value === entry.mood);
  const weatherData = WEATHER_OPTIONS.find(w => w.value === entry.weather);

  const renderRating = () => {
    if (!entry.rating || entry.rating <= 0) return null;
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < entry.rating ? 'text-[#FF8C42] fill-[#FF8C42]' : 'text-white/30'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderCompanions = () => {
    if (!entry.companions || entry.companions.length === 0) return null;
    return (
      <div className="flex items-center space-x-2 text-sm">
        <Users className="w-4 h-4 text-white/50" />
        <div className="flex flex-wrap gap-1">
          {entry.companions.slice(0, 3).map((companion, idx) => (
            <span
              key={idx}
              className="text-xs bg-[#FF8C42]/20 text-[#FF8C42] px-2 py-1 rounded-full border border-[#FF8C42]/30"
            >
              {companion}
            </span>
          ))}
          {entry.companions.length > 3 && (
            <span className="text-xs text-white/50">+{entry.companions.length - 3} more</span>
          )}
        </div>
      </div>
    );
  };

  const renderTags = () => {
    if (!entry.tags || entry.tags.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-2 text-xs">
        {entry.tags.slice(0, 3).map((tag, idx) => (
          <span
            key={idx}
            className="bg-[#0B6E66]/20 text-[#0B6E66] px-2 py-1 rounded-full border border-[#0B6E66]/30"
          >
            #{tag}
          </span>
        ))}
      </div>
    );
  };

  const renderHighlights = () => {
    if (!entry.highlights || entry.highlights.length === 0) return null;
    return (
      <div className="p-3 bg-[#FF8C42]/10 rounded-lg border border-[#FF8C42]/20 text-xs text-white/80">
        <p className="font-semibold text-[#FF8C42] mb-1">
          💡 {entry.highlights.length} Highlight{entry.highlights.length > 1 ? 's' : ''}
        </p>
        <p className="line-clamp-1">{entry.highlights[0]}</p>
      </div>
    );
  };

  const renderMoodChip = (className = '') => {
    if (!moodData) return null;
    return (
      <div
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-white text-xs font-semibold backdrop-blur-md border border-white/20 ${className}`}
        style={{ backgroundColor: `${moodData.color}dd` }}
      >
        {moodData.emoji} {moodData.label}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_rgba(255,140,66,0.3)] hover:border-[#FF8C42]/60 transition-all duration-500 overflow-hidden group relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#FF8C42]/0 before:via-[#FF8C42]/5 before:to-[#FF8C42]/0 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500"
    >
      <div className="flex flex-col lg:flex-row items-stretch min-h-[220px] relative z-10">
        {}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
          className="relative lg:w-[220px] w-full h-48 lg:h-[220px] bg-gradient-to-br from-[#0B6E66]/70 via-[#033830]/90 to-[#0B6E66]/50 backdrop-blur-md overflow-hidden flex-shrink-0"
        >
          {}
          {hasImages && mainImage ? (
            <motion.img
              src={mainImage || IMAGE_PLACEHOLDER}
              alt={entry.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = IMAGE_PLACEHOLDER;
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#0B6E66]/70 via-[#033830]/90 to-[#0B6E66]/50"></div>
          )}

          {}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 via-transparent to-[#0B6E66]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {}
          <motion.div 
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 z-10"
          >
            <div className="px-3 py-1.5 bg-black/80 backdrop-blur-lg rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110">
              {entry.isPrivate ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
              <span>{entry.isPrivate ? 'Private' : 'Public'}</span>
            </div>
          </motion.div>

          {}
          {hasImages && entry.images.length > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.35, type: "spring" }}
              className="absolute top-4 right-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-lg text-white text-xs rounded-full border border-white/40 shadow-xl flex items-center gap-1.5 z-10"
            >
              <span role="img" aria-label="photos">📷</span>
              <span>{entry.images.length}</span>
            </motion.div>
          )}

          {}
          {onToggleFavorite && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(entry._id);
              }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.85 }}
              className="absolute bottom-4 left-4 p-3 bg-white/25 backdrop-blur-lg rounded-full hover:bg-white/35 transition-all duration-300 border border-white/40 shadow-xl hover:shadow-2xl z-10"
            >
              <motion.div
                animate={{ scale: entry.isFavorite ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className={`w-5 h-5 ${entry.isFavorite ? 'text-red-400 fill-red-400' : 'text-white'}`} />
              </motion.div>
            </motion.button>
          )}

          {}
          {moodData && hasImages && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: index * 0.1 + 0.45, type: "spring" }}
              className={`absolute bottom-4 ${onToggleFavorite ? 'right-4' : 'right-4'} z-10`}
            >
              {renderMoodChip()}
            </motion.div>
          )}
        </motion.div>

        {}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.25, duration: 0.4 }}
          onClick={() => onView(entry)} 
          className="flex-1 flex flex-col gap-4 px-7 py-6 cursor-pointer"
        >
          <div className="space-y-3 flex-1">
            {}
            <motion.h3 
              whileHover={{ x: 5 }}
              className="text-xl md:text-2xl font-bold text-white leading-tight group-hover:text-[#FF8C42] transition-colors duration-300"
            >
              {entry.title}
            </motion.h3>

            {}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.35 }}
              className="flex flex-wrap items-center gap-4 text-sm text-white/80"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-white/60" />
                <span>{formatDate(entry.visitDate || entry.createdAt, 'long')}</span>
              </motion.div>
              {entry.route && (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <RouteIcon className="w-4 h-4 text-[#0B6E66]" />
                  <span>Route: {entry.route.name}</span>
                </motion.div>
              )}
              {entry.place && (
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#FF8C42]" />
                  <span>{entry.place.name}{entry.place.location?.city ? `, ${entry.place.location.city}` : ''}</span>
                </motion.div>
              )}
            </motion.div>

            {}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="text-sm text-white/90 leading-relaxed line-clamp-2"
            >
              {truncateText(entry.content, 120)}
            </motion.p>

            {}
            {moodData && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.45, type: "spring" }}
                className="pt-1"
              >
                {renderMoodChip('w-max hover:scale-110 transition-transform duration-300')}
              </motion.div>
            )}
          </div>
        </motion.div>

        {}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
          className="lg:w-[150px] border-t lg:border-t-0 lg:border-l border-white/30 bg-white/10 lg:bg-transparent px-5 py-6 flex flex-col gap-2.5 justify-center items-stretch"
        >
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onView(entry);
            }}
            whileHover={{ scale: 1.08, y: -3, boxShadow: "0 10px 25px rgba(255, 140, 66, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF8C42] to-[#FF9F5F] text-white font-semibold shadow-xl hover:shadow-2xl transition-all text-sm relative overflow-hidden group/btn"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FF9F5F] to-[#FF8C42] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
            <Eye className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Read Story</span>
          </motion.button>

          {onEdit && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(entry);
              }}
              whileHover={{ scale: 1.08, y: -3, borderColor: "#FF8C42", backgroundColor: "rgba(255, 140, 66, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-white/40 text-white hover:text-[#FF8C42] transition-all text-sm font-medium backdrop-blur-sm"
            >
              <Edit className="w-4 h-4" />
              Edit
            </motion.button>
          )}

          {onDelete && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(entry._id);
              }}
              whileHover={{ scale: 1.08, y: -3, borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.15)" }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-white/40 text-white hover:text-red-400 transition-all text-sm font-medium backdrop-blur-sm"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </motion.button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EntryCard;
