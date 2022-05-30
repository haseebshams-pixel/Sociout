import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
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
  const [comment, setComment] = useState(false);
  const [postUser, setPostUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
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
    setIsEditable(false);
    axios
      .get(`users/${item.postedBy}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setPostUser(res.data);
          if (res.data.id == user?.user?.id) {
            setIsEditable(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUser();
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
              <img
                src={require("../../../../assets/images/profilePlaceholder.png")}
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
                  {moment(item?.date).fromNow()}
                </Card.Subtitle>
              </div>
            </div>
            {user?.user?.id === item?.postedBy && (
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
            <span>0 Likes</span>
            <span>0 comments</span>
          </div>
          <hr className="mt-2 mb-3" />
          <div className="d-flex align-items-center justify-content-between">
            <button className="postCard-btn" onClick={() => setLike(!like)}>
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
            <button className="postCard-btn">
              <FeatherIcon icon="share" />
              Share
            </button>
          </div>
          {comment && (
            <div data-aos="zoom-in-down">
              <div className="d-flex align-items-center justify-content-between pt-3 pb-3">
                <img
                  src={require("../../../../assets/images/profilePlaceholder.png")}
                  width="36px"
                  height="36px"
                  className="postCard-cmntimage"
                  alt="profile-pic"
                />
                <div className="d-flex flex-row postCard-relative w-100">
                  <input
                    type="text"
                    className="w-100 ms-2 postCard-cmnt"
                    placeholder="Add a comment..."
                  ></input>
                  <img
                    src={require("../../../../assets/svg/send.svg").default}
                    className="postCard-absolute"
                    width="22"
                    alt="icon"
                  />
                </div>
              </div>
              <div className="pb-1 comments-container">
                <PostComment />
                <PostComment />
                <PostComment />
                <PostComment />
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
