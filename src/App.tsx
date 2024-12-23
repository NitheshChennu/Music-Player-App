import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { TrackList } from './components/TrackList';
import { Player } from './components/Player';
import { Song } from './types/music';
import { sampleSongs } from './data/sampleData';
import { getRecentlyPlayed, getFavorites, addToRecentlyPlayed } from './utils/storage';

function App() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = sampleSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    addToRecentlyPlayed(song);
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = sampleSongs.findIndex(s => s.id === currentSong.id);
    const nextSong = sampleSongs[(currentIndex + 1) % sampleSongs.length];
    handleSongSelect(nextSong);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = sampleSongs.findIndex(s => s.id === currentSong.id);
    const previousSong = sampleSongs[(currentIndex - 1 + sampleSongs.length) % sampleSongs.length];
    handleSongSelect(previousSong);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] to-black text-white">
        <Sidebar />
        
        <main className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            
            <Routes>
              <Route path="/" element={
                <>
                  <h1 className="text-3xl font-bold mt-8 mb-6">For You</h1>
                  <TrackList
                    songs={filteredSongs}
                    onSongSelect={handleSongSelect}
                    currentSong={currentSong}
                  />
                </>
              } />
              <Route path="/favorites" element={
                <>
                  <h1 className="text-3xl font-bold mt-8 mb-6">Favourites</h1>
                  <TrackList
                    songs={getFavorites()}
                    onSongSelect={handleSongSelect}
                    currentSong={currentSong}
                  />
                </>
              } />
              <Route path="/recent" element={
                <>
                  <h1 className="text-3xl font-bold mt-8 mb-6">Recently Played</h1>
                  <TrackList
                    songs={getRecentlyPlayed()}
                    onSongSelect={handleSongSelect}
                    currentSong={currentSong}
                  />
                </>
              } />
            </Routes>
          </div>
        </main>

        {currentSong && (
          <Player
            song={currentSong}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onExit={() => setCurrentSong(null)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;