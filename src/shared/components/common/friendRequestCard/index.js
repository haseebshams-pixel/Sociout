import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const FriendRequestCard = () => {
  const history = useHistory();
  const navigate = () => {
    history.push("/profile/56789");
  };
  return (
    <div
      className="card personCard_card m-1 rounded-top"
      // data-aos="fade-up"
      // data-aos-duration="600"
      onClick={navigate}
    >
      <img
        src={require("../../../../assets/images/test.png")}
        className=" p-0 rounded-top"
        width="200px"
        height="200px"
        alt="profile"
      />
      <h5 className="card-title d-flex justify-content-center pt-1">
        Haseeb Shams
      </h5>
      <button className="my-1 mx-2 confirm-btn rounded">Confirm</button>
      <button className="mb-2 mx-2 delete-btn rounded">Delete</button>
    </div>
  );
};

export default FriendRequestCard;
