import React, { useState } from 'react';
import axios from 'axios';

const NewReply: React.FC<{ tweetId: number }> = ({ tweetId }) => {
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8080/replies', {
        user_id: userId,
        tweet_id: tweetId,
        content: content,
      });
      setContent('');
      setUserId('');
      alert('リプライが投稿されました');
    } catch (error) {
      console.error('リプライの投稿に失敗しました', error);
    }
  };

  return (
    <div>
      <h3>新しいリプライ</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ユーザーID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <textarea
          placeholder="リプライ内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">リプライする</button>
      </form>
    </div>
  );
};

export default NewReply;
