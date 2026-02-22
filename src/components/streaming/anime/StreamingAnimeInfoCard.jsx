import { useState } from "react";
import { ChevronDown, ChevronUp, Flag, Film, Monitor, Calendar } from "lucide-react";

const StreamingAnimeInfoCard = ({ anime, episodeNumber }) => {
  const [expanded, setExpanded] = useState(false);
  if (!anime) return null;

  return (
    <div className="mb-5">
      {/* Episode pill */}
      {episodeNumber && (
        <div className="mb-2.5">
          <span className="inline-flex items-center gap-1.5 bg-primary-400/15 border border-primary-400/25 text-primary-400 text-xs font-bold px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-primary-400 rounded-full inline-block" />
            Episode {episodeNumber}
          </span>
        </div>
      )}

      <h2 className="text-lg font-bold text-white mb-2 leading-snug">{anime.title}</h2>

      {/* Info badges */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {[
          { label: anime.status, icon: Flag },
          { label: anime.type, icon: Film },
          { label: anime.totalEpisodes ? `${anime.totalEpisodes} Eps` : null, icon: Monitor },
          { label: anime.released, icon: Calendar },
        ].filter(b => b.label).map((b, i) => (
          <div key={i} className="flex items-center gap-1 bg-dark-surface border border-dark-border rounded-lg px-2 py-1">
            <b.icon size={11} className="text-gray-500" />
            <span className="text-xs text-gray-400">{b.label}</span>
          </div>
        ))}
      </div>

      {/* Synopsis */}
      {anime.synopsis && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1 h-3 bg-primary-400 rounded-full" />
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sinopsis</span>
          </div>
          <p
            onClick={() => setExpanded(!expanded)}
            className={`text-sm text-gray-400 leading-relaxed cursor-pointer transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}
          >
            {anime.synopsis}
          </p>
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-1 text-xs text-primary-400 mt-1.5">
            {expanded ? <><ChevronUp size={12} />Sembunyikan</> : <><ChevronDown size={12} />Selengkapnya</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default StreamingAnimeInfoCard;
