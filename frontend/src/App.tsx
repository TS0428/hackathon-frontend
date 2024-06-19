import React, { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import Confirmation from './Confirmation';

function App() {
  const [user, setUser] = useState<any | null>(null);
  const [favoriteTeam, setFavoriteTeam] = useState<string | null>(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Cast</h1>
      </header>
      <main>
        {!user ? (
          <LoginForm onLogin={(loggedInUser) => setUser(loggedInUser)} />
        ) : favoriteTeam === null ? (
          <RegistrationForm user={user} onComplete={(team) => setFavoriteTeam(team)} />
        ) : (
          <Confirmation favoriteTeam={favoriteTeam} />
        )}
      </main>
    </div>
  );
}

export default App;

