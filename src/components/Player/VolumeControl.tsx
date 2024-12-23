import React from 'react';
import { Volume2 } from 'lucide-react';

interface Props {
  volume: number;
  onVolumeChange: (value: number) => void;
}

export const VolumeControl: React.FC<Props> = ({ volume, onVolumeChange }) => (
  <div className="flex items-center gap-2">
    <Volume2 className="w-5 h-5" />
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={volume}
      onChange={(e) => onVolumeChange(Number(e.target.value))}
      className="w-24"
    />
  </div>
);