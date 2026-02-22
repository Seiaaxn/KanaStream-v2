// src/pages/ProfilePage.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, Edit3, LogOut, Save, X, ChevronRight,
  Clock, Heart, Star, Settings, Shield, User, Film, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, profile, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ displayName: '', bio: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef();

  const startEditing = () => {
    setForm({ displayName: profile?.displayName || '', bio: profile?.bio || '' });
    setEditing(true);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = { displayName: form.displayName || profile?.displayName, bio: form.bio };
      if (avatarPreview) updates.avatar = avatarPreview;
      await updateUserProfile(updates);
      setEditing(false);
      setAvatarPreview(null);
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const avatarSrc = avatarPreview || profile?.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${user?.uid || 'guest'}`;

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg pb-24">
        <header className="sticky top-0 z-40 glass border-b border-dark-border">
          <div className="px-4 h-14 flex items-center"><h1 className="text-lg font-bold text-white">Profil</h1></div>
        </header>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="w-20 h-20 bg-dark-surface rounded-full flex items-center justify-center mb-4 border border-dark-border">
            <User size={36} className="text-gray-600" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Belum Masuk</h2>
          <p className="text-gray-500 text-sm mb-6">Masuk untuk menyimpan histori, favorit, dan profil kamu di semua perangkat</p>
          <button onClick={() => navigate('/auth')} className="bg-primary-400 text-black font-bold px-8 py-3 rounded-2xl">Masuk / Daftar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-24">
      <header className="sticky top-0 z-40 glass border-b border-dark-border">
        <div className="px-4 h-14 flex items-center justify-between">
          <h1 className="text-lg font-bold text-white">Profil</h1>
          {!editing ? (
            <button onClick={startEditing} className="flex items-center gap-1.5 text-primary-400 text-sm font-medium"><Edit3 size={15} />Edit</button>
          ) : (
            <div className="flex gap-3">
              <button onClick={() => { setEditing(false); setAvatarPreview(null); }} className="text-gray-400"><X size={20} /></button>
              <button onClick={handleSave} disabled={saving} className="text-primary-400">
                {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary-400/20 via-orange-500/10 to-purple-600/20" />
        <div className="px-4 pb-4">
          <div className="relative -mt-14 mb-3 inline-block">
            <img src={avatarSrc} alt="avatar" className="w-24 h-24 rounded-2xl border-4 border-dark-bg object-cover bg-dark-surface"
              onError={e => { e.target.src = `https://api.dicebear.com/7.x/anime/svg?seed=fallback`; }} />
            {editing && (
              <>
                <button onClick={() => fileRef.current?.click()} className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary-400 rounded-full flex items-center justify-center">
                  <Camera size={14} className="text-black" />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </>
            )}
          </div>

          {editing ? (
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Nama Tampilan</label>
                <input type="text" value={form.displayName} onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
                  className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-400/60" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3}
                  placeholder="Ceritakan sedikit tentang kamu..."
                  className="w-full bg-dark-surface border border-dark-border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary-400/60 resize-none" />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-bold text-white">{profile?.displayName || user.displayName}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              {profile?.bio && <p className="text-sm text-gray-400 mt-2">{profile.bio}</p>}
            </div>
          )}
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {[{ label: 'Ditonton', value: '0', icon: Film }, { label: 'Favorit', value: '0', icon: Heart }, { label: 'Rating', value: '0', icon: Star }].map((s) => (
            <div key={s.label} className="bg-dark-surface border border-dark-border rounded-2xl p-3 text-center">
              <s.icon size={18} className="text-primary-400 mx-auto mb-1" />
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 space-y-2">
        {[{ label: 'Riwayat Tonton', icon: Clock, path: '/history' }, { label: 'Daftar Favorit', icon: Heart, path: '/mylist' }, { label: 'Pengaturan', icon: Settings }, { label: 'Privasi', icon: Shield }].map((item) => (
          <button key={item.label} onClick={() => item.path && navigate(item.path)}
            className="w-full flex items-center gap-3 bg-dark-surface border border-dark-border rounded-2xl p-4 transition-colors">
            <div className="w-9 h-9 bg-dark-card rounded-xl flex items-center justify-center"><item.icon size={18} className="text-gray-400" /></div>
            <span className="text-sm text-white font-medium flex-1 text-left">{item.label}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        ))}
        <button onClick={handleLogout} className="w-full flex items-center gap-3 bg-red-500/5 border border-red-500/20 rounded-2xl p-4 mt-2">
          <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center"><LogOut size={18} className="text-red-400" /></div>
          <span className="text-sm text-red-400 font-medium flex-1 text-left">Keluar</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
