import { Song } from '../types/music';

export const RECENTLY_PLAYED_KEY = 'recentlyPlayed';
export const FAVORITES_KEY = 'favorites';

export const getRecentlyPlayed = (): Song[] => {
  try {
    const stored = sessionStorage.getItem(RECENTLY_PLAYED_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading recently played:', error);
    return [];
  }
};

export const addToRecentlyPlayed = (song: Song) => {
  try {
    const recent = getRecentlyPlayed();
    const timestamp = Date.now();
    
    // Create a new array with unique songs based on ID
    const uniqueSongs = [
      { ...song, timestamp }, // Add timestamp to ensure unique keys
      ...recent.filter(s => s.id !== song.id)
    ].slice(0, 10);
    
    sessionStorage.setItem(RECENTLY_PLAYED_KEY, JSON.stringify(uniqueSongs));
  } catch (error) {
    console.error('Error adding to recently played:', error);
  }
};

export const getFavorites = (): Song[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const toggleFavorite = (song: Song): boolean => {
  try {
    const favorites = getFavorites();
    const exists = favorites.some(f => f.id === song.id);
    
    const updated = exists
      ? favorites.filter(f => f.id !== song.id)
      : [...favorites, { ...song, isFavorite: true }];
      
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return !exists;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};