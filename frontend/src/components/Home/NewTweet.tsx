import React, { useState } from 'react';
import axios from 'axios';

const NewTweet: React.FC = () => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/tweets', {
        user_id: userId,
        content: content,
      });
      setContent('');
      setUserId('');
      alert('ツイートが投稿されました');
    } catch (error) {
      console.error('ツイートの投稿に失敗しました', error);
    }
  };

  return (
    <div>
      <h2>新しいツイート</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ユーザーID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
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
