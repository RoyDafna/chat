const express = require("express");
const http = require("http");
const socket = require("socket.io");

const PORT = 3000;

const app = express();
const server = http.createServer(app);

let connectedUsers = [];

const io = socket(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("connect", (data) => {
    console.log(`CONNECTED ${data}`);
  });

  socket.on("userConnected", (username) => {
    connectedUsers.push(username);
    io.emit("userConnected", connectedUsers);
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", (data) => {
    console.log(`DISCONNECTED ${data}`);
  });

  socket.on("userDisconnected", (socketID) => {
    console.log(socketID);
    connectedUsers = connectedUsers.filter((user) => {
      console.log(JSON.stringify(user));  
      user.id != socketID;
    });
  });
});

server.listen(PORT, () => console.log(PORT));
