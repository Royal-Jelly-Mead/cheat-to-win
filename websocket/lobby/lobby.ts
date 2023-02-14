// import socket type
import { Server, Socket } from "socket.io";
import { randomUUID } from "crypto";

class Lobby {

    private room: any; // make this type server
    private roomId : string;
    private roomCode: string;
    private playerIds: string[];
    private isMatchOnGoing: boolean;

    constructor(room: any, roomName: string, playerIds: string[]) {
        this.room = room;
        this.roomId = roomName;
        this.roomCode = randomUUID();
        this.playerIds = playerIds; // TODO: Ask max player room size
    }

    public getRoomCode() : string {
        return this.roomCode;
    }

    public addPlayer(playerId: string, roomId: string) : void {
        
    }

    public removePlayer(playerId: string, roomId: string) : void {

    }

    public destroyRoom(roomCode: string) : void {

    }

    public startMatch() : void {

    }

}

export default Lobby;
