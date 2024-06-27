import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TweetList: React.FC = () => {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('http://localhost:8080/tweets/show');
        setTweets(response.data);
      } catch (error) {
        console.error('ツイートの取得に失敗しました', error);
      }
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h2>ツイート一覧</h2>
      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <Link to={`/tweet/${tweet.id}`}>
              {tweet.user_name}: {tweet.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TweetList;
export {};