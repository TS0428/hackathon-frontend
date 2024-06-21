import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Firebaseの設定ファイルをインポート
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../App.css'; // CSSファイルのインポート

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (password.length < 6) {
      setPasswordError('パスワードは6文字以上である必要があります');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      navigate('/complete-profile', { state: { idToken } });
    } catch (error: any) {
      console.error('Error during registration:', error);
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('このメールアドレスは既に使用されています');
      } else {
        setEmailError('登録中にエラーが発生しました');
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      navigate('/complete-profile', { state: { idToken } });
    } catch (error) {
      console.error('Error during Google sign-up:', error);
      setEmailError('Googleでの登録中にエラーが発生しました');
    }
  };

  return (
    <div className="signup-container">
      <h1>新規登録</h1>
      <button className="styled-button" onClick={handleGoogleSignup}>Googleで新規登録</button>
      <div className="or-separator">ーまたはー</div>
      <form onSubmit={handleEmailSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Emailを入力してください"
          className="input-field"
        />
        {emailError && <p className="error-text">{emailError}</p>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwordを入力してください"
          className="input-field"
        />
        {passwordError && <p className="error-text">{passwordError}</p>}
        <button type="submit" className="submit-button">新規登録</button>
      </form>
    </div>
  );
};

export default Signup;
