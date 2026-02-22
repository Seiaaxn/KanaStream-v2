// StreamingAnimeCommentsSection.jsx - Firebase powered
import { useState } from 'react';
import { Send, MessageCircle, Loader2, LogIn } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useComments } from '../../../hooks/useComments';
import { useNavigate } from 'react-router-dom';

const timeAgo = (ts) => {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} mnt lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  const d = Math.floor(h / 24);
  return `${d} hari lalu`;
};

const StreamingAnimeCommentsSection = ({ animeId }) => {
  const { user, profile } = useAuth();
  const { comments, loading, addComment } = useComments(animeId);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    try {
      await addComment(text, user, profile);
      setText('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle size={18} className="text-primary-400" />
        <h3 className="text-white font-semibold">Komentar</h3>
        <span className="text-xs text-gray-500 bg-dark-surface px-2 py-0.5 rounded-full">{comments.length}</span>
      </div>

      {/* Input */}
      {user ? (
        <div className="flex gap-3 mb-5">
          <img
            src={profile?.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${user.uid}`}
            alt="avatar"
            className="w-9 h-9 rounded-xl object-cover bg-dark-surface shrink-0"
            onError={e => { e.target.src = `https://api.dicebear.com/7.x/anime/svg?seed=user`; }}
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Tulis komentar..."
              className="flex-1 bg-dark-surface border border-dark-border rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary-400/50"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim() || sending}
              className="w-10 h-10 bg-primary-400 rounded-xl flex items-center justify-center disabled:opacity-40 shrink-0"
            >
              {sending ? <Loader2 size={16} className="animate-spin text-black" /> : <Send size={16} className="text-black" />}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate('/auth')}
          className="w-full flex items-center justify-center gap-2 bg-dark-surface border border-dark-border rounded-xl py-3 text-gray-400 text-sm mb-5 hover:border-primary-400/30 transition-colors"
        >
          <LogIn size={16} />
          Masuk untuk berkomentar
        </button>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="flex justify-center py-6"><Loader2 size={20} className="animate-spin text-gray-500" /></div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          <MessageCircle size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Belum ada komentar. Jadilah yang pertama!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((c, i) => (
            <div key={i} className="flex gap-3">
              <img
                src={c.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${c.userId}`}
                alt={c.displayName}
                className="w-9 h-9 rounded-xl object-cover bg-dark-surface shrink-0"
                onError={e => { e.target.src = `https://api.dicebear.com/7.x/anime/svg?seed=user`; }}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{c.displayName}</span>
                  <span className="text-xs text-gray-600">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamingAnimeCommentsSection;
