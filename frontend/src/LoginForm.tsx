import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { fireAuth } from './firebase';

interface LoginFormProps {
  onLogin: (user: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const signInWithGoogle = (): void => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(fireAuth, provider)
      .then((res) => {
        const user = res.user;
        alert('ログインユーザー: ' + user.displayName);
        onLogin(user);
      })
      .catch((err) => {
        const errorMessage = err.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>Googleでログイン</button>
    </div>
  );
};

export default LoginForm;
