// src/components/layout/MainLayout.jsx
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Heart, Clock, User, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'explore', label: 'Explore', icon: Compass, path: '/explore' },
    { id: 'search', label: 'Cari', icon: Search, path: '/search' },
    { id: 'mylist', label: 'Favorit', icon: Heart, path: '/mylist' },
    { id: 'history', label: 'Riwayat', icon: Clock, path: '/history' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const avatarSrc = profile?.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${user?.uid || 'guest'}`;
  const isProfileActive = location.pathname === '/profile';

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <Outlet />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t border-dark-border z-50 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all duration-300 ${
                  active ? 'text-primary-400' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${active ? 'bg-primary-400/10' : ''}`}>
                  <Icon size={21} strokeWidth={active ? 2.5 : 2} className={`transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
                </div>
                <span className={`text-[9px] font-medium ${active ? 'opacity-100' : 'opacity-60'}`}>{item.label}</span>
              </button>
            );
          })}

          {/* Profile avatar nav item */}
          <button
            onClick={() => navigate('/profile')}
            className={`flex flex-col items-center justify-center w-full h-full space-y-0.5 transition-all duration-300 ${
              isProfileActive ? 'text-primary-400' : 'text-gray-500'
            }`}
          >
            <div className={`p-0.5 rounded-xl transition-all duration-300 ${isProfileActive ? 'ring-2 ring-primary-400' : ''}`}>
              {user ? (
                <img
                  src={avatarSrc}
                  alt="profile"
                  className="w-6 h-6 rounded-lg object-cover bg-dark-surface"
                  onError={e => { e.target.src = `https://api.dicebear.com/7.x/anime/svg?seed=user`; }}
                />
              ) : (
                <div className={`p-1 rounded-xl ${isProfileActive ? 'bg-primary-400/10' : ''}`}>
                  <User size={21} strokeWidth={isProfileActive ? 2.5 : 2} />
                </div>
              )}
            </div>
            <span className={`text-[9px] font-medium ${isProfileActive ? 'opacity-100' : 'opacity-60'}`}>Profil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;
        
