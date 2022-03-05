import io from "socket.io-client";

let socket;

export const initiateSocket = (room, token) => {
  socket = io("wss://gungnir.sowat.dev", {
    origin: "https://gungnir.sowat.dev",
    query: {
      roomName: room,
      token
    },
    transports: ["websocket"]
  });
};

export const joinRoom = (payload) => {
  if (socket) socket.emit("join room", payload);
};

export const emitAllChat = (payload) => {
  if (socket) socket.emit("retrieve message", payload);
};

export const subscribeToAllChat = (cb) => {
  if (socket) socket.on("retrieve message", (msg) => cb(null, msg));
};
