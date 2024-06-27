import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Firebaseの設定ファイルをインポート
import { createUserWithEmailAndPassword } from 'firebase/auth';
import '../App.css'; // CSSファイルのインポート

export const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
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
      // Firebaseでユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザー情報をサーバーにポスト
      await axios.post('http://localhost:8080/user', {
        user_name: userName,
        email: email,
      });

      // ユーザー情報を取得
      const res = await axios.get(`http://localhost:8080/user/select?user_name=${userName}&email=${email}`);
      const userId = res.data.id;

      // ユーザーIDとユーザー名をlocalStorageに保存
      localStorage.setItem('user_id', userId.toString());
      localStorage.setItem('user_name', userName);

      // 登録完了後の処理
      navigate('/home');
    } catch (error: any) {
      console.error('Error during registration:', error);
      if (error.code === 'auth/email-already-in-use') {
        setEmailError('このメールアドレスは既に使用されています');
      } else {
        setEmailError('登録中にエラーが発生しました');
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>新規登録</h1>
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
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Usernameを入力してください"
          className="input-field"
        />
        <button type="submit" className="submit-button">新規登録</button>
      </form>
    </div>
  );
};

export default Signup;
