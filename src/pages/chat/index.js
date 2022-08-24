import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import "./style.css";
import Message from "./message";
import { socket } from "../../shared/services/socket.service";
import { useLocation } from "react-router";
import PersonCard from "./singlePersonCard";

const Chat = () => {
  const { user } = useSelector((state) => state.root);
  const location = useLocation();
  const [allConversations, setAllConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(
    location?.state ? location?.state?.state : null
  );
  window.history.replaceState({}, document.title);
  console.log("location", selectedConversation);

  const fetchAllConversations = async () => {
    axios
      .get(`users/getAllConversations`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setAllConversations(res?.data?.conversations);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    socket.on("get-message", ({ message }) => {
      alert(message);
    });
  }, [socket]);

  useEffect(() => {
    fetchAllConversations();
  }, []);

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-3 chat-container">
            {allConversations?.map((item, key) => {
              return (
                <PersonCard
                  item={item}
                  key={key}
                  setSelectedConversation={setSelectedConversation}
                  selectedConversation={selectedConversation}
                />
              );
            })}
          </div>
          <div className="col-8 chat-container ms-2">
            {selectedConversation && <Message />}
          </div>
        </div>
      </div>

      <div className="space" />
      <Footer />
    </>
  );
};

export default Chat;
