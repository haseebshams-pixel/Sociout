import React, { useState } from "react";
import "./style.css";
import { socket } from "../../../shared/services/socket.service";

let data = [
  {
    sender: "6306207f59045723f3df4995",
    receiver: "630620a859045723f3df49a9",
    text: "Hello",
    conversationId: "6306403e06edd90c6422d0f7",
  },
  {
    receiver: "6306207f59045723f3df4995",
    sender: "630620a859045723f3df49a9",
    text: "hi!",
    conversationId: "6306403e06edd90c6422d0f7",
  },
  {
    sender: "6306207f59045723f3df4995",
    receiver: "630620a859045723f3df49a9",
    text: "how are you",
    conversationId: "6306403e06edd90c6422d0f7",
  },
];

const Message = () => {
  const [message, setMessage] = useState("");
  const handleMessage = () => {
    socket.emit("send-message", { message: message });
  };
  return (
    <>
      <div className="allmessages-container"></div>
      <div className="position-relative">
        <input
          type={"text"}
          className="w-100 message-input-field rounded"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          placeholder="Type a message"
        />
        <img
          src={require("../../../assets/svg/send.svg").default}
          className="message-send-icon"
          width="22"
          alt="icon"
          onClick={handleMessage}
        />
      </div>
    </>
  );
};

export default Message;
