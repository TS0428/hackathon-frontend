import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

interface Post {
  user: string;
  text: string;
}

const Home: React.FC = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 認証チェックのロジック
    if (!auth.currentUser) {
      navigate('/login');
    } else {
      // 初期データの取得
      fetchPosts();
    }
  }, [navigate]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.error('Sign out error:', error);
    });
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim() === '') return;

    const post = {
      user: auth.currentUser?.displayName || 'Anonymous',
      text: newPost,
    };

    try {
      await axios.post('http://localhost:8080/posts', post);
      setNewPost('');
      fetchPosts(); // 投稿後に再度ポストを取得
    } catch (error) {
      console.error('Failed to submit post:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={handleSignOut}>Sign Out</button>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="新しい投稿を書く"
        />
        <button type="submit">投稿</button>
      </form>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post.user}: {post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;

