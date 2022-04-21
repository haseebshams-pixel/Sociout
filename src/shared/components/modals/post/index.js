import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const PostModal = ({ show, hide }) => {
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <h3 className="m-0">Create a post</h3>
          <div className="close-icon-container" onClick={hide}>
            <FeatherIcon
              icon="x"
              role="button"
              width="25"
              className="close-icon"
            />
          </div>
        </div>
        <hr className="m-0 mb-3 mt-2" />
        <Modal.Body className="d-flex flex-column p-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={require("../../../../assets/images/profilePlaceholder.png")}
                className="profile-pic"
                alt="profile-pic"
              />
              <b className="ms-2">Haseeb Shams</b>
            </div>
            <select id="privacy" name="privacy" role="button">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
          </div>
          <div className="pt-3">
            <textarea
              className="form-control border-0"
              rows="5"
              placeholder="what do you want to talk about?"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between mt-4 align-items-center">
            <div className="image">
              <label htmlFor="file" role="button">
                <FeatherIcon icon="camera" />
              </label>
              <input type="file" name="file" role="button" id="file" />
            </div>
            <button className="post-modal-btn px-3 py-1">Post</button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default PostModal;
