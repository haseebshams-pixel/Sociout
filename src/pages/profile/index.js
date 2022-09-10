import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PostCard from "../../shared/components/common/postCard";
import PersonCard from "../../shared/components/common/personCard";
import EditProfileModal from "../../shared/components/modals/editProfile";
import "./style.css";
import UploadProfilePhotoModal from "../../shared/components/modals/uploadProfilePhoto";
import ChangePasswordModal from "../../shared/components/modals/changePassword";
import FriendRequestCard from "../../shared/components/common/friendRequestCard";
import { toastMessage } from "../../shared/components/common/toast";
import SharePostCard from "../../shared/components/common/sharePostCard";
import { useHistory } from "react-router";
import { setChat } from "../../shared/redux/reducers/chatSlice";
import ProfileLoader from "../../shared/components/loaders/profileLoader";
import Animation from "../../shared/components/common/animation";
import { NotFoundAnim } from "../../assets/index";

const Profile = (props) => {
  const user = useSelector((state) => state.root.user);
  const chat = useSelector((state) => state.root.chat);
  const dispatch = useDispatch();
  const history = useHistory();
  const [edit, setEdit] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [profileLoader, setProfileLoader] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [requested, setRequested] = useState(false);
  const [pending, setPending] = useState(false);

  const [friend, setFriend] = useState(false);
  const openModal = () => {
    setEdit(true);
  };
  const closeModal = () => {
    setEdit(false);
  };
  const openModal2 = () => {
    setUploadPhoto(true);
  };
  const closeModal2 = () => {
    setUploadPhoto(false);
  };
  const openModal3 = () => {
    setEditPass(true);
  };
  const closeModal3 = () => {
    setEditPass(false);
  };
  const getPost = async () => {
    setLoading(true);
    axios
      .get(`posts/user/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setPosts(res.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getFriendShipStatus = async () => {
    axios
      .get(`friends/check/${props.match.params.id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          if (res.data.state === "friend") {
            setFriend(true);
            setRequested(false);
            setPending(false);
          } else if (res.data.state === "notfriend") {
            setFriend(false);
            setRequested(false);
            setPending(false);
          } else if (res.data.state === "requested") {
            setRequested(true);
            setFriend(false);
            setPending(false);
          } else if (res.data.state === "pending") {
            setPending(false);
            setFriend(false);
            setPending(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getFriends = async () => {
    setLoading2(true);
    setFriends([]);
    axios
      .get(`friends/user/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setFriends(res.data);
        }
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading2(false);
      });
  };
  const getPendingRequests = async () => {
    setLoading2(true);
    axios
      .get(`friends/pending`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setPendingRequests(res.data);
        }
        setLoading2(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading2(false);
      });
  };
  const unfriend = async () => {
    setLoading3(true);
    axios
      .get(`friends/remove/${props.match.params.id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setRequested(false);
          setFriend(false);
          setPending(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading3(false);
      });
  };
  const sendRequest = async () => {
    setLoading3(true);
    axios
      .get(`friends/request/${props.match.params.id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          toastMessage("Request Sent", "success");
          setRequested(true);
          setFriend(false);
          setPending(false);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading3(false);
      });
  };
  const acceptRequest = async (id) => {
    setLoading3(true);
    axios
      .get(`friends/confirm/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setRequested(false);
          setFriend(true);
          setPending(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading3(false);
      });
  };
  const rejectRequest = async (id) => {
    setLoading4(true);
    axios
      .get(`friends/reject/${id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setRequested(false);
          setFriend(false);
          setPending(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading4(false);
      });
  };
  const startConversation = async () => {
    setLoading4(true);
    let obj = {
      user2: props.match.params.id,
    };
    axios
      .post(`chat/start_conversation`, obj, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          let resp = {
            _id: res?.data?._id,
            user1: res?.data?.user1,
            user2: res?.data?.user2,
          };

          let temp = [...chat?.conversations];
          var filterArr = temp?.filter((item) => {
            return item._id == res?.data?._id;
          });
          if (filterArr?.length == 0) {
            temp.push(resp);
            let newchat = {
              conversations: temp,
            };
            dispatch(setChat(newchat));
          }

          history.push("/chat", { chat: res?.data });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading4(false);
      });
  };
  useEffect(() => {
    setProfileLoader(true);
    setLoading(true);
    axios
      .get(`users/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCurrentUser(res.data);
        }
        setProfileLoader(false);
      })
      .catch((error) => {
        setProfileLoader(false);
        console.log(error);
      });
    getPost();
    getFriends();
    getPendingRequests();
    getFriendShipStatus();
  }, [props.match.params.id]);
  return (
    <>
      <Header />
      <div className="container" data-aos="fade-up" data-aos-duration="650">
        <div className="px-4">
          <div className="bg-white rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                {profileLoader ? (
                  <ProfileLoader />
                ) : (
                  <>
                    <div className="profile mr-3">
                      <img
                        src={
                          currentUser?.id === user.user.id
                            ? user?.user?.avatar
                              ? `${user?.user?.avatar}`
                              : require("../../assets/images/profilePlaceholder.png")
                            : currentUser?.avatar
                            ? `${currentUser.avatar}`
                            : require("../../assets/images/profilePlaceholder.png")
                        }
                        alt="profilePic"
                        width="130"
                        className="rounded mb-2 img-thumbnail main-profile-pic"
                        onClick={() => {
                          if (currentUser?.id === user.user.id) {
                            openModal2();
                          }
                        }}
                        role="button"
                      />
                    </div>
                    <div className="media-body profile-title-container text-white">
                      <h4 className="mt-0 text-font-family">
                        {" "}
                        {user?.user?.id === currentUser?.id
                          ? user?.user?.firstname + " " + user?.user?.lastname
                          : currentUser?.firstname +
                            " " +
                            currentUser?.lastname}
                      </h4>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-between text-center">
              {user?.user?.id === props.match.params.id ? (
                <div className="d-flex">
                  <a
                    role="button"
                    className="btn btn-outline-dark btn-sm btn-block text-font-family d-flex align-items-center"
                    onClick={openModal}
                  >
                    Edit profile
                  </a>
                  <a
                    role="button"
                    className="btn btn-outline-dark btn-sm btn-block text-font-family d-flex align-items-center ms-2"
                    onClick={openModal3}
                  >
                    Change password
                  </a>
                </div>
              ) : friend ? (
                <div className="d-flex">
                  <a
                    role="button"
                    className="btn btn-outline-danger btn-sm btn-block text-font-family d-flex align-items-center btn-width"
                    onClick={unfriend}
                  >
                    {loading3 ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      "Remove"
                    )}
                  </a>
                  <a
                    role="button"
                    className="btn btn-outline-primary btn-sm btn-block text-font-family d-flex align-items-center ms-2 btn-width"
                    onClick={() => startConversation()}
                  >
                    {loading4 ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      "Message"
                    )}
                  </a>
                </div>
              ) : requested ? (
                <a
                  role="button"
                  className="btn btn-outline-primary btn-sm btn-block text-font-family disabled d-flex align-items-center"
                >
                  Requested
                </a>
              ) : pending ? (
                <div className="d-flex">
                  <a
                    role="button"
                    className="btn btn-outline-success btn-sm btn-block text-font-family d-flex align-items-center btn-width"
                    onClick={() => acceptRequest(props.match.params.id)}
                  >
                    {loading3 ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      "Accept"
                    )}
                  </a>
                  <a
                    role="button"
                    className="btn btn-outline-danger btn-sm btn-block text-font-family d-flex align-items-center ms-2 btn-width"
                    onClick={() => rejectRequest(props.match.params.id)}
                  >
                    {loading4 ? (
                      <Spinner animation="grow" size="sm" />
                    ) : (
                      "Reject"
                    )}
                  </a>
                </div>
              ) : (
                <a
                  role="button"
                  className="btn btn-outline-primary btn-sm btn-block text-font-family d-flex align-items-center btn-width"
                  onClick={() => sendRequest()}
                >
                  {loading3 ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    "Add Friend"
                  )}
                </a>
              )}

              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block text-font-family">
                    {friends?.length}
                  </h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-image mr-1 text-font-family"></i>
                    Friends
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0 text-font-family">Bio</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-0 text-font-family">
                  {user?.user?.id === currentUser?.id
                    ? user?.user?.bio
                    : currentUser?.bio}
                </p>
              </div>
            </div>
            <div className="py-4 px-4 mb-0">
              <Tabs
                defaultActiveKey="posts"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="posts" title="Posts">
                  <div className="row d-flex justify-content-center user-posts-container">
                    <div className="col-lg-7">
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <Spinner animation="grow" size="xl" />
                        </div>
                      ) : posts?.length > 0 ? (
                        posts.map((item, key) => {
                          return (
                            <div
                              data-aos="fade-up"
                              data-aos-duration="500"
                              key={key}
                            >
                              {item?.PostObject[0]?.isShared ? (
                                <SharePostCard item={item} key={key} />
                              ) : (
                                <PostCard item={item} key={key} />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <Animation
                          Pic={NotFoundAnim}
                          Message="No User Posts Found"
                        />
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="friends" title="Friends">
                  <div className="user-posts-container">
                    <Tabs
                      defaultActiveKey="allFriends"
                      id="uncontrolled-tab-example"
                    >
                      <Tab eventKey="allFriends" title="All Friends">
                        <div className="d-flex flex-wrap mx-100 justify-content-center mt-4 ">
                          {loading2 ? (
                            <div className="d-flex justify-content-center">
                              <Spinner animation="grow" size="xl" />
                            </div>
                          ) : friends?.length > 0 ? (
                            friends.map((item, key) => {
                              return <PersonCard item={item?._id} key={key} />;
                            })
                          ) : (
                            <Animation
                              Pic={NotFoundAnim}
                              Message="No Friends Found"
                            />
                          )}
                        </div>
                      </Tab>
                      {user?.user?.id === currentUser?.id && (
                        <Tab
                          eventKey="friendRequests"
                          title="Friend Requests"
                          onClick={getPendingRequests}
                        >
                          <div className="d-flex flex-wrap mx-100 justify-content-center mt-4">
                            {loading2 ? (
                              <div className="d-flex justify-content-center">
                                <Spinner animation="grow" size="xl" />
                              </div>
                            ) : pendingRequests?.length > 0 ? (
                              pendingRequests.map((item, key) => {
                                return (
                                  <FriendRequestCard
                                    item={item?._id}
                                    key={key}
                                    acceptRequest={acceptRequest}
                                    rejectRequest={rejectRequest}
                                  />
                                );
                              })
                            ) : (
                              <Animation
                                Pic={NotFoundAnim}
                                Message="No Friend Requests Found"
                              />
                            )}
                          </div>
                        </Tab>
                      )}
                    </Tabs>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="space" />
      <Footer />
      <EditProfileModal show={edit} hide={closeModal} user={user} />
      <UploadProfilePhotoModal
        show={uploadPhoto}
        hide={closeModal2}
        user={user}
      />
      <ChangePasswordModal show={editPass} hide={closeModal3} user={user} />
    </>
  );
};

export default Profile;
