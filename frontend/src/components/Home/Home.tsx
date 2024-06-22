import React, { useState, useEffect } from 'react';
import { fetchCasts, Cast, Reply } from './api';  // Reply 型もインポート
import { useNavigate } from 'react-router-dom'; // React Router のフックをインポート

const Home: React.FC = () => {
  const [casts, setCasts] = useState<Cast[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // useNavigate フックを使用

  useEffect(() => {
    const getCasts = async () => {
      try {
        const castData = await fetchCasts();
        setCasts(castData);
      } catch (error) {
        console.error('Failed to fetch casts:', error);
        setError('Failed to fetch casts');
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
              {cast.replies.map((reply: Reply) => (  // 型を明示的に定義
                <div key={reply.id} className="reply-item">
                  <p>{reply.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
