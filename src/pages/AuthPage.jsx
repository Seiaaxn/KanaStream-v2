// src/pages/AuthPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Play, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '', displayName: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        if (!form.displayName.trim()) {
          setError('Nama tidak boleh kosong');
          setLoading(false);
          return;
        }
        await register(form.email, form.password, form.displayName);
      }
      navigate('/');
    } catch (err) {
      const msg = err.code;
      if (msg === 'auth/invalid-credential' || msg === 'auth/wrong-password') setError('Email atau password salah');
      else if (msg === 'auth/email-already-in-use') setError('Email sudah terdaftar');
      else if (msg === 'auth/weak-password') setError('Password minimal 6 karakter');
      else if (msg === 'auth/invalid-email') setError('Format email tidak valid');
      else setError('Terjadi kesalahan. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0d18] to-[#0a0a0a]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-900/10 rounded-full blur-3xl" />
        {/* Anime dots pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,175,47,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen px-5 py-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <div className="w-9 h-9 bg-primary-400 rounded-xl flex items-center justify-center">
            <Play size={18} className="text-black fill-black ml-0.5" />
          </div>
          <span className="text-xl font-black tracking-tight">
            <span className="text-white">Anime</span>
            <span className="text-primary-400">Play</span>
          </span>
        </div>

        {/* Header text */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2 leading-tight">
            {mode === 'login' ? 'Selamat\nDatang Kembali' : 'Buat Akun\nBaru'}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === 'login'
              ? 'Masuk untuk melanjutkan nonton anime kesukaan kamu'
              : 'Daftar gratis dan mulai petualangan anime kamu'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-dark-surface rounded-2xl p-1 mb-6 border border-dark-border">
          {['login', 'register'].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === m
                  ? 'bg-primary-400 text-black shadow-lg'
                  : 'text-gray-400'
              }`}
            >
              {m === 'login' ? 'Masuk' : 'Daftar'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Nama Tampilan"
                value={form.displayName}
                onChange={e => setForm(p => ({ ...p, displayName: e.target.value }))}
                className="w-full bg-dark-surface border border-dark-border rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary-400/60 transition-colors"
              />
            </div>
          )}

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              required
              className="w-full bg-dark-surface border border-dark-border rounded-2xl pl-12 pr-4 py-4 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary-400/60 transition-colors"
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              required
              className="w-full bg-dark-surface border border-dark-border rounded-2xl pl-12 pr-12 py-4 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-primary-400/60 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-400 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-60 mt-2"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Guest */}
        <button
          onClick={() => navigate('/')}
          className="mt-4 w-full py-4 rounded-2xl border border-dark-border text-gray-400 text-sm font-medium active:scale-95 transition-all"
        >
          Lanjutkan sebagai Tamu
        </button>

        {/* Bottom illustration */}
        <div className="flex-1 flex items-end justify-center pb-4 mt-8">
          <p className="text-gray-700 text-xs text-center">
            Dengan mendaftar, kamu setuju dengan syarat & ketentuan AnimePlay
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
