import { signalrService } from './signalrService';

let peerConnection: RTCPeerConnection | null = null;
let localStream: MediaStream | null = null;
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

// Yardımcı fonksiyonlar (değişiklik yok)
const serializeSdp = (description: RTCSessionDescriptionInit): string => JSON.stringify(description);
const deserializeSdp = (sdpString: string): RTCSessionDescriptionInit => JSON.parse(sdpString);
const serializeIceCandidate = (candidate: RTCIceCandidate): string => JSON.stringify(candidate.toJSON());
const deserializeIceCandidate = (candidateString: string): RTCIceCandidateInit => JSON.parse(candidateString);

// startLocalStream (değişiklik yok)
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

// --- GÜNCELLEME BAŞLANGICI (1/2) ---
// 'ontrack' metodunu daha güvenilir hale getirdik.
const createPeerConnection = (onStreamReceived: (stream: MediaStream) => void, targetUserId: string) => {
  if (!targetUserId) {
    console.error("Target user ID is undefined for peer connection.");
    return;
  }
  if (peerConnection) {
    closeConnection();
  }

  peerConnection = new RTCPeerConnection(ICE_SERVERS);
  onRemoteStreamCallback = onStreamReceived;

  // DÜZELTME: Gelen medya akışını doğrudan event'ten alarak daha güvenilir hale getiriyoruz.
  peerConnection.ontrack = (event) => {
    console.log(`[WEBRTC] Uzak medya izi (track) alındı! Tür: ${event.track.kind}`);
    if (event.streams && event.streams[0]) {
      if (onRemoteStreamCallback) {
        onRemoteStreamCallback(event.streams[0]);
      }
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
    console.log("Connection state changed:", peerConnection?.connectionState);
    if (peerConnection?.connectionState === 'failed') {
      peerConnection?.restartIce();
    }
     if (peerConnection?.connectionState === 'connected') {
        console.log("Peer-to-Peer bağlantısı başarıyla kuruldu!");
    }
  };

  if (localStream) {
    localStream.getTracks().forEach(track => {
      peerConnection!.addTrack(track, localStream!);
    });
  }
};

// createOffer (değişiklik yok)
const createOffer = async (targetUserId: string) => {
  if (!peerConnection || !targetUserId) return;
  try {
    const offer = await peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
    await peerConnection.setLocalDescription(offer);
    const serializedOffer = serializeSdp(offer);
    await signalrService.invoke('SendOffer', targetUserId, serializedOffer);
  } catch (error) {
    console.error("Error creating offer:", error);
  }
};

// handleReceivedOffer (değişiklik yok)
const handleReceivedOffer = async (callerId: string, serializedOffer: string) => {
  if (!peerConnection || !callerId || !serializedOffer) return;
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

// handleReceivedAnswer (değişiklik yok)
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

// handleReceivedIceCandidate (değişiklik yok)
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

// processIceCandidateQueue (değişiklik yok)
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

// cleanupSignaling (değişiklik yok)
const cleanupSignaling = () => {
  signalrService.off('ReceiveOffer');
  signalrService.off('ReceiveAnswer');
  signalrService.off('ReceiveIceCandidate');
  console.log("WebRTC signaling listeners removed.");
};

// --- GÜNCELLEME BAŞLANGICI (2/2) ---
// Hub'daki düzeltmeyle uyumlu hale getiriyoruz.
const initializeSignaling = (createPeerConnectionForOffer: (callerId: string) => Promise<void>) => {
  cleanupSignaling();
  
  signalrService.on('ReceiveOffer', async (callerId: string, serializedOffer: string) => {
    await createPeerConnectionForOffer(callerId);
    await handleReceivedOffer(callerId, serializedOffer);
  });
  
  // DÜZELTME: Sunucudan artık (gönderenId, veri) şeklinde gelecek olan olayları dinliyoruz.
  signalrService.on('ReceiveAnswer', async (answererId: string, serializedAnswer: string) => {
    console.log(`[SIGNALR] ${answererId} kullanıcısından bir cevap (answer) alındı.`);
    await handleReceivedAnswer(serializedAnswer);
  });
  
  signalrService.on('ReceiveIceCandidate', async (senderId: string, candidate: string) => {
    console.log(`[SIGNALR] ${senderId} kullanıcısından bir ICE adayı alındı.`);
    await handleReceivedIceCandidate(candidate);
  });

  console.log("WebRTC signaling listeners initialized.");
};

// closeConnection (remoteStream temizliği kaldırıldı, artık gerekli değil)
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
  onRemoteStreamCallback = null;
  iceCandidateQueue.length = 0;
};

// toggleAudio ve toggleVideo (değişiklik yok)
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