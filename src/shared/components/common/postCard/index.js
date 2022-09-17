import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import FeatherIcon from "feather-icons-react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { toastMessage } from "../toast";
import PostComment from "../postComment";
import EditPostModal from "../../modals/editPost";
import PostUserLoader from "../../loaders/postUserLoader";
import PostContentLoader from "../../loaders/postContentLoader";
import { PhotoURL } from "../../../utils/endpoints";
import "./style.css";
import { resetPosts, setAllPosts } from "../../../redux/reducers/postsSlice";

function PostCard({ item }) {
  const { user, posts } = useSelector((state) => state.root);
  const dispatch = useDispatch();
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
  const [localItem, setLocalItem] = useState(item?.PostObject[0]);
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const navigate = (id) => {
    history.push(`/profile/${id}`);
  };
  const onDelete = async () => {
    let tempArr = [...posts?.posts];
    let filter = [];
    // var filterArr = tempArr.filter((val, ind) => {
    //   return val?.PostObject[0]?._id != localItem?._id;
    // });
    // tempArr.pop();
    // for (let k = 0; k < tempArr.length; k++) {
    //   if (tempArr[k]._id != item?._id) {
    //     filter.push(tempArr[k]);
    //   }
    // }
    // console.log("filer", filter);
    // dispatch(setAllPosts({ posts: filter }));
    // dispatch(resetPosts());

    toast.promise(
      axios
        .delete(`posts/${item?.PostObject[0]?._id}`, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            // window.location.reload();
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
    setUserLoader(true);
    axios
      .get(`users/${item?.PostObject[0]?.postedBy}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setPostUser(res.data);
        }
        setUserLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setUserLoader(false);
      });
  };

  const likePost = async () => {
    let obj = {
      id: item?.PostObject[0]?.isShared
        ? item?.PostObject[0]?.postId
        : item?.PostObject[0]?._id,
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
          if (res.statusText === "OK") {
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
            item?.PostObject[0]?.isShared
              ? item?.PostObject[0]?.postId
              : item?.PostObject[0]?._id
          }`,
          {
            headers: {
              "x-auth-token": user?.token,
            },
          }
        )
        .then((res) => {
          if (res.statusText === "OK") {
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
        post: item?.PostObject[0]?.isShared
          ? item?.PostObject[0]?.postId
          : item?.PostObject[0]?._id,
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
      id: item?.PostObject[0]?.isShared
        ? item?.PostObject[0]?.postId
        : item?.PostObject[0]?._id,
    };
    toast.promise(
      axios
        .post("posts/share", formData, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
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
    if (item?.PostObject[0]?.isShared) {
      setLikeCount(item?.PostObject[0]?.shareLikedBy[0]?.likedBy?.length);
      filterArray = item?.PostObject[0]?.shareLikedBy[0]?.likedBy?.filter(
        (id) => {
          return id == user?.user?.id;
        }
      );
      if (filterArray.length > 0) {
        setLike(true);
      }
      setCommentCount(item?.PostObject[0]?.shareComments?.length);
      setAllComments(item?.PostObject[0]?.shareComments);
    } else {
      setLikeCount(item?.likedBy?.length);
      filterArray = item?.likedBy.filter((id) => {
        return id == user?.user?.id;
      });
      if (filterArray.length > 0) {
        setLike(true);
      }
      setCommentCount(item?.CommentObject?.length);
      setAllComments(item?.CommentObject);
    }
  };

  useEffect(() => {
    fetchUser();
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
              {userLoader ? (
                <PostUserLoader />
              ) : (
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
                          : postUser?.firstname + " " + postUser?.lastname}
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="text-muted post-card-subtitle">
                      {moment(
                        item?.PostObject[0]?.isShared
                          ? item?.PostObject[0]?.oldDate
                          : item?.PostObject[0]?.date
                      ).fromNow()}
                    </Card.Subtitle>
                  </div>
                </>
              )}
            </div>
            {!userLoader &&
              user?.user?.id === item?.PostObject[0]?.postedBy &&
              !item?.PostObject[0]?.isShared && (
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
          {userLoader ? (
            <PostContentLoader />
          ) : (
            <>
              <Card.Text>{localItem?.text}</Card.Text>
              {localItem?.images.length > 0 && (
                <Carousel className="carosal">
                  {localItem?.images?.map((picture, index) => {
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
                </Carousel>
              )}
            </>
          )}

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
        setLocalItem={setLocalItem}
      />
    </div>
  );
}

export default PostCard;
