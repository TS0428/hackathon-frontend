import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Castlist from './Castlist';
import '../App.css'; // 正しいパスを指定

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

const Profile: React.FC = () => {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [userFavoriteTeam, setUserFavoriteTeam] = useState<string>('Unknown');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      fetchFavoriteTeam();
      fetchUserCasts();
    }
  }, [navigate]);

  const fetchFavoriteTeam = async () => {
    const tokenResult = await auth.currentUser?.getIdTokenResult();
    const team = tokenResult?.claims?.favoriteTeam || 'Unknown';
    setUserFavoriteTeam(typeof team === 'string' ? team : 'Unknown');
  };

  const fetchUserCasts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/user-casts');
      setCasts(response.data);
    } catch (error) {
      console.error('Failed to fetch user casts:', error);
    }
  };

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
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="main-content">
        <h1>Profile</h1>
        <h2>{auth.currentUser?.displayName || 'User'}</h2>
        <p>Favorite Team: {userFavoriteTeam}</p>
        <Castlist casts={casts} onReply={handleReply} onLike={handleLike} />
      </div>
    </div>
  );
};

export default Profile;
