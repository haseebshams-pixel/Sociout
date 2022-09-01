import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import { toastMessage } from "../toast";
import "./style.css";
import CommentUserLoader from "../../loaders/commentUserLoader";
const PostComment = ({ item, fetchAllComments }) => {
  const { user } = useSelector((state) => state.root);
  const history = useHistory();
  const [commentUser, setCommentUser] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = (id) => {
    history.push(`/profile/${id}`);
  };
  const fetchUser = async () => {
    setCommentUser(null);
    setLoader(true);
    axios
      .get(`users/${item?.postedBy}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCommentUser(res.data);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  const onDelete = async () => {
    axios
      .delete(`comments/${item?._id}`, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          fetchAllComments();
          toastMessage("Deleted Successfuly", "success");
        }
      })
      .catch((error) => {
        toastMessage(error.response.data, "error");
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="d-flex justify-content-between pt-2 pb-2 ps-1 pe-1">
      <img
        src={
          commentUser?.avatar
            ? commentUser?.avatar
            : require("../../../../assets/images/profilePlaceholder.png")
        }
        width="36px"
        height="36px"
        className="postCard-cmntimage"
        alt="profile-pic"
        role="button"
        onClick={() => navigate(commentUser?.id)}
      />
      <div className="w-100 ms-2 postComment-color px-2 pt-1 rounded d-flex justify-content-between">
        {loader ? (
          <CommentUserLoader />
        ) : (
          <div>
            <strong>
              {commentUser?.firstname} {commentUser?.lastname}
            </strong>
            <p>{item?.text}</p>
          </div>
        )}

        <div>
          <label className="text-muted"> {moment(item?.date).fromNow()}</label>
          {user?.user?.id === item?.postedBy && (
            <FeatherIcon
              icon="trash"
              size="16"
              className="ms-2"
              role="button"
              onClick={onDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComment;
