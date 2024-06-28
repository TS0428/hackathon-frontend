import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css'; // CSSファイルのインポート
import axios from 'axios';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = userCredential.user.email;

      if (!userEmail) {
        throw new Error("メールが取得できませんでした。");
      }

      const res = await axios.get(`http://localhost:8080/user/select?email=${userEmail}`);
      const userId = res.data.id;
      const userName = res.data.user_name;

      localStorage.setItem('user_id', userId);
      localStorage.setItem('user_name', userName);

      console.log('User data:', res.data);
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>ログイン</h2>
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
