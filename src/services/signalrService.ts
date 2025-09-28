import * as signalR from "@microsoft/signalr";

const HUB_URL = `${import.meta.env.VITE_API_URL}/communicationhub`;

let connection: signalR.HubConnection | null = null;

const connect = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        throw new Error("No auth token found");
    }

    if (connection && connection.state === signalR.HubConnectionState.Connected) {
        return connection;
    }

    connection = new signalR.HubConnectionBuilder()
        .withUrl(`${HUB_URL}?access_token=${token}`)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log("SignalR Connected.");
        return connection;
    } catch (err) {
        console.error("SignalR Connection Error: ", err);
        throw err;
    }
};

const invoke = async (methodName: string, ...args: any[]) => {
    if (!connection) {
        throw new Error("SignalR connection is not established");
    }

    try {
        return await connection.invoke(methodName, ...args);
    } catch (err) {
        console.error(`Error invoking ${methodName}: `, err);
        throw err;
    }
};


const on = (eventName: string, callback: (...args: any[]) => void) => {
    if (!connection) {
        throw new Error("SignalR connection is not established");
    }

    connection.on(eventName, callback);
};

const disconnect = () => {
  if (connection) {
    connection.stop();
    connection = null;
  }
};

export const signalrService = {
  connect,
  invoke,
  on,
  disconnect,
};