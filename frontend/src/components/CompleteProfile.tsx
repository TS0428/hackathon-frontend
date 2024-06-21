import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'; // CSSファイルのインポート

interface LocationState {
  idToken: string;
}

const CompleteProfile: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [id, setID] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [usernameError, setUsernameError] = useState<string>('');
  const [idError, setIDError] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();
  const { idToken } = location.state as LocationState;

  const teams = [
    { name: '読売ジャイアンツ', logo: '/assets/giants.png' },
    { name: '阪神タイガース', logo: '/assets/tigers.png' },
    { name: '中日ドラゴンズ', logo: '/assets/dragons.png' },
    { name: '広島東洋カープ', logo: '/assets/carp.png' },
    { name: '東京ヤクルトスワローズ', logo: '/assets/swallows.png' },
    { name: '横浜DENAベイスターズ', logo: '/assets/baystars.png' },
    { name: 'ソフトバンクホークス', logo: '/assets/hawks.png' },
    { name: 'オリックスバファローズ', logo: '/assets/orix.png' },
    { name: '千葉ロッテマリーンズ', logo: '/assets/marins.png' },
    { name: '東北楽天イーグルス', logo: '/assets/eagles.png' },
    { name: '西武ライオンズ', logo: '/assets/lions.png' },
    { name: '北海道日本ハムファイターズ', logo: '/assets/fighters.png' },
  ];

  const handleProfileCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError('');
    setIDError('');

    if (username.length < 3) {
      setUsernameError('ユーザー名は3文字以上である必要があります');
      return;
    }

    if (id.length < 3) {
      setIDError('IDは3文字以上である必要があります');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/complete-profile', {
        idToken,
        username,
        id,
        team_id: selectedTeam,
      });
      if (response.status === 200) {
        navigate('/home');
      } else {
        console.error('Profile completion failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during profile completion:', error);
    }
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName);
  };

  return (
    <div className="complete-profile-container">
      <form onSubmit={handleProfileCompletion} className="profile-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="ユーザー名を入力してください"
          className="username-input"
        />
        {usernameError && <p className="error-message">{usernameError}</p>}
        
        <input
          type="text"
          value={id}
          onChange={(e) => setID(e.target.value)}
          placeholder="IDを入力してください"
          className="id-input"
        />
        {idError && <p className="error-message">{idError}</p>}
        
        <div>
          <h3>お気に入り球団を選択してください</h3>
          <div className="team-selection">
            {teams.map((team, index) => (
              <div
                key={index}
                onClick={() => handleTeamClick(team.name)}
                className={`team-logo ${selectedTeam === team.name ? 'selected' : ''}`}
              >
                <img src={team.logo} alt={team.name} className="team-logo-image" />
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="submit-button">プロフィールを完成させる</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
