// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Start from './components/Start';
import Login from './components/Login';
import Signup from './components/Signup';
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
            <Link to="/cast">Home</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cast" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



