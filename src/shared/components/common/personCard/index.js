import React from "react";
import "./style.css";

const PersonCard = () => {
  return (
    <div className="card personCard_card m-1">
      <img
        src={require("../../../../assets/images/profilePlaceholder.png")}
        className="card-img-top p-3"
        height="220px"
      />
      <h5 className="card-title ps-3 pb-3">Haseeb Shams</h5>
    </div>
  );
};

export default PersonCard;
