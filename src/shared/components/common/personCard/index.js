import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";

const PersonCard = ({ item }) => {
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
    <div
      className="card personCard_card m-1 "
      data-aos="fade-up"
      data-aos-duration="600"
      onClick={navigate}
    >
      <img
        src={
          currentUser?.avatar
            ? currentUser?.avatar
            : require("../../../../assets/images/profilePlaceholder.png")
        }
        className="p-3 person-card-img"
        width="200px"
        height="200px"
        alt="profile"
      />
      <h5 className="card-title ps-3 pb-3">
        {" "}
        {currentUser?.firstname + " " + currentUser?.lastname}
      </h5>
    </div>
  );
};

export default PersonCard;
