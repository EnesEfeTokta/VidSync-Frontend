import React from 'react';

interface VideoPlayerProps {
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  isCallActive: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  remoteUserFirstName?: string;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
  onHangUp: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  localVideoRef,
  remoteVideoRef,
  isCallActive,
  isAudioEnabled,
  isVideoEnabled,
  remoteUserFirstName,
  onToggleAudio,
  onToggleVideo,
  onHangUp,
}) => {
  return (
    <div className="main-content">
      <div className="videos-container">
        <div className="video-wrapper">
          <h3>Siz</h3>
          <video ref={localVideoRef} autoPlay muted playsInline />
        </div>
        <div className="video-wrapper">
          <h3>{remoteUserFirstName || 'Diğer Kullanıcı'}</h3>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
      {isCallActive && (
        <div className="controls-container">
          <button onClick={onToggleAudio}>
            {isAudioEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
          </button>
          <button onClick={onToggleVideo}>
            {isVideoEnabled ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
          </button>
          <button onClick={onHangUp} style={{ backgroundColor: 'red' }}>
            Aramayı Sonlandır
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;