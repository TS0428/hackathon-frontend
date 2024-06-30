import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewTweet: React.FC = () => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');

    if (!userId || !userName) {
      alert('ユーザー情報が見つかりません。ログインしてください。');
      return;
    }

    try {
      await axios.post('https://hackathon-backend-2hnc5jt4cq-uc.a.run.app/tweets', {
        user_id: parseInt(userId, 10), // 文字列を整数に変換
        user_name: userName,
        content: content,
        likes: 0,
        replies: []
      });
      setContent('');
      alert('ツイートが投稿されました');
      navigate('/home');
    } catch (error) {
      console.error('ツイートの投稿に失敗しました', error);
    }
  };

  return (
    <div>
      <h2>新しいツイート</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="ツイート内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">ツイートする</button>
      </form>
    </div>
  );
};

export default NewTweet;
