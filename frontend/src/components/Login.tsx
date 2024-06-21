import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';
import '../App.css'; // CSSファイルのインポート

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) => {
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      <button onClick={handleGoogleSignIn} className="google-button">Googleでログイン</button>
      <div className="or-separator">ーまたはー</div>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Emailを入力してください"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwordを入力してください"
          className="input-field"
        />
        <button type="submit" className="submit-button">ログイン</button>
      </form>
    </div>
  );
};

export default Login;
