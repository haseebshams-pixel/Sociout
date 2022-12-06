import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import "./style.css";
import Message from "./message";
import { socket, initSocket } from "../../shared/services/socket.service";
import { useLocation } from "react-router";
import PersonCard from "./singlePersonCard";
import FeatherIcon from "feather-icons-react";
import Animation from "../../shared/components/common/animation";
import { NoConversationsAnim } from "../../assets/index";
import { useQuery } from "react-query";
import useWindowDimensions from "../../shared/utils/useWindowDimenstions";
import listenForOutsideClicks from "../../shared/utils/listenOutsideClick";

const Chat = () => {
  const { height, width } = useWindowDimensions();
  const { user } = useSelector((state) => state.root);
  const location = useLocation();
  const [selectedConversation, setSelectedConversation] = useState(
    location?.state ? location?.state?.chat : null
  );
  const [msgs, setMsgs] = useState([]);
  window.history.replaceState({}, document.title);
  const [chatLoader, setChatLoader] = useState(false);
  const [displayChat, setDisplayChat] = useState(false);
  const [mediumScreen, setMediumScreen] = useState(false);
  const [moreOptions, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const fetchAllConversationMessages = async (id) => {
    setChatLoader(true);
    axios
      .get(`chat/getConversationChat/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res?.data) {
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

    return data;
  };
  const { data, error, isError, isLoading } = useQuery(
    "chats",
    fetchAllConversations
  );

  useEffect(() => {
    if (width <= 992) {
      setMediumScreen(true);
      setSelectedConversation(null);
      setDisplayChat(false);
    } else if (width > 992) {
      setMediumScreen(false);
      setDisplayChat(false);
    }
  }, [width]);

  useEffect(
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div
            className={`${
              mediumScreen ? (displayChat ? "d-none" : "col-12") : "col-3"
            }   chat-container`}
          >
            <>
              <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                <h5 className="d-flex align-items-center mb-0">
                  <FeatherIcon icon="message-circle" size="21" />
                  <p className="mb-0 ps-1">Conversations</p>
                </h5>
                <button className="chat-add-btn-style">
                  <FeatherIcon icon="plus-circle" size="21" />
                </button>
              </div>

              {data?.conversations?.length > 0 &&
                data?.conversations?.map((item, key) => {
                  return (
                    <PersonCard
                      item={item}
                      key={key}
                      setDisplayChat={setDisplayChat}
                      setSelectedConversation={setSelectedConversation}
                      selectedConversation={selectedConversation}
                      setMsgs={setMsgs}
                      fetchAllConversationMessages={
                        fetchAllConversationMessages
                      }
                    />
                  );
                })}
              {(data?.conversations?.length < 1 || isLoading) && (
                <Animation
                  Pic={NoConversationsAnim}
                  Message={isLoading ? "Fetching" : "No Conversations Found"}
                  isConvs
                />
              )}
            </>
          </div>
          <div
            className={`${
              mediumScreen
                ? displayChat
                  ? "col-12 d-flex flex-column"
                  : "col-12 d-none"
                : "col-8 d-flex flex-column"
            }  chat-container ms-2 position-relative`}
          >
            {!isLoading &&
              (selectedConversation ? (
                <>
                  <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                    <div className="d-flex align-items-center">
                      <button
                        className="chat-add-btn-style"
                        onClick={() => {
                          if (mediumScreen) {
                            setDisplayChat(false);
                          }
                          setSelectedConversation(null);
                        }}
                      >
                        <FeatherIcon icon="chevron-left" size="25" />
                      </button>
                      <h5 className="mb-0 ps-3">
                        {selectedConversation?.user1?._id != user?.user?.id
                          ? `${selectedConversation?.user1?.firstname} ${selectedConversation?.user1?.lastname}`
                          : selectedConversation?.user2?._id !=
                              user?.user?.id &&
                            `${selectedConversation?.user2?.firstname}  ${selectedConversation?.user2?.lastname}`}
                      </h5>
                    </div>
                    <>
                      <button
                        ref={menuRef}
                        className="chat-add-btn-style"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <FeatherIcon icon="more-vertical" size="25" />
                      </button>
                      <div
                        className={`chat-menu chat-menu-${
                          moreOptions ? "open" : "close"
                        } d-flex flex-column`}
                      >
                        <button
                          className="chat-add-btn-style"
                          style={{ color: "#494949" }}
                        >
                          <FeatherIcon icon="slash" size="14" />
                          <p className="mb-0 ms-1">Block</p>
                        </button>
                        <button
                          className="chat-add-btn-style"
                          style={{ color: "red" }}
                        >
                          <FeatherIcon icon="trash" size="14" />
                          <p className="mb-0 ms-1">Delete</p>
                        </button>
                      </div>
                    </>
                  </div>
                  <Message
                    selectedConversation={selectedConversation}
                    msgs={msgs}
                    loader={chatLoader}
                    setMsgs={setMsgs}
                    setSelectedConversation={setSelectedConversation}
                  />
                </>
              ) : (
                <div className="position-absolute chat-message-container">
                  <h4 style={{ color: "#919191" }}>
                    <FeatherIcon icon="message-circle" size="25" /> Select a
                    Conversation
                  </h4>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="space" />
      <Footer />
    </>
  );
};

export default Chat;
