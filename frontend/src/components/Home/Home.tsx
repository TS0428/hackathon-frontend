import React, { useState, useEffect } from 'react';
 import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'; // 必要に応じてスタイルシートのパスを修正してください



const Home: React.FC = () => {
  const [casts, setCasts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const getCasts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/casts/show');
        setCasts(response.data);
      } catch (error) {
        console.error('Failed to fetch casts:', error);
        setError('Failed to fetch cast');
      }
    };

    getCasts();
  }, []);

  const handleCastButtonClick = () => {
    navigate('/cast'); // Cast.tsx へのナビゲーション
  };

  return (
    <div className="home-container">
      <button onClick={handleCastButtonClick}>キャストする</button>
      <div className="cast-list-container">
        {error && <div className="error-message">{error}</div>}
        {casts.map((cast) => (
          <div key={cast.id} className="cast-item">
            <h3>{cast.content}</h3>
            <p>Likes: {cast.likes}</p>
            <div className="replies">
              <h4>Replies:</h4>
              {cast.replies.length > 0 ? (
                cast.replies.map((reply: any) => (
                  <div key={reply.id} className="reply-item">
                    <p>{reply.content}</p>
                  </div>
                ))
              ) : (
                <p>No replies yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
