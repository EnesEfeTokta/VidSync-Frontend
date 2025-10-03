import * as signalR from "@microsoft/signalr";

const HUB_URL = `${import.meta.env.VITE_API_URL}/communicationhub`;

let connection: signalR.HubConnection | null = null;

const connect = async () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found");
  }

  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    console.log("SignalR already connected");
    return connection;
  }

  const encodedToken = encodeURIComponent(token);
  const url = `${HUB_URL}?access_token=${encodedToken}`;

  connection = new signalR.HubConnectionBuilder()
    .withUrl(url, { withCredentials: false })
    .withAutomaticReconnect({
      nextRetryDelayInMilliseconds: (retryContext) =>
        Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000),
    })
    .configureLogging(signalR.LogLevel.Information)
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
  if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
    await connect();
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

  connection.on(eventName, (...args) => {
    callback(...args);
  });
};

const disconnect = () => {
  if (connection) {
    connection.stop();
    connection = null;
    console.log("SignalR Disconnected.");
  }
};

export const signalrService = {
  connect,
  invoke,
  on,
  disconnect,
};