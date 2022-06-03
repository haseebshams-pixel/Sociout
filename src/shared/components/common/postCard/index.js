import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import FeatherIcon from "feather-icons-react";
import PostComment from "../postComment";
import { toastMessage } from "../toast";

import "./style.css";
import EditPostModal from "../../modals/editPost";

function PostCard({ item }) {
  const { user } = useSelector((state) => state.root);
  const [like, setLike] = useState(false);
  const [allLikes, setAllLikes] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentApiToggler, setCommentApiToggler] = useState(false);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postUser, setPostUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const onDelete = async () => {
    axios
      .delete(`posts/${item?._id}`, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          toastMessage("Deleted Successfuly", "success");
          window.location.reload();
        }
      })
      .catch((error) => {
        toastMessage(error.response.data, "error");
        console.log(error);
      });
  };
  const fetchUser = async () => {
    setPostUser(null);

    axios
      .get(`users/${item?.postedBy}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setPostUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllLikes = async () => {
    axios
      .get(`likes/${item?.isShared ? item?.postId : item?._id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setAllLikes(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likePost = async () => {
    let obj = {
      id: item?.isShared ? item?.postId : item?._id,
    };
    axios
      .post(`likes/like`, obj, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setLike(true);
          toastMessage("Liked Post!", "success");
        }
      })
      .catch((error) => {
        toastMessage(error.response.data, "error");
        console.log(error);
      });
  };
  const disLikePost = async () => {
    axios
      .get(`likes/unlike/${item?.isShared ? item?.postId : item?._id}`, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setLike(false);
        }
      })
      .catch((error) => {
        toastMessage(error.response.data, "error");
        console.log(error);
      });
  };

  const getLikeStatus = async () => {
    axios
      .get(`likes/check/${item?.isShared ? item?.postId : item?._id}`, {
        headers: {
          "x-auth-token": user.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setLike(res.data.state);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const commentOnPost = async () => {
    if (commentText === "") {
      toastMessage("Write Something!", "error");
    } else {
      setLoader(true);
      let obj = {
        post: item?.isShared ? item?.postId : item?._id,
        text: commentText,
      };
      axios
        .post(`comments/`, obj, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            setCommentText("");
            setCommentApiToggler(!commentApiToggler);
            setLoader(false);
            toastMessage("Comment Added!", "success");
          }
        })
        .catch((error) => {
          toastMessage(error.response.data, "error");
          setLoader(false);
          console.log(error);
        });
    }
  };

  const fetchAllComments = async () => {
    axios
      .get(`comments/${item?.isShared ? item?.postId : item?._id}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setAllComments(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sharePost = async () => {
    const formData = {
      id: item?.isShared ? item?.postId : item?._id,
    };
    axios
      .post("posts/share", formData, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          window.location.reload();
          toastMessage("Post Shared Successfully", "success");
        }
      })
      .catch((error) => {
        console.log(error);
        toastMessage(error.response.data, "error");
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    fetchAllLikes();
    getLikeStatus();
  }, [like]);
  useEffect(() => {
    fetchAllComments();
  }, [commentApiToggler]);

  return (
    <div
      className="card-container w-100"
      data-aos="fade-up"
      data-aos-duration="650"
    >
      <Card className="card-main-container">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex">
              <img
                src={
                  postUser?.avatar
                    ? postUser?.avatar
                    : require("../../../../assets/images/profilePlaceholder.png")
                }
                className="profile-pic"
                alt="profile-pic"
              />
              <div>
                <Card.Title className="d-flex align-items-center m-0">
                  <span className="ms-2">
                    {user?.user?.id === item?.postedBy
                      ? user?.user?.firstname + " " + user?.user?.lastname
                      : postUser?.firstname + " " + postUser?.lastname}
                  </span>
                </Card.Title>
                <Card.Subtitle className="text-muted post-card-subtitle">
                  {moment(
                    item?.isShared ? item?.oldDate : item?.date
                  ).fromNow()}
                </Card.Subtitle>
              </div>
            </div>
            {user?.user?.id === item?.postedBy && !item?.isShared && (
              <div className="d-flex">
                <FeatherIcon
                  icon="edit-2"
                  size="20"
                  role="button"
                  onClick={openModal}
                />
                <FeatherIcon
                  icon="trash"
                  size="20"
                  className="ms-2"
                  role="button"
                  onClick={onDelete}
                />
              </div>
            )}
          </div>
          <Card.Text>{item?.text}</Card.Text>
          {item?.images.length > 0 && (
            <Carousel className="carosal">
              {item?.images?.map((picture, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img
                      className="carosal-image"
                      src={picture}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}
          <div className="d-flex align-items-center justify-content-between">
            <span>
              {allLikes?.likedBy?.length} Like
              {allLikes?.likedBy?.length > 1 && "s"}
            </span>
            <span>
              {allComments?.length} comment{allComments?.length > 1 && "s"}
            </span>
          </div>
          <hr className="mt-2 mb-3" />
          {user?.isLoggedIn && (
            <div className="d-flex align-items-center justify-content-between">
              <button
                className="postCard-btn"
                onClick={!like ? likePost : disLikePost}
              >
                {!like ? (
                  <FeatherIcon icon="heart" />
                ) : (
                  <FeatherIcon icon="heart" fill="red" />
                )}
                Like
              </button>
              <button
                className="postCard-btn"
                onClick={() => setComment(!comment)}
              >
                <FeatherIcon icon="message-square" />
                Comment
              </button>
              <button className="postCard-btn" onClick={sharePost}>
                <FeatherIcon icon="share" />
                Share
              </button>
            </div>
          )}
          {comment && (
            <div data-aos="zoom-in-down">
              <div className="d-flex align-items-center justify-content-between pt-3 pb-3">
                <img
                  src={
                    user?.user?.avatar
                      ? user?.user?.avatar
                      : require("../../../../assets/images/profilePlaceholder.png")
                  }
                  width="36px"
                  height="36px"
                  className="postCard-cmntimage"
                  alt="profile-pic"
                />
                <div className="d-flex flex-row postCard-relative w-100">
                  <input
                    type="text"
                    onChange={(e) => setCommentText(e.target.value)}
                    className="w-100 ms-2 postCard-cmnt"
                    placeholder="Add a comment..."
                    value={commentText}
                  ></input>
                  <div className="d-flex justify-content-center align-items-center">
                    {loader ? (
                      <Spinner
                        animation="grow"
                        size="sm"
                        className="postCard-absolute"
                      />
                    ) : (
                      <img
                        src={require("../../../../assets/svg/send.svg").default}
                        className="postCard-absolute"
                        width="22"
                        alt="icon"
                        onClick={commentOnPost}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="pb-1 comments-container">
                {allComments?.map((item, index) => {
                  return (
                    <PostComment
                      item={item}
                      key={index}
                      fetchAllComments={fetchAllComments}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      <EditPostModal show={open} hide={closeModal} item={item} />
    </div>
  );
}

export default PostCard;
