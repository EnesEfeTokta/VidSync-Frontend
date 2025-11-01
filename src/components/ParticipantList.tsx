// src/components/ParticipantList/ParticipantList.tsx

import React from 'react';
import { FaPhone } from 'react-icons/fa';// CSS dosyasını import et

interface Participant {
  id: string;
  firstName: string;
}

interface ParticipantListProps {
  participants: Participant[];
  currentUserId: string | undefined;
  isCallActive: boolean;
  onCallUser: (targetUserId: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  currentUserId,
  isCallActive,
  onCallUser,
}) => {
  return (
    <div className="participant-list">
      {participants.map((p) => (
        <div className="participant-item" key={p.id}>
          <div className="participant-avatar">
            {p.firstName.charAt(0).toUpperCase()}
          </div>
          <div className="participant-info">
            <span className="participant-name">{p.firstName}</span>
            {p.id === currentUserId && <span className="participant-tag">Siz</span>}
          </div>
          {p.id !== currentUserId && (
            <button
              className="call-button"
              onClick={() => onCallUser(p.id)}
              disabled={isCallActive}
              title={isCallActive ? "Zaten bir görüşmedesiniz" : `${p.firstName} kişisini ara`}
            >
              <FaPhone />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ParticipantList;