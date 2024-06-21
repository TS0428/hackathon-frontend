import React from 'react';
import './Castlist.css'; // 正しいパスを指定

interface Cast {
  id: number;
  content: string;
  mediaUrl?: string;
  likes: number;
  replies: Cast[];
  user: {
    displayName: string;
    favoriteTeam: string;
  };
}

interface CastListProps {
  casts: Cast[];
  onReply: (id: number) => void;
  onLike: (id: number) => void;
}

const CastList: React.FC<CastListProps> = ({ casts, onReply, onLike }) => {
  return (
    <div className="cast-list">
      {casts.map(cast => (
        <div key={cast.id} className="cast-item">
          <div className="cast-user">
            {cast.user.displayName} ({cast.user.favoriteTeam})
          </div>
          <div className="cast-content">{cast.content}</div>
          <div className="cast-likes">
            Likes: {cast.likes}
            <button onClick={() => onLike(cast.id)}>Like</button>
            <button onClick={() => onReply(cast.id)}>Reply</button>
          </div>
          {/* 必要に応じて他の情報も表示 */}
        </div>
      ))}
    </div>
  );
};

export default CastList;
