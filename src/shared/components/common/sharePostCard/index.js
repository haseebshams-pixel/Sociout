import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import FeatherIcon from "feather-icons-react";
import PostComment from "../postComment";
import { useHistory } from "react-router-dom";
import { toastMessage } from "../toast";
import PostCard from "../postCard";
import { toast } from "react-toastify";
import { PhotoURL } from "../../../utils/endpoints";

function SharePostCard({ item }) {
  const { user } = useSelector((state) => state.root);
  const history = useHistory();
  const [like, setLike] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [comment, setComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = (id) => {
    history.push(`/profile/${id}`);
  };
  const onDelete = async () => {
    toast.promise(
      axios
        .delete(`posts/share/${item?.PostObject[0]?._id}`, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res) {
            window.location.reload();
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

  const likePost = async () => {
    let obj = {
      id: item?.PostObject[0]?._id,
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
          toastMessage(error.response.data, "error");
          console.log(error);
          setLike(false);
          setLikeCount(likeCount - 1);
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
    setLikeCount(likeCount - 1);
    toast.promise(
      axios
        .get(`likes/unlike/${item?.PostObject[0]?._id}`, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res) {
            setLike(false);
          }
        })
        .catch((error) => {
          toastMessage(error.response.data, "error");
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
        post: item?.PostObject[0]?._id,
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
          toastMessage(error.response.data, "error");
          setLoader(false);
          console.log(error);
        });
    }
  };

  const postActions = async () => {
    setLikeCount(item?.likedBy?.length);
    var filterArray = item?.likedBy.filter((id) => {
      return id == user?.user?.id;
    });
    if (filterArray.length > 0) {
      setLike(true);
    }
    setCommentCount(item?.CommentObject?.length);
    setAllComments(item?.CommentObject);
  };

  useEffect(() => {
    postActions();
  }, []);
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
                    item?.PostObject[0]?.postUser[0]?.avatar
                      ? PhotoURL + item?.PostObject[0]?.postUser[0]?.avatar
                      : require("../../../../assets/images/profilePlaceholder.png")
                  }
                  className="profile-pic"
                  alt="profile-pic"
                  role="button"
                  onClick={() => navigate(item?.PostObject[0]?.postedBy)}
                />
                <div>
                  <Card.Title
                    className="d-flex align-items-center m-0"
                    role="button"
                    onClick={() => navigate(item?.PostObject[0]?.postedBy)}
                  >
                    <span className="ms-2">
                      {user?.user?.id === item?.PostObject[0]?.postedBy
                        ? user?.user?.firstname + " " + user?.user?.lastname
                        : item?.PostObject[0]?.postUser[0]?.firstname +
                          " " +
                          item?.PostObject[0]?.postUser[0]?.lastname}
                    </span>
                  </Card.Title>
                  <Card.Subtitle className="text-muted post-card-subtitle">
                    {moment(item?.PostObject[0]?.date).fromNow()}
                  </Card.Subtitle>
                </div>
              </>
            </div>

            <div className="d-flex">
              <FeatherIcon
                icon="trash"
                size="20"
                className="ms-2"
                role="button"
                onClick={onDelete}
              />
            </div>
          </div>
          <PostCard item={item} />

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
    </div>
  );
}

export default SharePostCard;
