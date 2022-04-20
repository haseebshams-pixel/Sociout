import React from "react";
import PostModal from "../../modals/post";
import JobModal from "../../modals/job";
import "./style.css";
const CreateCard = ({
  openModal,
  hideModal,
  open,
  txt,
  openModal2,
  open2,
  hideModal2,
  job,
}) => {
  return (
    <>
      <div
        className="card flex-row px-3 py-4 align-items-center rounded login-card-container"
        data-aos="fade-up"
        data-aos-duration="550"
      >
        <img
          src={require("../../../../assets/images/profilePlaceholder.png")}
          className="profile-pic"
          alt="profile-pic"
        />
        <div
          className="w-100 ms-2 p-2 post-create-input-field ps-3 d-flex align-items-center"
          role="button"
          disabled
          onClick={job ? openModal2 : openModal}
        >
          <span className="create-card-span">{txt}</span>
        </div>
      </div>
      <PostModal show={open} hide={hideModal} />
      <JobModal show={open2} hide={hideModal2} />
    </>
  );
};

export default CreateCard;
