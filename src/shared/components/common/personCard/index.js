import React from "react";
import { useHistory } from "react-router-dom";
import "./style.css";

const PersonCard = () => {
  const history = useHistory();
  const navigate = () => {
    history.push("/profile/56789");
  };
  return (
    <div
      className="card personCard_card m-1"
      data-aos="fade-up"
      data-aos-duration="600"
      onClick={navigate}
    >
      <img
        src={require("../../../../assets/images/profilePlaceholder.png")}
        className=" p-3"
        width="200px"
        height="200px"
        alt="profile"
      />
      <h5 className="card-title ps-3 pb-3">Haseeb Shams</h5>
    </div>
  );
};

export default PersonCard;
