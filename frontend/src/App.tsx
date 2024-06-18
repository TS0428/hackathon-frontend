// src/App.tsx
import React from 'react';
import './App.css';
import LoginForm from './LoginForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My App</h1>
      </header>
      <main>
        <LoginForm />
      </main>
    </div>
  );
}

export default App;
