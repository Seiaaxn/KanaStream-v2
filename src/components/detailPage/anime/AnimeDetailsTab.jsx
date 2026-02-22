import { Flag, Film, Monitor, Calendar, Tag } from 'lucide-react';

const AnimeDetailsTab = ({ description, status, type, totalEpisodes, released, genres = [] }) => {
  return (
    <div className="space-y-5">
      {/* Synopsis */}
      <div className="bg-dark-surface border border-dark-border rounded-2xl p-4">
        <h3 className="text-primary-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary-400 rounded-full inline-block" />
          Sinopsis
        </h3>
        <p className="text-gray-300 text-sm leading-relaxed">
          {description || 'Sinopsis tidak tersedia.'}
        </p>
      </div>

      {/* Information */}
      <div className="bg-dark-surface border border-dark-border rounded-2xl p-4">
        <h3 className="text-primary-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-primary-400 rounded-full inline-block" />
          Informasi
        </h3>
        <div className="space-y-3">
          {[
            { icon: Flag, label: 'Status', value: status },
            { icon: Film, label: 'Tipe', value: type },
            { icon: Monitor, label: 'Episode', value: totalEpisodes > 0 ? totalEpisodes : null },
            { icon: Calendar, label: 'Rilis', value: released },
          ].filter(i => i.value).map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-500">
                <item.icon size={14} />
                <span className="text-sm">{item.label}</span>
              </div>
              <span className="text-sm text-white font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Genres */}
      {genres.length > 0 && (
        <div className="bg-dark-surface border border-dark-border rounded-2xl p-4">
          <h3 className="text-primary-400 font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary-400 rounded-full inline-block" />
            Genre
          </h3>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre, i) => (
              <span key={i} className="px-3 py-1.5 bg-primary-400/10 border border-primary-400/20 rounded-xl text-xs text-primary-400 font-medium">
                {genre}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailsTab;
