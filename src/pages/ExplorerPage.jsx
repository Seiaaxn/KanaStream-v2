// pages/ExplorerPage.jsx - with Anime/Donghua separation
import { useState } from 'react';
import { Grid3X3, CalendarDays, Flame, TrendingUp, Star, Film, Tv } from 'lucide-react';
import GenrePage from './explorer/GenrePage';
import SchedulePage from './explorer/SchedulePage';
import PopularPage from './explorer/PopularPage';
import TrendingPage from './explorer/TrendingPage';
import TopRatedPage from './explorer/TopRatedPage';

const ExplorerPage = ({ onAnimeSelect }) => {
  const [contentType, setContentType] = useState('anime'); // 'anime' | 'donghua'
  const [activeTab, setActiveTab] = useState('genre');

  const tabs = [
    { id: 'genre', label: 'Genre', icon: Grid3X3, component: GenrePage },
    { id: 'schedule', label: 'Jadwal', icon: CalendarDays, component: SchedulePage },
    { id: 'popular', label: 'Popular', icon: Flame, component: PopularPage },
    { id: 'trending', label: 'Trending', icon: TrendingUp, component: TrendingPage },
    { id: 'toprated', label: 'Top', icon: Star, component: TopRatedPage },
  ];

  const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || GenrePage;

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <header className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur border-b border-dark-border">
        <div className="px-4 pt-4 pb-0">
          {/* Content type toggle */}
          <div className="flex bg-dark-surface rounded-2xl p-1 mb-3 border border-dark-border">
            <button
              onClick={() => setContentType('anime')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                contentType === 'anime' ? 'bg-primary-400 text-black shadow-md' : 'text-gray-400'
              }`}
            >
              <Film size={15} />
              All Anime
            </button>
            <button
              onClick={() => setContentType('donghua')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                contentType === 'donghua' ? 'bg-primary-400 text-black shadow-md' : 'text-gray-400'
              }`}
            >
              <Tv size={15} />
              All Donghua
            </button>
          </div>

          {/* Tab filters */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                    isActive
                      ? 'bg-primary-400/15 text-primary-400 border-primary-400/30'
                      : 'bg-dark-surface text-gray-400 border-dark-border'
                  }`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-140px)]">
        <ActiveComponent onAnimeSelect={onAnimeSelect} contentType={contentType} />
      </main>
    </div>
  );
};

export default ExplorerPage;
