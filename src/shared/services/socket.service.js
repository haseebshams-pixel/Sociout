import { io } from "socket.io-client";
let socket = io.connect("http://localhost:8000", { transports: ["websocket"] });
const initSocket = () => {
  socket = socket.on("connect", () => {
    console.log("socket connected successfully");
  });
};
export { socket, initSocket };
