import React, { useState } from "react";
import JobPostModal from "../../modals/jobPost";
import "./style.css";

const JobCard = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        role="button"
        className="col-md-6"
        data-aos="fade-up"
        data-aos-duration="600"
        onClick={openModal}
      >
        <div className="jobCard card d-flex p-3 m-2">
          <div className="jobTitle">Trainee Software Developer</div>
          <div className="jobSubtitle">Coding Pixel</div>
          <div className="jobSubtitle">Lahore, Punjab, Pakistan</div>
          <div className="posted d-flex justify-content-end">2 hours ago</div>
        </div>
      </div>
      <JobPostModal show={open} hide={closeModal} />
    </>
  );
};

export default JobCard;
