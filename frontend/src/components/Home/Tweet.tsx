import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReplyList from './ReplyList';
import NewReply from './NewReply';

const Tweet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tweet, setTweet] = useState<any>(null);

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tweets/${id}`);
        setTweet(response.data);
      } catch (error) {
        console.error('ツイートの取得に失敗しました', error);
      }
    };

    fetchTweet();
  }, [id]);

  return (
    <div>
      {tweet ? (
        <>
          <h2>{tweet.user_name}: {tweet.content}</h2>
          <p>いいね: {tweet.likes}</p>
          <ReplyList replies={tweet.replies} />
          <NewReply tweetId={tweet.id} />
        </>
      ) : (
        <p>ツイートを読み込み中...</p>
      )}
    </div>
  );
};

export default Tweet;
