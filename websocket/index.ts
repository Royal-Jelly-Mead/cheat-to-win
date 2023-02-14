import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
// import gameManager

const app = express();
app.set("port", process.env.PORT || 8080);

let http = require("http").Server(app);
let io = require("socket.io")(http);

const onConnection = (socket: any) => {
    //socket.on("general:createGameLobby" , createGameLobby)
    //socket.on("general:connectToGameLobby", connectToGameLobby)
    //socket.on("general:disconnectFromGameLobby", disconnectFromGameLobby)
    //socket.on("gameManager:updatePlayerState", updatePlayerState)
    //socket.on("gameManager:updateWorldState", updateWorldState)
    //socket.on("gameManager:updateGameState", updateGameState)
}

io.on("connection", onConnection);

const server = http.listen(8080, function() {
    console.log("Listening here!");
})