import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import "./style.css";
import Message from "./message";
import { socket, initSocket } from "../../shared/services/socket.service";
import { useLocation } from "react-router";
import PersonCard from "./singlePersonCard";
import { Spinner } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { setChat } from "../../shared/redux/reducers/chatSlice";

const Chat = () => {
  const { user, chat } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const location = useLocation();
  const [allConversations, setAllConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(
    location?.state ? location?.state?.state : null
  );
  const [msgs, setMsgs] = useState([
    {
      sender: "6306207f59045723f3df4995",
      receiver: "630620a859045723f3df49a9",
      text: "GG Boix",
      conversationId: "6306403e06edd90c6422d0f7",
    },
  ]);
  window.history.replaceState({}, document.title);
  const [loader, setLoader] = useState(false);
  const [chatLoader, setChatLoader] = useState(false);
  const fetchAllConversations = async () => {
    setLoader(true);
    axios
      .get(`chat/getAllConversations`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setAllConversations(res?.data?.conversations);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };

  const fetchAllConversationMessages = async (id) => {
    setChatLoader(true);
    axios
      .get(`chat/getConversationChat/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setMsgs(res?.data);
        }
        setChatLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setChatLoader(false);
      });
  };

  useEffect(() => {
    fetchAllConversations();
    initSocket();
    socket.emit("addUser", { userId: user?.user?.id });
  }, []);

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-3 chat-container">
            {loader ? (
              <div className="d-flex justify-content-center mt-3">
                <Spinner animation="grow" size="lg" />
              </div>
            ) : allConversations?.length > 0 ? (
              allConversations?.map((item, key) => {
                return (
                  <PersonCard
                    item={item}
                    key={key}
                    setSelectedConversation={setSelectedConversation}
                    selectedConversation={selectedConversation}
                    setMsgs={setMsgs}
                    fetchAllConversationMessages={fetchAllConversationMessages}
                  />
                );
              })
            ) : (
              <p>No Conversation Found!</p>
            )}
          </div>
          <div className="col-8 chat-container ms-2 position-relative">
            {selectedConversation ? (
              <Message
                selectedConversation={selectedConversation}
                msgs={msgs}
                loader={chatLoader}
                setMsgs={setMsgs}
                setSelectedConversation={setSelectedConversation}
              />
            ) : (
              <div className="position-absolute chat-message-container">
                <h4 style={{ color: "#919191" }}>
                  <FeatherIcon icon="message-circle" size="25" /> Select a
                  Conversation
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space" />
      <Footer />
    </>
  );
};

export default Chat;
