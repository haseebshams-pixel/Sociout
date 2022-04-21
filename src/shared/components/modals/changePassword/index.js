import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const ChangePasswordModal = ({ show, hide }) => {
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Change Password</h5>
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
        <Modal.Body className="d-flex flex-column p-0 pb-3"></Modal.Body>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
