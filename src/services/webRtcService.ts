import { signalrService } from './signalrService';

let peerConnection: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;
let onRemoteStreamCallback: ((stream: MediaStream) => void) | null = null;
const iceCandidateQueue: RTCIceCandidateInit[] = [];

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    {
      urls: 'turn:openrelay.metered.ca:80',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

const serializeSdp = (description: RTCSessionDescriptionInit): string => {
  return JSON.stringify({ type: description.type, sdp: description.sdp });
};

const deserializeSdp = (sdpString: string): RTCSessionDescriptionInit => {
  const parsed = JSON.parse(sdpString);
  return { type: parsed.type as RTCSdpType, sdp: parsed.sdp };
};

const serializeIceCandidate = (candidate: RTCIceCandidate): string => {
  return JSON.stringify(candidate.toJSON());
};

const deserializeIceCandidate = (candidateString: string): RTCIceCandidateInit => {
  return JSON.parse(candidateString);
};

const startLocalStream = async (): Promise<MediaStream> => {
  try {
    if (localStream && localStream.active) {
      return localStream;
    }
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    return localStream;
  } catch (error) {
    console.error("Error accessing media devices:", error);
    if (error instanceof DOMException) {
      if (error.name === "NotAllowedError") {
        throw new Error("Kamera veya mikrofon erişimi reddedildi.");
      } else if (error.name === "NotFoundError") {
        throw new Error("Kamera veya mikrofon bulunamadı.");
      }
    }
    throw error;
  }
};

const createPeerConnection = (onStreamReceived: (stream: MediaStream) => void, targetUserId: string) => {
  if (!targetUserId) {
    console.error("Target user ID is undefined for peer connection.");
    return;
  }
  if (peerConnection) {
    closeConnection();
  }

  peerConnection = new RTCPeerConnection(ICE_SERVERS);
  remoteStream = new MediaStream();
  onRemoteStreamCallback = onStreamReceived;

  peerConnection.ontrack = (event) => {
    event.streams[0].getTracks().forEach(track => {
      remoteStream!.addTrack(track);
    });
    if (onRemoteStreamCallback && remoteStream) {
      onRemoteStreamCallback(remoteStream);
    }
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const serializedCandidate = serializeIceCandidate(event.candidate);
      signalrService.invoke('sendIceCandidate', targetUserId, serializedCandidate).catch(error => {
        console.error("Error sending ICE candidate:", error);
      });
    }
  };

  peerConnection.onconnectionstatechange = () => {
    console.log("Connection state changed:", peerConnection?.connectionState);
    if (peerConnection?.connectionState === 'failed') {
      peerConnection?.restartIce();
    }
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      peerConnection!.addTrack(track, localStream!);
    });
  }
};

const createOffer = async (targetUserId: string) => {
  if (!peerConnection || !targetUserId) return;
  try {
    const offer = await peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await peerConnection.setLocalDescription(offer);
    const serializedOffer = serializeSdp(offer);
    await signalrService.invoke('sendOffer', targetUserId, serializedOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

const handleReceivedOffer = async (callerId: string, serializedOffer: string) => {
  if (!peerConnection || !callerId || !serializedOffer) return;
  try {
    const offer = deserializeSdp(serializedOffer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    const serializedAnswer = serializeSdp(answer);
    await signalrService.invoke('sendAnswer', callerId, serializedAnswer);
    await processIceCandidateQueue();
  } catch (error) {
    console.error("Error handling received offer:", error);
  }
};

const handleReceivedAnswer = async (serializedAnswer: string) => {
  if (!peerConnection || !serializedAnswer) return;
  try {
    const answer = deserializeSdp(serializedAnswer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    await processIceCandidateQueue();
  } catch (error) {
    console.error("Error handling received answer:", error);
  }
};

const handleReceivedIceCandidate = async (candidateString: string) => {
  if (!peerConnection || !peerConnection.remoteDescription) {
    iceCandidateQueue.push(deserializeIceCandidate(candidateString));
    return;
  }
  try {
    const candidate = deserializeIceCandidate(candidateString);
    await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
  } catch (error) {
    console.error("Error adding ICE candidate:", error);
  }
};

const processIceCandidateQueue = async () => {
  if (!peerConnection || !peerConnection.remoteDescription) return;
  while (iceCandidateQueue.length > 0) {
    const candidate = iceCandidateQueue.shift()!;
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding queued ICE candidate:", error);
    }
  }
};

const cleanupSignaling = () => {
  signalrService.off('ReceiveOffer');
  signalrService.off('ReceiveAnswer');
  signalrService.off('ReceiveIceCandidate');
  console.log("WebRTC signaling listeners removed.");
};

const initializeSignaling = (createPeerConnectionForOffer: (callerId: string) => Promise<void>) => {
  cleanupSignaling();
  signalrService.on('ReceiveOffer', async (callerId: string, serializedOffer: string) => {
    await createPeerConnectionForOffer(callerId);
    await handleReceivedOffer(callerId, serializedOffer);
  });
  signalrService.on('ReceiveAnswer', handleReceivedAnswer);
  signalrService.on('ReceiveIceCandidate', handleReceivedIceCandidate);
  console.log("WebRTC signaling listeners initialized.");
};

const closeConnection = () => {
  if (peerConnection) {
    peerConnection.ontrack = null;
    peerConnection.onicecandidate = null;
    peerConnection.onconnectionstatechange = null;
    peerConnection.getTransceivers().forEach(transceiver => transceiver.stop());
    peerConnection.close();
    peerConnection = null;
  }
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
  }
  if (remoteStream) {
    remoteStream.getTracks().forEach(track => track.stop());
    remoteStream = null;
  }
  onRemoteStreamCallback = null;
  iceCandidateQueue.length = 0;
};

const toggleAudio = (enabled: boolean) => {
  if (localStream) {
    localStream.getAudioTracks().forEach(track => { track.enabled = enabled; });
  }
};

const toggleVideo = (enabled: boolean) => {
  if (localStream) {
    localStream.getVideoTracks().forEach(track => { track.enabled = enabled; });
  }
};

export const webRtcService = {
  startLocalStream,
  createPeerConnection,
  createOffer,
  initializeSignaling,
  cleanupSignaling,
  closeConnection,
  toggleAudio,
  toggleVideo,
};