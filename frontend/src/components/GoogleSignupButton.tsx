// src/components/GoogleSignupButton.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const GoogleSignupButton: React.FC = () => {
  const navigate = useNavigate();
  const [googleError, setGoogleError] = useState('');

  const handleGoogleSignup = async () => {
    setGoogleError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await axios.post('http://localhost:8080/signup', {
        username: user.displayName,
        email: user.email,
        password: user.uid,
      });
      navigate('/complete-profile', { state: { email: user.email } }); // Googleでの登録後に詳細情報の入力ページに遷移
    } catch (error: any) {
      console.error('Error during Google signup:', error);
      if (error.code === 'auth/email-already-in-use') {
        setGoogleError('このGoogleアカウントは既に使用されています');
      } else {
        setGoogleError('Google認証中にエラーが発生しました');
      }
    }
  };

  return (
    <div>
      <button onClick={handleGoogleSignup}>Googleで新規登録</button>
      {googleError && <p style={{ color: 'red' }}>{googleError}</p>}
    </div>
  );
};

export default GoogleSignupButton;
