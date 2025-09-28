import { signalrService } from './signalrService';

let peerConnection: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let onRemoteStreamCallback: ((stream: MediaStream) => void) | null = null;

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

const startLocalStream = async (): Promise<MediaStream> => {
  try {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    return localStream;
  } catch (error) {
    console.error("Error accessing media devices.", error);
    throw error;
  }
};

const createPeerConnection = (onStreamReceived: (stream: MediaStream) => void) => {
  if (peerConnection) {
    closeConnection();
  }

  peerConnection = new RTCPeerConnection(ICE_SERVERS);
  onRemoteStreamCallback = onStreamReceived;

  peerConnection.ontrack = (event) => {
    if (onRemoteStreamCallback) {
      onRemoteStreamCallback(event.streams[0]);
    }
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      peerConnection!.addTrack(track, localStream!);
    });
  }
};

const createOffer = async (targetUserId: string) => {
  if (!peerConnection) return;

  try {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signalrService.invoke('SendOffer', targetUserId, offer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

const handleReceivedOffer = async (callerId: string, offer: RTCSessionDescriptionInit) => {
  if (!peerConnection) {
    console.error("PeerConnection not initialized. Cannot handle offer.");
    return;
  }

  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    signalrService.invoke('SendAnswer', callerId, answer);
  } catch (error) {
    console.error("Error handling received offer:", error);
  }
};

const handleReceivedAnswer = async (answer: RTCSessionDescriptionInit) => {
  if (!peerConnection) return;
  try {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  } catch (error) {
    console.error("Error handling received answer:", error);
  }
};

const handleReceivedIceCandidate = async (candidate: RTCIceCandidateInit) => {
  if (!peerConnection) return;
  try {
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.error("Error adding received ICE candidate:", error);
  }
};

const initializeSignaling = (
  createPeerConnectionForOffer: () => void
) => {
  signalrService.on('ReceiveOffer', async (callerId: string, offer: RTCSessionDescriptionInit) => {
    createPeerConnectionForOffer();
    await handleReceivedOffer(callerId, offer);
  });

  signalrService.on('ReceiveAnswer', handleReceivedAnswer);
  signalrService.on('ReceiveIceCandidate', handleReceivedIceCandidate);
};

const closeConnection = () => {
  if (peerConnection) {
    peerConnection.ontrack = null;
    peerConnection.onicecandidate = null;
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  onRemoteStreamCallback = null;
};

export const webRtcService = {
  startLocalStream,
  createPeerConnection,
  createOffer,
  initializeSignaling,
  closeConnection,
};