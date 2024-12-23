import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Song } from '../types/music';
import { toggleFavorite } from '../utils/storage';
import { extractColors } from '../utils/colorExtractor';

interface Props {
  song: Song;
  onNext: () => void;
  onPrevious: () => void;
}

export const MusicPlayer: React.FC<Props> = ({ song, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [background, setBackground] = useState('');
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const updateBackground = async () => {
      const gradient = await extractColors(song.coverUrl);
      setBackground(gradient);
    };
    updateBackground();
  }, [song]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (audioRef.current) {
      audioRef.current.volume = value;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 w-full p-4 text-white"
        style={{ background }}
        initial={{ y: 100 }} // Slide in from below
        animate={{ y: 0 }} // Slide to the visible position
        exit={{ y: 100 }} // Slide out below
        transition={{ duration: 0.3 }}
      >
        <audio
          ref={audioRef}
          src={song.audioUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={onNext}
        />

        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-16 h-16 rounded-lg shadow-lg"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-300">{song.artist}</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onPrevious}>
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <button onClick={onNext}>
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>

          <button
            onClick={() => toggleFavorite(song)}
            className={`p-2 ${song.isFavorite ? 'text-red-500' : 'text-white'}`}
          >
            <Heart className="w-6 h-6" fill={song.isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <div className="mt-2">
          <div className="h-1 bg-gray-700 rounded">
            <div
              className="h-full bg-white rounded"
              style={{
                width: `${(currentTime / song.duration) * 100}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
