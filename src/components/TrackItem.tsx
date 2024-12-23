import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Song } from '../types/music';
import { formatDuration } from '../utils/formatters';
import { getFavorites, toggleFavorite } from '../utils/storage';

interface Props {
  song: Song;
  index: number;
  isPlaying: boolean;
  onSelect: () => void;
}

export const TrackItem: React.FC<Props> = ({ song, index, isPlaying, onSelect }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.some(f => f.id === song.id));
  }, [song.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = toggleFavorite(song);
    setIsFavorite(newState);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group p-2 rounded-lg flex items-center gap-4 cursor-pointer
        ${isPlaying ? 'bg-white/10' : 'hover:bg-white/5'}`}
      onClick={onSelect}
    >
      <img 
        src={song.coverUrl} 
        alt={song.title}
        className="w-12 h-12 rounded object-cover"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{song.title}</h3>
        <p className="text-sm text-gray-400 truncate">{song.artist}</p>
      </div>
      
      <span className="text-sm text-gray-400 hidden group-hover:block">
        {formatDuration(song.duration)}
      </span>
      
      <button 
        onClick={handleFavoriteClick}
        className={`p-2 opacity-0 group-hover:opacity-100 transition-opacity
          ${isFavorite ? 'text-red-500' : 'text-white hover:text-red-500'}`}
      >
        <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
      </button>
      
      <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </motion.div>
  );
};