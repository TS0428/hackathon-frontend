import React, { useState } from 'react';
import './Confirmation.css';

interface ConfirmationProps {
  favoriteTeam: string;
}

const Confirmation: React.FC<ConfirmationProps> = ({ favoriteTeam }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div>
      <button onClick={() => setShowMessage(true)}>Confirm</button>
        <div className="confirmation-message">
          <p>野球と会話のキャッチボールを楽しみましょう！！</p>
        </div>
    </div>
  );
};

export default Confirmation;

