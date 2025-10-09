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
    {
      urls: 'turn:openrelay.metered.ca:443',
      username: 'openrelayproject',
      credential: 'openrelayproject',
    },
  ],
};

const serializeSdp = (description: RTCSessionDescriptionInit): string => {
  return JSON.stringify({
    type: description.type,
    sdp: description.sdp,
  });
};

const deserializeSdp = (sdpString: string): RTCSessionDescriptionInit => {
  if (!sdpString || typeof sdpString !== 'string') {
    throw new Error('Invalid SDP string: ' + sdpString);
  }
  try {
    const parsed = JSON.parse(sdpString);
    if (!parsed.type || !['offer', 'answer', 'pranswer', 'rollback'].includes(parsed.type)) {
      throw new Error(`Invalid SDP type: ${parsed.type}`);
    }
    if (!parsed.sdp) {
      throw new Error('SDP content is missing');
    }
    return {
      type: parsed.type as RTCSdpType,
      sdp: parsed.sdp,
    };
  } catch (error) {
    console.error("Error deserializing SDP:", error);
    throw error;
  }
};

const serializeIceCandidate = (candidate: RTCIceCandidate): string => {
  return JSON.stringify({
    candidate: candidate.candidate,
    sdpMid: candidate.sdpMid,
    sdpMLineIndex: candidate.sdpMLineIndex,
    usernameFragment: candidate.usernameFragment,
  });
};

const deserializeIceCandidate = (candidateString: string): RTCIceCandidateInit => {
  if (!candidateString || typeof candidateString !== 'string') {
    throw new Error('Invalid ICE candidate string: ' + candidateString);
  }
  try {
    const parsed = JSON.parse(candidateString);
    if (!parsed.candidate) {
      throw new Error('ICE candidate content is missing');
    }
    return {
      candidate: parsed.candidate,
      sdpMid: parsed.sdpMid,
      sdpMLineIndex: parsed.sdpMLineIndex,
      usernameFragment: parsed.usernameFragment,
    };
  } catch (error) {
    console.error("Error deserializing ICE candidate:", error);
    throw error;
  }
};

const startLocalStream = async (): Promise<MediaStream> => {
  try {
    if (localStream && localStream.active) {
      return localStream;
    }

    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
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
    console.error("Target user ID is undefined");
    return;
  }

  if (peerConnection) {
    closeConnection();
  }

  peerConnection = new RTCPeerConnection(ICE_SERVERS);
  remoteStream = new MediaStream();
  onRemoteStreamCallback = onStreamReceived;

  peerConnection.ontrack = (event) => {
    remoteStream!.addTrack(event.track);
    if (onRemoteStreamCallback) {
        onRemoteStreamCallback(remoteStream);
    }
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const serializedCandidate = serializeIceCandidate(event.candidate);
      signalrService.invoke('SendIceCandidate', targetUserId, serializedCandidate).catch(error => {
        console.error("Error sending ICE candidate:", error);
      });
    }
  };

  peerConnection.onconnectionstatechange = () => {
    console.log("Connection state:", peerConnection?.connectionState);
    if (peerConnection?.connectionState === 'failed') {
      peerConnection?.restartIce();
    }
  };

  peerConnection.oniceconnectionstatechange = () => {
    console.log("ICE connection state:", peerConnection?.iceConnectionState);
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      peerConnection!.addTrack(track, localStream!);
    });
  } else {
    console.warn("No local stream available when creating peer connection");
  }
};

const createOffer = async (targetUserId: string) => {
  if (!peerConnection) {
    return;
  }
  if (!targetUserId) {
    return;
  }
  try {
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    const serializedOffer = serializeSdp(offer);
    await signalrService.invoke('SendOffer', targetUserId, serializedOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

const handleReceivedOffer = async (callerId: string, serializedOffer: string) => {
  if (!peerConnection) {
    return;
  }
  if (!callerId || !serializedOffer) {
    return;
  }
  try {
    const offer = deserializeSdp(serializedOffer);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    const serializedAnswer = serializeSdp(answer);
    await signalrService.invoke('SendAnswer', callerId, serializedAnswer);
    await processIceCandidateQueue();
  } catch (error) {
    console.error("Error handling received offer:", error);
  }
};

const handleReceivedAnswer = async (serializedAnswer: string) => {
  if (!peerConnection) {
    return;
  }
  if (!serializedAnswer) {
    return;
  }
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
  if (!peerConnection || !peerConnection.remoteDescription) {
    return;
  }

  while (iceCandidateQueue.length > 0) {
    const candidate = iceCandidateQueue.shift()!;
    try {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding queued ICE candidate:", error);
    }
  }
};

const initializeSignaling = (createPeerConnectionForOffer: (callerId: string) => Promise<void>) => {
  signalrService.on('ReceiveOffer', async (callerId: string, serializedOffer: string) => {
    await createPeerConnectionForOffer(callerId);
    await handleReceivedOffer(callerId, serializedOffer);
  });
  signalrService.on('ReceiveAnswer', handleReceivedAnswer);
  signalrService.on('ReceiveIceCandidate', handleReceivedIceCandidate);
};

const closeConnection = () => {
  if (peerConnection) {
    peerConnection.ontrack = null;
    peerConnection.onicecandidate = null;
    peerConnection.onconnectionstatechange = null;
    peerConnection.oniceconnectionstatechange = null;

    peerConnection.getTransceivers().forEach(transceiver => {
      transceiver.stop();
    });

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
    localStream.getAudioTracks().forEach(track => {
      track.enabled = enabled;
    });
  }
};

const toggleVideo = (enabled: boolean) => {
  if (localStream) {
    localStream.getVideoTracks().forEach(track => {
      track.enabled = enabled;
    });
  }
};

export const webRtcService = {
  startLocalStream,
  createPeerConnection,
  createOffer,
  handleReceivedOffer,
  handleReceivedAnswer,
  handleReceivedIceCandidate,
  initializeSignaling,
  closeConnection,
  toggleAudio,
  toggleVideo,
};