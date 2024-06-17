import React, { useState } from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, createUserWithEmailAndPassword, User } from 'firebase/auth';
import SelectTeam from './SelectTeam';
import './App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      alert('Signup successful');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      alert('Login successful');
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUser(auth.currentUser);
      alert('Google login successful');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="App">
      <h1></h1>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
      {user && <SelectTeam />}
    </div>
  );
};

export default App;
