import React from 'react';

const ReplyList: React.FC<{ replies: any[] }> = ({ replies }) => {
  return (
    <div>
      <h3>リプライ一覧</h3>
      <ul>
        {replies.map(reply => (
          <li key={reply.id}>
            {reply.user_name}: {reply.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReplyList;
