import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import CastComponent from './Cast';
import CastList from './Castlist';
import axios from 'axios';
import './Home.css'; // 正しいパスを指定

interface Cast {
  id: number;
  content: string;
  mediaUrl?: string;
  likes: number;
  replies: Cast[];
  user: {
    displayName: string;
    favoriteTeam: string;
  };
}

const Home: React.FC = () => {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [filteredCasts, setFilteredCasts] = useState<Cast[]>([]);
  const [filter, setFilter] = useState('all');
  const [userFavoriteTeam, setUserFavoriteTeam] = useState<string>('Unknown');
  const [showInput, setShowInput] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      fetchFavoriteTeam();
      fetchCasts();
    }
  }, [navigate]);

  const fetchFavoriteTeam = async () => {
    const token = await auth.currentUser?.getIdTokenResult();
    const team = token?.claims?.favoriteTeam || 'Unknown';
    setUserFavoriteTeam(typeof team === 'string' ? team : 'Unknown');
  };

  const fetchCasts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/casts', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setCasts(response.data);
    } catch (error) {
      console.error('Failed to fetch casts:', error);
    }
  };

  useEffect(() => {
    if (filter === 'favorite') {
      const filtered = casts.filter(cast => cast.user.favoriteTeam === userFavoriteTeam);
      setFilteredCasts(filtered);
    } else {
      setFilteredCasts(casts);
    }
  }, [casts, filter, userFavoriteTeam]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  const handleReply = (id: number) => {
    console.log(`Reply to cast with id: ${id}`);
    // 必要に応じて実装
  };

  const handleLike = (id: number) => {
    console.log(`Like cast with id: ${id}`);
    // 必要に応じて実装
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button onClick={() => navigate('/profile')}>プロフィールの変更</button>
        <button onClick={() => console.log('Search feature not implemented yet')}>Search</button>
        <button onClick={() => setShowInput(!showInput)}>発信する</button>
        {showInput && <CastComponent />}
        <button onClick={handleSignOut}>ログアウト</button>
      </div>
      <div className="main-content">
        <h1>Home</h1>
        <div className="filter-buttons">
          <button onClick={() => setFilter('favorite')}>お気に入りチーム</button>
          <button onClick={() => setFilter('all')}>おすすめ</button>
        </div>
        <CastList casts={filteredCasts} onReply={handleReply} onLike={handleLike} />
      </div>
    </div>
  );
};

export default Home;
