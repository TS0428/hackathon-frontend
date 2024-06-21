import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../../firebase';
import './Cast.css'; // Correct path

const CastComponent: React.FC = () => {
  const [content, setContent] = useState('');
  const [filter, setFilter] = useState('all');
  const [photo, setPhoto] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    const token = await auth.currentUser?.getIdToken();
    const user = await auth.currentUser;
    const tokenResult = await auth.currentUser?.getIdTokenResult();

    const formData = new FormData();
    formData.append('content', content);
    formData.append('filter', filter);
    formData.append('user', JSON.stringify({
      displayName: user?.displayName,
      favoriteTeam: tokenResult?.claims?.favoriteTeam,
    }));
    if (photo) {
      formData.append('photo', photo);
    }
    if (video) {
      formData.append('video', video);
    }

    try {
      const response = await axios.post('http://localhost:8080/casts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setContent('');
      setPhoto(null);
      setVideo(null);
      // Update cast list if necessary
    } catch (error) {
      console.error('Failed to post cast:', error);
    }
  };

  return (
    <div className="cast-container">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="今何をしている？"
      />
      <div className="filter-options">
        <label>
          <input
            type="radio"
            value="all"
            checked={filter === 'all'}
            onChange={handleFilterChange}
          />
          全員に表示
        </label>
        <label>
          <input
            type="radio"
            value="favorite"
            checked={filter === 'favorite'}
            onChange={handleFilterChange}
          />
          お気に入りチームのみ表示
        </label>
      </div>
      <div className="file-inputs">
        <label>
          写真を選択:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <label>
          動画を選択:
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>
      </div>
      <button onClick={handleSubmit}>Cast</button>
    </div>
  );
};

export default CastComponent;



