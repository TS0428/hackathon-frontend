// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Start from './components/Start';
import Login from './components/Login';
import Signup from './components/Signup';
import CompleteProfile from './components/CompleteProfile';
import Home from './components/Home/Home';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <Link to="/">Start</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/home">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



