import React, { useState } from 'react';
import './SelectTeam.css';

const teams = [
  {name: '読売ジャイアンツ', logo: '読売ジャイアンツ.png' },
  {name: '中日ドラゴンズ', logo: '中日ドラゴンズ.png' },
  {name: '阪神タイガーズ', logo: '阪神タイガーズ.png' },
  {name: '東京ヤクルトスワローズ', logo: '東京ヤクルトスワローズ.png' },
  {name: '広島東洋カープ', logo: '広島東洋カープ.png' },
  {name: '横浜DeNAベイスターズ', logo: '横浜DeNAベイスターズ.png' },
  {name: 'ソフトバンクホークス', logo: 'ソフトバンクホークス.png' },
  {name: '千葉ロッテマリーンズ', logo: '千葉ロッテマリーンズ.png' },
  {name: 'オリックスバファローズ', logo: 'オリックスバファローズ.png' },
  {name: '西武ライオンズ', logo: '西武ライオンズ.png' },
  {name: '日本ハムファイターズ', logo: '日本ハムファイターズ.png' },
  {name: '東北楽天イーグルス', logo: '東北楽天イーグルス.png' },
];

const SelectTeam: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string>('');

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    alert(`You selected ${team}`);
    // ここでFirebaseに選択したチームを保存するロジックを追加できます
  };

  return (
    <div className="select-team">
      <h2>Select Your Favorite Team</h2>
      <div className="team-logos">
        {teams.map((team) => (
          <div key={team.name} className={`team-logo ${selectedTeam === team.name ? 'selected' : ''}`} onClick={() => handleTeamSelect(team.name)}>
            <img src={team.logo} alt={team.name} />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTeam;