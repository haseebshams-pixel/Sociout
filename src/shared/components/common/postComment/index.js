import React from "react";
import "./style.css";
const PostComment = () => {
  return (
    <div className="d-flex justify-content-between pt-2 pb-2 ps-1 pe-1">
      <img
        src={require("../../../../assets/images/profilePlaceholder.png")}
        width="36px"
        height="36px"
        className="postCard-cmntimage"
        alt="profile-pic"
      />
      <div className="w-100 ms-2 postComment-color ps-2 pt-1 rounded">
        <strong>Haseeb Shams</strong>
        <p> Hello my name is haseeb</p>
      </div>
    </div>
  );
};

export default PostComment;
