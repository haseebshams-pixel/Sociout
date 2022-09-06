import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import "./style.css";
import { socket } from "../../../shared/services/socket.service";
import { setChat } from "../../../shared/redux/reducers/chatSlice";

const Message = ({ selectedConversation, loader, msgs, setMsgs }) => {
  const { user } = useSelector((state) => state.root);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = useState("");
  let msgArr = [...msgs];
  const handleMessage = () => {
    if (message != "") {
      let msgObj = {
        sender: user?.user?.id,
        reciever:
          user?.user?.id != selectedConversation?.user1?._id
            ? selectedConversation?.user1?._id
            : selectedConversation?.user2?._id,
        text: message,
        conversationId: selectedConversation.conversationId,
      };
      msgArr.push(msgObj);
      setMsgs(msgArr);
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
  // const scrollToBottom = () => {
  //   messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  useEffect(() => {
    // if (msgs.length > 5) {
    //   scrollToBottom();
    // }
    let scroll_to_bottom = document.getElementById("inbmain");
    scroll_to_bottom.scrollTop = scroll_to_bottom.scrollHeight;
  });

  //Socket listening to msgs
  socket.on("get-message", (msgObj) => {
    msgArr.push(msgObj);
    setMsgs([...msgArr]);
  });

  return (
    <>
      <div id="inbmain" className="allmessages-container">
        {loader ? (
          <div className="d-flex justify-content-center mt-3">
            <Spinner animation="grow" size="lg" />
          </div>
        ) : (
          msgArr.map((item, key) => {
            return (
              <div
                className={`d-flex ${
                  item.sender === user?.user?.id
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                key={key}
              >
                <p
                  className={`${
                    item.sender === user?.user?.id
                      ? "sender-msg"
                      : "receiver-msg"
                  } `}
                >
                  {item.text}
                </p>
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
