import React from 'react';
import axios from 'axios';
import { signInWithPopup, Auth, GoogleAuthProvider } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';

const GoogleSignupButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await axios.post('http://localhost:8080/signup', {
        username: user.displayName,
        email: user.email,
        password: user.uid,
      });
      navigate('/signup-details'); // Googleでの登録後に詳細情報の入力ページに遷移
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleGoogleSignup}>Googleで新規登録</button>
  );
};

export default GoogleSignupButton;