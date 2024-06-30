import React from 'react';
import { useNavigate } from 'react-router-dom';

const Start: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="start-screen">
      <h1>Welcome to Tweet!!</h1>
      <p>言葉のキャッチボールをしよう</p>
      <button
        className="styled-button"
        onClick={() => navigate('/login')}
      >
        ログイン
      </button>
      <div>ーもしくはー</div>
      <button
        className="styled-button"
        onClick={() => navigate('/signup')}
      >
        アカウントを作成
      </button>
    </div>
  );
};

export default Start;

