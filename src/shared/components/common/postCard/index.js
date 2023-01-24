import React, { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { PhotoURL } from "../../../utils/endpoints";
import PostContentLoader from "../../loaders/postContentLoader";
import PostUserLoader from "../../loaders/postUserLoader";
import EditPostModal from "../../modals/editPost";
import PostComment from "../postComment";
import { toastMessage } from "../toast";
import "./style.css";
import { current } from "@reduxjs/toolkit";

function PostCard({ item, posts, setPosts }) {
  const { user } = useSelector((state) => state.root);
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [postUser, setPostUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const [userLoader, setUserLoader] = useState(false);
  const [localItem, setLocalItem, localRef] = useState(item?.PostObject[0]);
  const [localObject, setLocalObject, localObjectRef] = useState(item);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setLocalItem(item?.PostObject[0]);
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const navigate = (id) => {
    history.push(`/profile/${id}`);
  };
  const onDelete = async () => {
    toast.promise(
      axios
        .delete(`posts/${localItem?._id}`, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res) {
            var filterArr = posts.filter((val, ind) => {
              return val?.post != localItem?._id;
            });
            setPosts(filterArr);
          }
        })
        .catch((error) => {
          toastMessage(error.response.data, "error");
          console.log(error);
        }),
      {
        pending: "Pending",
        success: "Deleted Successfuly! 🤯",
        error: "Rejected 🤯",
      }
    );
  };
  const fetchUser = async () => {
    setPostUser(null);
    if (localItem.isShared) {
      setPostUser(localItem.sharedPostUser[0]);
    } else {
      setPostUser(localItem.postUser[0]);
    }
  };

  const likePost = async () => {
    let obj = {
      id: localItem?.isShared ? localItem?.postId : localItem?._id,
    };
    setLike(true);
    setLikeCount(likeCount + 1);
    toast.promise(
      axios
        .post(`likes/like`, obj, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res) {
            setLike(true);
          }
        })
        .catch((error) => {
          setLike(false);
          setLikeCount(likeCount - 1);
          console.log(error);
        }),
      {
        pending: "Pending",
        success: "Liked Post! 👌",
        error: "Rejected 🤯",
      }
    );
  };
  const disLikePost = async () => {
    setLike(false);
    setLike(false);
    setLikeCount(likeCount - 1);
    toast.promise(
      axios
        .get(
          `likes/unlike/${
            localItem?.isShared ? localItem?.postId : localItem?._id
          }`,
          {
            headers: {
              "x-auth-token": user?.token,
            },
          }
        )
        .then((res) => {
          if (res) {
            setLike(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLike(true);
          setLikeCount(likeCount + 1);
        }),
      {
        pending: "Pending",
        success: "Post disliked! 🤯",
        error: "Rejected 🤯",
      }
    );
  };

  const commentOnPost = async () => {
    if (commentText === "") {
      toastMessage("Write Something!", "error");
    } else {
      setLoader(true);
      let obj = {
        post: localItem?.isShared ? localItem?.postId : localItem?._id,
        text: commentText,
      };
      axios
        .post(`comments/`, obj, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res?.data) {
            setCommentText("");
            setAllComments((p) => {
              return p.concat(res?.data);
            });
            setCommentCount(commentCount + 1);
            toastMessage("Comment Added!", "success");
          }
          setLoader(false);
        })
        .catch((error) => {
          toastMessage("Error", "error");
          setLoader(false);
          console.log(error);
        });
    }
  };

  const sharePost = async () => {
    const formData = {
      id: localItem?.isShared ? localItem?.postId : localItem?._id,
    };
    toast.promise(
      axios
        .post("posts/share", formData, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res) {
          }
        })
        .catch((error) => {
          console.log(error);
        }),
      {
        pending: "Pending",
        success: "Post Shared Successfully 👌",
        error: "Rejected 🤯",
      }
    );
  };

  const postActions = async () => {
    var filterArray = [];
    if (localRef?.current?.isShared) {
      setLikeCount(localRef?.current?.shareLikedBy[0]?.likedBy?.length);
      filterArray = localRef?.current?.shareLikedBy[0]?.likedBy?.filter(
        (id) => {
          return id == user?.user?.id;
        }
      );
      if (filterArray.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
      setCommentCount(localRef?.current?.shareComments?.length);
      setAllComments(localRef?.current?.shareComments);
    } else {
      setLikeCount(localObjectRef?.current?.likedBy?.length);
      filterArray = localObjectRef?.current?.likedBy.filter((id) => {
        return id == user?.user?.id;
      });
      if (filterArray.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
      setCommentCount(localObjectRef?.current?.CommentObject?.length);
      setAllComments(localObjectRef?.current?.CommentObject);
    }
  };

  useEffect(() => {
    fetchUser();
    setLocalItem(item?.PostObject[0]);
    setLocalObject(item);
    postActions();
  }, [item]);

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
              <>
                <img
                  src={
                    postUser?.avatar
                      ? PhotoURL + postUser?.avatar
                      : require("../../../../assets/images/profilePlaceholder.png")
                  }
                  className="profile-pic"
                  alt="profile-pic"
                  role="button"
                  onClick={() =>
                    navigate(
                      localItem?.isShared
                        ? localItem?.sharedBy
                        : localItem?.postedBy
                    )
                  }
                />
                <div>
                  <Card.Title
                    className="d-flex align-items-center m-0"
                    role="button"
                    onClick={() =>
                      navigate(
                        localItem?.isShared
                          ? localItem?.sharedBy
                          : localItem?.postedBy
                      )
                    }
                  >
                    <span className="ms-2">
                      {postUser?.firstname + " " + postUser?.lastname}
                    </span>
                  </Card.Title>
                  <Card.Subtitle className="text-muted post-card-subtitle">
                    {moment(
                      localItem?.isShared ? localItem?.oldDate : localItem?.date
                    ).fromNow()}
                  </Card.Subtitle>
                </div>
              </>
            </div>
            {user?.user?.id === localItem?.postedBy && !localItem?.isShared && (
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
          <>
            <Card.Text>{localItem?.text}</Card.Text>
            {(localItem?.images.length > 0 ||
              localItem?.videos?.length > 0) && (
              <Carousel className="carosal">
                {localItem?.images.length > 0 &&
                  localItem?.images?.map((picture, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <img
                          className="carosal-image"
                          src={PhotoURL + picture}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  })}
                {localItem?.videos.length > 0 &&
                  localItem?.videos?.map((vid, index) => {
                    return (
                      <Carousel.Item key={index} className="height-100">
                        <div className="d-flex justify-content-center align-items-center height-100">
                          <div className="w-75 height-100">
                            <video
                              width="100%"
                              height="100%"
                              src={PhotoURL + vid}
                              alt="First slide"
                              controls
                            />
                          </div>
                        </div>
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            )}
          </>

          <div className="d-flex align-items-center justify-content-between">
            <span>
              {likeCount} Like
              {likeCount > 1 || (likeCount == 0 && "s")}
            </span>
            <span>
              {commentCount} Comment
              {commentCount > 1 || (commentCount == 0 && "s")}
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
                  <FeatherIcon icon="heart" className="me-1" />
                ) : (
                  <FeatherIcon icon="heart" fill="red" className="me-1" />
                )}
                Like
              </button>
              <button
                className="postCard-btn"
                onClick={() => setComment(!comment)}
              >
                <FeatherIcon icon="message-square" className="me-1" />
                Comment
              </button>
              <button className="postCard-btn" onClick={sharePost}>
                <FeatherIcon icon="share" className="me-1" />
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
                      ? PhotoURL + user?.user?.avatar
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
                      allComments={allComments}
                      setCommentCount={setCommentCount}
                      commentCount={commentCount}
                      setAllComments={setAllComments}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
      <EditPostModal
        show={open}
        hide={closeModal}
        item={localItem}
        setItem={setLocalItem}
      />
    </div>
  );
}

export default PostCard;
