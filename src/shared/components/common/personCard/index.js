import React from "react";
import "./style.css";

const PersonCard = () => {
  return (
    <div
      className="card personCard_card m-1"
      data-aos="fade-up"
      data-aos-duration="600"
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
