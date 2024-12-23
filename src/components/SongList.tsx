import React from 'react';
import { MoreHorizontal, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Song } from '../types/music';
import { toggleFavorite } from '../utils/storage';

interface Props {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSong?: Song;
}

export const SongList: React.FC<Props> = ({ songs, onSongSelect, currentSong }) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors
            ${currentSong?.id === song.id ? 'bg-white/20' : ''}`}
          onClick={() => onSongSelect(song)}
        >
          <img 
            src={song.coverUrl} 
            alt={song.title}
            className="w-12 h-12 rounded"
          />
          
          <div className="flex-1">
            <h3 className="font-medium">{song.title}</h3>
            <p className="text-sm text-gray-400">{song.artist}</p>
          </div>
          
          <span className="text-sm text-gray-400">
            {formatDuration(song.duration)}
          </span>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(song);
            }}
            className={`p-2 ${song.isFavorite ? 'text-red-500' : 'text-white'}`}
          >
            <Heart className="w-5 h-5" fill={song.isFavorite ? 'currentColor' : 'none'} />
          </button>
          
          <button className="p-2">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};