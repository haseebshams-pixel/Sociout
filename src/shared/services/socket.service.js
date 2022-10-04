import { io } from "socket.io-client";
let socket = io.connect("https://sociout-dev.vercel.app", {
  transports: ["websocket"],
});
const initSocket = () => {
  socket = socket.on("connect", () => {
    console.log("socket connected successfully");
  });
};
export { socket, initSocket };
