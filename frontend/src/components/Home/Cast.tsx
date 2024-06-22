import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cast.css'; // 正しいパス

export const Cast: React.FC = () => {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/id');
        setUserId(response.data.id);
      } catch (error) {
        console.error('Failed to fetch user id:', error);
        setError('Failed to fetch user id');
      }
    };

    fetchUserId();
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (userId === null) {
      setError('User ID not found');
      return;
    }

    try {
      const formData = {
        user_id: userId,
        content: content,
      };

      await axios.post('http://localhost:8080/casts', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setContent('');
      setError(null);
      setSuccessMessage('キャストしました。');

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Failed to save cast: ' + (error.response?.data || error.message));
        console.error('Failed to post cast:', error.response?.data || error.message);
      } else {
        setError('An unexpected error occurred');
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className="cast-container">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="今何をしている？"
      />
      <button onClick={handleSubmit}>Cast</button>
      {error && <div className="error-message">{error}</div>}
      {successMessage && (
        <div className="success-message">
          {successMessage}
          <button onClick={handleHomeClick}>Homeへ</button>
        </div>
      )}
    </div>
  );
};

export default Cast;
