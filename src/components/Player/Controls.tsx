import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface Props {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const Controls: React.FC<Props> = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious
}) => (
  <div className="flex items-center gap-6">
    <button onClick={onPrevious}>
      <SkipBack className="w-5 h-5" />
    </button>
    
    <button 
      onClick={onTogglePlay}
      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center"
    >
      {isPlaying ? <Pause /> : <Play />}
    </button>
    
    <button onClick={onNext}>
      <SkipForward className="w-5 h-5" />
    </button>
  </div>
);