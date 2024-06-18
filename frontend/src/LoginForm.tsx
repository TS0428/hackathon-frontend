import React, { useState } from "react";
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import { fireAuth, googleProvider } from "./firebase";
import SelectTeam from "./SelectTeam";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const handleSignup = async (): Promise<void>  => {
    try {
      await createUserWithEmailAndPassword(fireAuth, email, password);
      setUser(fireAuth.currentUser);
      alert('Signup successful');
      await fetch('http://localhost:8080/login', {
	method: 'POST',
	headers: {
	  'Content-Type': 'application/json',
	},
        body: JSON.stringify({ user_id: fireAuth.currentUser?.uid }),
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogin = async (): Promise<void> => {
    try {
      await signInWithEmailAndPassword(fireAuth, email, password);
      setUser(fireAuth.currentUser);
      alert('Login successful');
      await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: fireAuth.currentUser?.uid }),
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await signInWithPopup(fireAuth, googleProvider);
      setUser(fireAuth.currentUser);
      alert('Google login successful');
      await fetch('http://localhost:8080/login/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: fireAuth.currentUser?.uid }),
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

    return (
    <div className="App">
      <h1>Welcome to the App</h1>
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

export default LoginForm;
