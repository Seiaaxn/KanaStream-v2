// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage/index';
import StreamingAnime from './pages/Streaming/StreamingAnime';
import StreamingDonghua from './pages/Streaming/StreamingDonghua';
import ExplorerPage from './pages/ExplorerPage';
import HistoryPage from './pages/HistoryPage';
import MyListPage from './pages/MyListPage';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import AutoToTop from './components/AutoToTop';
import Search from './pages/Search';

function App() {
  return (
    <AuthProvider>
      <AutoToTop />
      <Routes>
        {/* Auth page */}
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Full screen routes */}
        <Route path="/detail/:category/:id" element={<DetailPage />} />
        <Route path="/anime/watch" element={<StreamingAnime />} />
        <Route path="/donghua/watch" element={<StreamingDonghua />} />

        {/* Routes with bottom navigation */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorerPage />} />
          <Route path="/mylist" element={<MyListPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
