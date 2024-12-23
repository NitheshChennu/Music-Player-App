export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  isFavorite: boolean;
  timestamp?: number; // Add timestamp for unique keys in lists
}

export interface PlaylistSection {
  title: string;
  songs: Song[];
}