import { Link, useLocation } from 'react-router-dom';
import { Music, Heart, History } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-black p-6">
      <div className="flex items-center gap-2 mb-8">
        <Music className="w-8 h-8" />
        <span className="text-2xl font-bold">Spotify</span>
      </div>

      <nav className="space-y-4">
        <Link 
          to="/" 
          className={`flex items-center gap-3 text-sm font-semibold ${
            isActive('/') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Music className="w-5 h-5" />
          For You
        </Link>
        <Link 
          to="/favorites" 
          className={`flex items-center gap-3 text-sm font-semibold ${
            isActive('/favorites') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart className="w-5 h-5" />
          Favourites
        </Link>
        <Link 
          to="/recent" 
          className={`flex items-center gap-3 text-sm font-semibold ${
            isActive('/recent') ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          <History className="w-5 h-5" />
          Recently Played
        </Link>
      </nav>
    </div>
  );
};