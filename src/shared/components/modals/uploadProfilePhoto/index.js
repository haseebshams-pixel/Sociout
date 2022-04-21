import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const UploadProfilePhotoModal = ({ show, hide }) => {
  const [userPhoto, setUserPhoto] = useState(undefined);
  const handleFiles = (e) => {
    let file = e.target.files[0];
    const fileImage = URL.createObjectURL(file);
    setUserPhoto(fileImage);
  };
  const handleDelete = (e) => {
    setUserPhoto(undefined);
  };
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
      className=""
    >
      <div className="p-3 profile-modal-container">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Profile Photo</h5>
          <div className="close-icon-container" onClick={hide}>
            <FeatherIcon icon="x" role="button" width="25" />
          </div>
        </div>

        <Modal.Body className="d-flex flex-column p-0 ">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={
                userPhoto
                  ? userPhoto
                  : require("../../../../assets/images/profilePlaceholder.png")
              }
              alt="profile-pic"
              className="upload-profile-placeHolder"
            />
          </div>
          <hr className="m-0 mb-3 mt-3" />
          <div className="d-flex justify-content-between align-items-center">
            <div className="image">
              <label htmlFor="file" role="button">
                <FeatherIcon icon="camera" />
              </label>
              <input
                type="file"
                name="file"
                role="button"
                id="file"
                onChange={handleFiles}
              />
            </div>
            <FeatherIcon icon="trash" role="button" onClick={handleDelete} />
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default UploadProfilePhotoModal;
