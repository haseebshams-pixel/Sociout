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
import Animation from "../../shared/components/common/animation";
import { NoConversationsAnim } from "../../assets/index";
import { useQuery } from "react-query";
import { setChat } from "../../shared/redux/reducers/chatSlice";

const Chat = () => {
  const { user, chat } = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const location = useLocation();
  const [allConversations, setAllConversations] = useState(chat?.conversations);
  const [selectedConversation, setSelectedConversation] = useState(
    location?.state ? location?.state?.chat : null
  );
  const [msgs, setMsgs] = useState([]);
  window.history.replaceState({}, document.title);
  const [chatLoader, setChatLoader] = useState(false);
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
    initSocket();
    socket.emit("addUser", { userId: user?.user?.id });
  }, []);

  useEffect(() => {
    if (selectedConversation)
      fetchAllConversationMessages(selectedConversation?._id);
  }, []);
  const fetchAllConversations = async () => {
    const { data } = await axios.get(`chat/getAllConversations`, {
      headers: {
        "x-auth-token": user?.token,
      },
    });
    if (data) {
      dispatch(setChat({ conversations: data?.conversations }));
    }
    return data;
  };
  const { data, error, isError, isLoading } = useQuery(
    "chats",
    fetchAllConversations
  );
  console.log("data", data);

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-3 chat-container">
            {!data?.conversations?.length > 0 ? (
              data?.conversations?.map((item, key) => {
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
              <Animation
                Pic={NoConversationsAnim}
                Message="No Conversations Found"
                isConvs
              />
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
