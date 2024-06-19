import React, { useState } from 'react';
import TeamSelector from './TeamSelector';

interface RegistrationFormProps {
  user: any;
  onComplete: (favoriteTeam: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ user, onComplete }) => {
  const [favoriteTeam, setFavoriteTeam] = useState<string | null>(null);

  const handleTeamSelect = (team: string) => {
    setFavoriteTeam(team);
  };

  const handleSubmit = () => {
    if (favoriteTeam) {
      onComplete(favoriteTeam);
    } else {
      alert('好きなチームを選んでください');
    }
  };

  return (
    <div>
      <h2>新規登録</h2>
      <p>ようこそ、{user.displayName}</p>
      <TeamSelector onTeamSelect={handleTeamSelect} />
      <button onClick={handleSubmit}>登録</button>
    </div>
  );
};

export default RegistrationForm;
