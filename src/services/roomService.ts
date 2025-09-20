import axios  from "axios";
import type { CreateRoomPayload } from "../types/CreateRoomPayload";
import type { Room } from "../types/Room";

const API_URL = "http://localhost:5166/api";

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

export const roomService = {
    createRoom,
};