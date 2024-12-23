import React from 'react';
import { Song } from '../types/music';
import { TrackItem } from './TrackItem';

interface Props {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  currentSong?: Song | null;
}

export const TrackList: React.FC<Props> = ({ songs, onSongSelect, currentSong }) => {
  return (
    <div className="space-y-2">
      {songs.map((song, index) => (
        <TrackItem
          key={`${song.id}-${(song as any).timestamp || index}`} // Use timestamp for recently played items
          song={song}
          index={index}
          isPlaying={currentSong?.id === song.id}
          onSelect={() => onSongSelect(song)}
        />
      ))}
    </div>
  );
};