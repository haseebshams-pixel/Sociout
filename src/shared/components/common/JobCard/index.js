import React from "react";
import "./style.css";

const JobCard = () => {
  return (
    <div role="button" className="col-md-6">
      <div className="jobCard card d-flex p-3 m-2">
        <div className="jobTitle">Trainee Software Developer</div>
        <div className="jobSubtitle">Coding Pixel</div>
        <div className="jobSubtitle">Lahore, Punjab, Pakistan</div>
        <div className="posted d-flex justify-content-end">2 hours ago</div>
      </div>
    </div>
  );
};

export default JobCard;
