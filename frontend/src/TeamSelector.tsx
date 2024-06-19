import React from 'react';
import './TeamSelector.css';

interface TeamSelectorProps {
  onTeamSelect: (team: string) => void;
}

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

const TeamSelector: React.FC<TeamSelectorProps> = ({ onTeamSelect }) => {
  return (
    <div className="team-selector">
      <h2>好きなチームを選んでください</h2>
      <div className="teams">
        {teams.map(team => (
          <div key={team.name} className="team" onClick={() => onTeamSelect(team.name)}>
            <img src={team.logo} alt={team.name} className="team-logo" />
            <p>{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSelector;
