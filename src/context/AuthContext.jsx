// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { auth, db } from '../services/firebase';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        await loadProfile(firebaseUser.uid);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const loadProfile = async (uid) => {
    try {
      const snap = await get(ref(db, `users/${uid}/profile`));
      if (snap.exists()) {
        setProfile(snap.val());
      }
    } catch (e) {
      console.error('Error loading profile:', e);
    }
  };

  const register = async (email, password, displayName) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    const profileData = {
      displayName,
      email,
      avatar: `https://api.dicebear.com/7.x/anime/svg?seed=${displayName}`,
      bio: '',
      createdAt: new Date().toISOString(),
    };
    await set(ref(db, `users/${cred.user.uid}/profile`), profileData);
    setProfile(profileData);
    return cred;
  };

  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await loadProfile(cred.user.uid);
    return cred;
  };

  const logout = () => signOut(auth);

  const updateUserProfile = async (data) => {
    if (!user) return;
    const updated = { ...profile, ...data };
    await update(ref(db, `users/${user.uid}/profile`), data);
    if (data.displayName) {
      await updateProfile(user, { displayName: data.displayName });
    }
    setProfile(updated);
  };

  // History synced with Firebase + localStorage fallback
  const saveHistory = async (item) => {
    const HISTORY_KEY = 'anime_watch_history';
    let history = [];
    try {
      history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {}

    const existingIdx = history.findIndex(h => h.id === item.id);
    if (existingIdx >= 0) {
      history.splice(existingIdx, 1);
    }
    history.unshift(item);
    history = history.slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

    if (user) {
      try {
        await set(ref(db, `users/${user.uid}/history/${item.id.replace(/[.#$/[\]]/g, '_')}`), {
          ...item,
          updatedAt: new Date().toISOString()
        });
      } catch (e) {
        console.error('Firebase history save error:', e);
      }
    }
  };

  const getHistory = async () => {
    const HISTORY_KEY = 'anime_watch_history';
    if (user) {
      try {
        const snap = await get(ref(db, `users/${user.uid}/history`));
        if (snap.exists()) {
          const data = snap.val();
          const items = Object.values(data).sort((a, b) =>
            new Date(b.lastWatched) - new Date(a.lastWatched)
          );
          localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
          return items;
        }
      } catch (e) {
        console.error('Firebase history load error:', e);
      }
    }
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      loading,
      register,
      login,
      logout,
      updateUserProfile,
      saveHistory,
      getHistory,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
                      
