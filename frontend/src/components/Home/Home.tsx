import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TweetList from './TweetList';
import NewTweet from './NewTweet';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNewTweetClick = () => {
    navigate('/tweet');
  };

  return (
    <div className="home-container">
      <nav>
        <Link to="/">ホーム</Link>
        <button onClick={handleNewTweetClick}>新しいツイート</button>
      </nav>
      <TweetList />
    </div>
  );
};

export default Home;
