import React from 'react';
import { useNavigate } from 'react-router-dom';
import TweetList from './TweetList';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNewTweetClick = () => {
    navigate('/tweet');
  };

  return (
    <div className="home-container">
      <nav>
        <button onClick={handleNewTweetClick}>新しいツイート</button>
      </nav>
      <TweetList />
    </div>
  );
};

export default Home;
