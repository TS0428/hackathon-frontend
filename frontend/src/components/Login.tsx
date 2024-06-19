import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState(''); // ログインフォームのメールアドレスの状態と更新関数を定義
  const [password, setPassword] = useState(''); // ログインフォームのパスワードの状態と更新関数を定義
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle sign-in
        navigate('/home');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ここにEmailとパスワードでのログイン処理を実装する（未実装のためコメントのみ）
  signInWithEmailAndPassword(auth, email, password)
     .then((userCredential: UserCredential) => {
       navigate('/home');
     })
     .catch((error) => {
       console.error(error);
     });
  };

  return (
    <div>
      <h2>ログイン</h2>
      <button onClick={handleGoogleSignIn}>Googleでログイン</button>
      <form onSubmit={handleEmailLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}

export default Login;

