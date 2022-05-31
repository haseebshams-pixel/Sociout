import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

const FriendRequestCard = ({ item, acceptRequest, rejectRequest }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = () => {
    history.push(`/profile/${item}`);
    window.location.reload();
  };
  useEffect(() => {
    axios
      .get(`users/${item}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCurrentUser(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="card personCard_card m-1 rounded-top">
      <div onClick={navigate}>
        <img
          src={
            currentUser?.avatar
              ? currentUser?.avatar
              : require("../../../../assets/images/profilePlaceholder.png")
          }
          className=" p-0 rounded-top"
          width="200px"
          height="200px"
          alt="profile"
        />
        <h5 className="card-title d-flex justify-content-center pt-1">
          {currentUser?.firstname + " " + currentUser?.lastname}
        </h5>
      </div>
      <button
        className="my-1 mx-2 confirm-btn rounded"
        onClick={() => acceptRequest(item)}
      >
        Confirm
      </button>
      <button
        className="mb-2 mx-2 delete-btn rounded"
        onClick={() => rejectRequest(item)}
      >
        Delete
      </button>
    </div>
  );
};

export default FriendRequestCard;
