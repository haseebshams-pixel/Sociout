import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./style.css";
import { socket } from "../../../shared/services/socket.service";

const Message = ({ selectedConversation, loader, msgs, setMsgs }) => {
  const { user } = useSelector((state) => state.root);
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");

  const handleMessage = () => {
    if (message != "") {
      let temp = [...msgs];
      temp.push({
        sender: user?.user?.id,
        reciever:
          user?.user?.id != selectedConversation?.user1?._id
            ? selectedConversation?.user1?._id
            : selectedConversation?.user2?._id,
        text: message,
        conversationId: selectedConversation._id,
      });
      setMsgs(temp);
      setMessage("");
      socket.emit("send-message", {
        sender: user?.user?.id,
        reciever:
          user?.user?.id != selectedConversation?.user1?._id
            ? selectedConversation?.user1?._id
            : selectedConversation?.user2?._id,
        text: message,
        conversationId: selectedConversation._id,
      });
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (msgs.length > 5) {
      scrollToBottom();
    }
  }, [msgs]);

  socket.on("get-message", (msgObj) => {
    let temp = msgs;
    temp.push(msgObj);
    setMsgs(temp);
  });
  //  useEffect(() => {
  //   socket.on("get-message", (msgObj) => {
  //     let temp = msgs;
  //     temp.push(msgObj);
  //     setMsgs(temp);
  //     console.log("here", temp);
  //   });
  // }, [socket]);

  return (
    <>
      <div className="allmessages-container">
        {loader ? (
          <div className="d-flex justify-content-center mt-3">
            <Spinner animation="grow" size="lg" />
          </div>
        ) : (
          msgs.map((item, key) => {
            return (
              <div
                className={`d-flex ${
                  item.sender === user?.user?.id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                key={key}
              >
                <p className="receiver-msg">{item.text}</p>
              </div>
            );
          })
        )}

        <div ref={messagesEndRef} />
      </div>
      <div className="position-relative">
        <input
          type={"text"}
          className="w-100 message-input-field rounded"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message}
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
