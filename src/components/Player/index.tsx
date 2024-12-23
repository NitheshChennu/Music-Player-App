import React, { useEffect, useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Song } from '../../types/music';
import { useAudio } from '../../hooks/useAudio';
import { validateAudioUrl } from '../../utils/audio';
import { Controls } from './Controls';
import { VolumeControl } from './VolumeControl';
import { OptionsMenu } from './OptionsMenu';
import { formatDuration } from '../../utils/formatters';

interface Props {
  song: Song;
  onNext: () => void;
  onPrevious: () => void;
  onExit: () => void;
}

export const Player: React.FC<Props> = ({ song, onNext, onPrevious, onExit }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const {
    audioRef,
    isPlaying,
    currentTime,
    volume,
    setVolume,
    togglePlay,
    handleTimeUpdate,
    stop
  } = useAudio(song.audioUrl);

  useEffect(() => {
    const validateAndUpdateAudio = async () => {
      const validUrl = await validateAudioUrl(song.audioUrl);
      if (audioRef.current) {
        audioRef.current.src = validUrl;
      }
    };
    validateAndUpdateAudio();
  }, [song.audioUrl]);

  const handleExit = () => {
    stop();
    onExit();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent backdrop-blur-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <img 
              src={song.coverUrl} 
              alt={song.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <h3 className="font-medium truncate">{song.title}</h3>
              <p className="text-sm text-gray-400 truncate">{song.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-1">
            <Controls
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onNext={onNext}
              onPrevious={onPrevious}
            />

            <div className="w-full max-w-md flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {formatDuration(currentTime)}
              </span>
              <div className="flex-1 h-1 bg-gray-700 rounded-full">
                <div 
                  className="h-full bg-white rounded-full"
                  style={{ width: `${(currentTime / song.duration) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400">
                {formatDuration(song.duration)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 flex-1 justify-end">
            <VolumeControl volume={volume} onVolumeChange={setVolume} />
            <div className="relative">
              <button
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              <OptionsMenu
                isOpen={isOptionsOpen}
                onClose={() => setIsOptionsOpen(false)}
                onExit={handleExit}
              />
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
      />
    </div>
  );
};