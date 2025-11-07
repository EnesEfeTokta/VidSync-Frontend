import axios  from "axios";
import type { CreateRoomPayload } from "../types/CreateRoomPayload";
import type { Room } from "../types/Room";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const createRoom = async (payload: CreateRoomPayload): Promise<Room> => {
    const toeken = localStorage.getItem("authToken");
    
    if (!toeken) {
        throw new Error("No auth token found");
    }

    const config = {
        headers: {
            Authorization: `Bearer ${toeken}`,
        },
    };

    try {
        const response = await axios.post<Room>(`${API_URL}/rooms`, payload, config);
        return response.data;
    } catch (error) {
        console.error("Error creating room:", error);
        throw error;
    }
};

export const sendMeetingSummary = async (roomId: string, token: string): Promise<void> => {
  if (!API_URL) {
    throw new Error("API base URL is not configured in environment variables (VITE_API_URL).");
  }

  const response = await fetch(`${API_URL}/rooms/${roomId}/summarize`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server error: ${response.status} ${response.statusText}`);
    } catch {
      throw new Error(`Summary could not be sent. Server status: ${response.status} ${response.statusText}`);
    }
  }
};

export const roomService = {
    createRoom,
    sendMeetingSummary,
};