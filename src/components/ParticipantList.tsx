import React from 'react';

interface Participant {
  id: string;
  firstName: string;
}

interface ParticipantListProps {
  participants: Participant[];
  currentUserId?: string;
  isCallActive: boolean;
  onCallUser: (userId: string) => void;
}

const ParticipantList: React.FC<ParticipantListProps> = ({
  participants,
  currentUserId,
  isCallActive,
  onCallUser,
}) => {
  return (
    <div className="participants-container">
      <h2>Katılımcılar</h2>
      <ul>
        {participants.map((participant) => (
          <li key={participant.id}>
            {participant.firstName} {participant.id === currentUserId && "(Siz)"}
            {participant.id !== currentUserId && (
              <button onClick={() => onCallUser(participant.id)} disabled={isCallActive}>
                Ara
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;