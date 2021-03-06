import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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

const Profile = (props) => {
  const user = useSelector((state) => state.root.user);
  const [edit, setEdit] = useState(false);
  const [editPass, setEditPass] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);
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
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
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
    setLoading(true);
    axios
      .get(`friends/user/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setFriends(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const getPendingRequests = async () => {
    setLoading(true);
    axios
      .get(`friends/pending`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setPendingRequests(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  const unfriend = async () => {
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
      });
  };
  const sendRequest = async () => {
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
      });
  };
  const acceptRequest = async (id) => {
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
      });
  };
  const rejectRequest = async (id) => {
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
      });
  };
  useEffect(() => {
    axios
      .get(`users/${props.match.params.id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCurrentUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getPost();
    getFriends();
    getPendingRequests();
    getFriendShipStatus();
  }, []);
  return (
    <>
      <Header />
      <div className="container" data-aos="fade-up" data-aos-duration="650">
        <div className="px-4">
          <div className="bg-white rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
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
                    onClick={openModal2}
                    role="button"
                  />
                </div>
                <div className="media-body profile-title-container text-white">
                  <h4 className="mt-0 text-font-family">
                    {" "}
                    {user?.user?.id === currentUser?.id
                      ? user?.user?.firstname + " " + user?.user?.lastname
                      : currentUser?.firstname + " " + currentUser?.lastname}
                  </h4>
                </div>
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
                <a
                  role="button"
                  className="btn btn-outline-danger btn-sm btn-block text-font-family d-flex align-items-center"
                  onClick={() => unfriend()}
                >
                  Unfriend
                </a>
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
                    className="btn btn-outline-success btn-sm btn-block text-font-family d-flex align-items-center"
                    onClick={() => acceptRequest(props.match.params.id)}
                  >
                    Accept
                  </a>
                  <a
                    role="button"
                    className="btn btn-outline-danger btn-sm btn-block text-font-family d-flex align-items-center ms-2"
                    onClick={() => rejectRequest(props.match.params.id)}
                  >
                    Reject
                  </a>
                </div>
              ) : (
                <a
                  role="button"
                  className="btn btn-outline-primary btn-sm btn-block text-font-family d-flex align-items-center"
                  onClick={() => sendRequest()}
                >
                  Add Friend
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
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-7">
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <Spinner animation="grow" size="xl" />
                        </div>
                      ) : (
                        posts.map((item, key) => {
                          return (
                            <div
                              data-aos="fade-up"
                              data-aos-duration="500"
                              key={key}
                            >
                              {item?.isShared ? (
                                <SharePostCard item={item} key={key} />
                              ) : (
                                <PostCard item={item} key={key} />
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="friends" title="Friends">
                  <Tabs
                    defaultActiveKey="allFriends"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="allFriends" title="All Friends">
                      <div className="d-flex flex-wrap mx-100 justify-content-center mt-4">
                        {loading ? (
                          <div className="d-flex justify-content-center">
                            <Spinner animation="grow" size="xl" />
                          </div>
                        ) : (
                          friends.map((item, key) => {
                            return <PersonCard item={item} key={key} />;
                          })
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
                          {loading ? (
                            <div className="d-flex justify-content-center">
                              <Spinner animation="grow" size="xl" />
                            </div>
                          ) : (
                            pendingRequests.map((item, key) => {
                              return (
                                <FriendRequestCard
                                  item={item}
                                  key={key}
                                  acceptRequest={acceptRequest}
                                  rejectRequest={rejectRequest}
                                />
                              );
                            })
                          )}
                        </div>
                      </Tab>
                    )}
                  </Tabs>
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
