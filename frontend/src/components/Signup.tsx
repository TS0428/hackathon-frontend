import React from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleSignupButton from './GoogleSignupButton';
import SignupForm from './SignupForm';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>新規登録</h2>
      <GoogleSignupButton />
      <SignupForm />
    </div>
  );
};

export default Signup;