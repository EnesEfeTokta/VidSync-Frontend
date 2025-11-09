export interface VideoPlayerProps {
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