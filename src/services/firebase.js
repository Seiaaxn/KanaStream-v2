// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJjiT0vtiLW9UH39NT0qZsXEF4kjhwWG0",
  authDomain: "kanaverse-b7d4e.firebaseapp.com",
  databaseURL: "https://kanaverse-b7d4e-default-rtdb.firebaseio.com",
  projectId: "kanaverse-b7d4e",
  storageBucket: "kanaverse-b7d4e.firebasestorage.app",
  messagingSenderId: "90888486704",
  appId: "1:90888486704:web:782a044df12309a04252f5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
