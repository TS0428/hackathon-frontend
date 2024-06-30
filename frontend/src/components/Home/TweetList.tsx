import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TweetList.css';

const TweetList: React.FC = () => {
  const [tweets, setTweets] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>({});
  const [currentReplyTweetId, setCurrentReplyTweetId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await axios.get('https://hackathon-backend-2hnc5jt4cq-uc.a.run.app/tweets/show');
        setTweets(response.data);
        console.log('Fetched tweets: ', response.data);
      } catch (error) {
        console.error('ツイートの取得に失敗しました', error);
      }
    };

    fetchTweets();
  }, []);

  const handleReplyChange = (tweetId: number, content: string) => {
    setReplyContent(prevState => ({ ...prevState, [tweetId]: content }));
  };

  const handleReplySubmit = async (event: React.FormEvent, tweetId: number) => {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');

    if (!userId || !userName) {
      alert('ユーザー情報が見つかりません。ログインしてください。');
      return;
    }

    const content = replyContent[tweetId];
    if (!content) {
      alert('リプライ内容を入力してください。');
      return;
    }

    try {
      await axios.post('https://hackathon-backend-2hnc5jt4cq-uc.a.run.app/replies', {
        user_id: parseInt(userId, 10),
        tweet_id: tweetId,
        content: content,
        user_name: userName, // ユーザー名を一緒にPOSTする
      });
      setReplyContent(prevState => ({ ...prevState, [tweetId]: '' }));
      alert('リプライが投稿されました');

      // Fetch updated tweets to show the new reply
      const response = await axios.get('https://hackathon-backend-2hnc5jt4cq-uc.a.run.app/tweets/show');
      setTweets(response.data);
    } catch (error) {
      console.error('リプライの投稿に失敗しました', error);
    }
  };

  const handleLike = async (tweetId: number) => {
    const userId = localStorage.getItem('user_id');

    if (!userId) {
      alert('ユーザー情報が見つかりません。ログインしてください。');
      return;
    }

    try {
      await axios.post('https://hackathon-backend-2hnc5jt4cq-uc.a.run.app/likes', {
        user_id: parseInt(userId, 10),
        tweet_id: tweetId,
      });
      setTweets(tweets.map(tweet =>
        tweet.id === tweetId ? { ...tweet, likes: tweet.likes + 1 } : tweet
      ));
    } catch (error) {
      console.error('いいねの追加に失敗しました', error);
    }
  };

  const toggleReply = (tweetId: number) => {
    setCurrentReplyTweetId(prevId => (prevId === tweetId ? null : tweetId));
  };

  const handleSignOut = () => {
    if (window.confirm('サインアウトしますか？')) {
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      navigate('/'); // サインアウト後にホームページにリダイレクト
    }
  };

  return (
    <div className="tweet-list">
      <h2>ツイート一覧</h2>
      <button onClick={handleSignOut}>サインアウト</button>
      {tweets.map(tweet => (
        <div key={tweet.id} className="tweet">
          <p><strong>{tweet.user_name}</strong></p>
          <p>{tweet.content}</p>
          <p>いいね: {tweet.likes}</p>
          <button onClick={() => handleLike(tweet.id)}>いいねを押す</button>
          <button onClick={() => toggleReply(tweet.id)}>リプライを書く</button>
          {currentReplyTweetId === tweet.id && (
            <form onSubmit={(event) => handleReplySubmit(event, tweet.id)}>
              <textarea
                placeholder="リプライ内容"
                value={replyContent[tweet.id] || ''}
                onChange={(e) => handleReplyChange(tweet.id, e.target.value)}
              />
              <button type="submit">リプライする</button>
            </form>
          )}
          <div className="replies">
            <h3>リプライ一覧</h3>
            {tweet.replies.map((reply: any) => (
              <div key={reply.id} className="reply">
                <p><strong>{reply.user_name}</strong>: {reply.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TweetList;
