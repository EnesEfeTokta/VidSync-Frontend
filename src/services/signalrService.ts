import * as signalR from "@microsoft/signalr";
import { HubConnectionState } from "@microsoft/signalr";

class SignalRService {
  private connection: signalR.HubConnection;
  private token: string | null = null;

  constructor() {
    const hubUrl = `${import.meta.env.VITE_API_URL}/communicationhub`;
    
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        accessTokenFactory: () => this.token || ""
      })
      .withAutomaticReconnect()
      .build();
  }

  public async connect(authToken: string) {
    if (this.connection.state === HubConnectionState.Connected) {
      console.log("SignalR already connected.");
      return;
    }
    this.token = authToken;
    try {
      await this.connection.start();
      console.log("SignalR Connected.");
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
      throw err;
    }
  }

  public async disconnect() {
    if (this.connection.state !== HubConnectionState.Connected) {
      return;
    }
    try {
      await this.connection.stop();
      console.log("SignalR Disconnected.");
    } catch (err) {
      console.error("SignalR Disconnection Error: ", err);
    }
  }

  public on(eventName: string, callback: (...args: any[]) => void) {
    this.connection.on(eventName, callback);
  }

  public off(eventName: string) {
    this.connection.off(eventName);
  }

  public async invoke(methodName: string, ...args: any[]) {
    if (this.connection.state !== HubConnectionState.Connected) {
      console.error(`Cannot invoke '${methodName}'. Connection is not in the 'Connected' state.`);
      throw new Error("SignalR connection is not active.");
    }
    try {
      return await this.connection.invoke(methodName, ...args);
    } catch (err) {
      console.error(`Error invoking ${methodName}: `, err);
      throw err;
    }
  }

  public isConnected(): boolean {
    return this.connection.state === HubConnectionState.Connected;
  }
}

export const signalrService = new SignalRService();