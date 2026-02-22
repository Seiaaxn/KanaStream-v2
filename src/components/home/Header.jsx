// src/components/home/Header.jsx
import { Search, Bell, Play, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = ({ scrolled }) => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const avatarSrc = profile?.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${user?.uid || 'guest'}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? 'glass shadow-lg border-b border-dark-border/50' : 'bg-gradient-to-b from-black/70 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary-400 rounded-lg flex items-center justify-center">
            <Play size={12} className="text-black fill-black ml-0.5" />
          </div>
          <span className="text-base font-black tracking-tight">
            <span className="text-white">Anime</span>
            <span className="text-primary-400">Play</span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <Link to="/search" className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Search size={19} className="text-gray-300" />
          </Link>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative">
            <Bell size={19} className="text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary-400 rounded-full" />
          </button>
          <button onClick={() => navigate('/profile')} className="ml-1">
            {user ? (
              <img
                src={avatarSrc}
                alt="profile"
                className="w-7 h-7 rounded-lg object-cover border border-primary-400/30"
                onError={e => { e.target.src = `https://api.dicebear.com/7.x/anime/svg?seed=user`; }}
              />
            ) : (
              <div className="w-7 h-7 bg-dark-surface border border-dark-border rounded-lg flex items-center justify-center">
                <User size={14} className="text-gray-400" />
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
      
