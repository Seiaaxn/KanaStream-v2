// src/hooks/useComments.js
import { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { db } from '../services/firebase';

export const useComments = (animeId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sanitize key for Firebase
  const safeId = animeId ? animeId.replace(/[.#$/[\]]/g, '_') : null;

  useEffect(() => {
    if (!safeId) return;
    const commentsRef = ref(db, `comments/${safeId}`);
    const unsub = onValue(commentsRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        const items = Object.values(data)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setComments(items);
      } else {
        setComments([]);
      }
      setLoading(false);
    }, (err) => {
      console.error('Comments error:', err);
      setLoading(false);
    });
    return () => unsub();
  }, [safeId]);

  const addComment = async (text, user, profile) => {
    if (!safeId || !text.trim()) return;
    const commentsRef = ref(db, `comments/${safeId}`);
    await push(commentsRef, {
      text: text.trim(),
      userId: user?.uid || 'guest',
      displayName: profile?.displayName || user?.displayName || 'Penonton',
      avatar: profile?.avatar || `https://api.dicebear.com/7.x/anime/svg?seed=${user?.uid || 'guest'}`,
      createdAt: Date.now(),
    });
  };

  return { comments, loading, addComment };
};
