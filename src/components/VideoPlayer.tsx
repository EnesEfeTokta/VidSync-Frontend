import React from 'react';
import type { VideoPlayerProps } from '../types/VideoPlayerProps';

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
          <h3>{remoteUserFirstName || 'Other User'}</h3>
          <video ref={remoteVideoRef} autoPlay playsInline />
        </div>
      </div>
      {isCallActive && (
        <div className="controls-container">
          <button onClick={onToggleAudio}>
            {isAudioEnabled ? 'Mute' : 'Turn Up the Volume'}
          </button>
          <button onClick={onToggleVideo}>
            {isVideoEnabled ? 'Turn off the camera' : 'Turn on the camera'}
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