import React, { useState } from 'react';
import axios from 'axios';
import { createUserWithEmailAndPassword, Auth } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const navigate = useNavigate();

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

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await axios.post('http://localhost:8080/signup', {
        username: username,
        email: email,
        password: password,
        team: selectedTeam,
      });
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName);
  };

  return (
    <div>
      <form onSubmit={handleEmailSignup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Emailを入力してください"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Passwordを入力してください"
        />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usernameを入力してください"
        />
        <div>
          <h3>好きなチームを選択してください</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {teams.map((team, index) => (
              <div
                key={index}
                onClick={() => handleTeamClick(team.name)}
                style={{ margin: '10px', cursor: 'pointer', border: selectedTeam === team.name ? '2px solid blue' : 'none' }}
              >
                <img src={team.logo} alt={team.name} style={{ width: '150px', height: '150px' }} />
              </div>
            ))}
          </div>
        </div>
        <button type="submit">新規登録</button>
      </form>
    </div>
  );
};

export default SignupForm;