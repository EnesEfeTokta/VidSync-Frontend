import React from 'react';
import { FaPhone } from 'react-icons/fa';

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
              title={isCallActive ? "You're already in a meeting" : `${p.firstName} call the person`}
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