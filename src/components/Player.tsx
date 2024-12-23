import React, { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Song } from '../types/music';
import { formatDuration } from '../utils/formatters';

interface Props {
  song: Song;
  onNext: () => void;
  onPrevious: () => void;
  onExit?: () => void;
}

export const Player: React.FC<Props> = ({ song, onNext, onPrevious }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <motion.img
              src={song.coverUrl}
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="min-w-0">
              <h3 className="font-medium truncate">{song.title}</h3>
              <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onPrevious}
              >
                <SkipBack className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
              >
                {isPlaying ? <Pause /> : <Play />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onNext}
              >
                <SkipForward className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="w-full max-w-md flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatDuration(currentTime)}
              </span>
              <div className="flex-1 h-1 bg-gray-700 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(currentTime / song.duration) * 100}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentTime / song.duration) * 100}%` }}
                  transition={{ ease: 'easeOut', duration: 0.5 }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <button>
              <MoreHorizontal className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={song.audioUrl}
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onEnded={onNext}
      />
    </div>
  );
};
