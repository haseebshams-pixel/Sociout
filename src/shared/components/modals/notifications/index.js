import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const NotificationsModal = ({ show, hide }) => {
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
    >
      <div className="p-3 ">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Notifications</h5>
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
        <Modal.Body className="d-flex flex-column p-0 pb-3 notification-container overflow-auto">
          <div className="d-flex justify-content-between ">
            <span className="py-1">Hammad liked your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Naveed liked your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Abdullah commented on your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Hammad liked your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Naveed commented on your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Hammad commented on your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Abdullah liked your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Haseeb commented on your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
          <div className="d-flex justify-content-between">
            <span className="py-1">Faiq commented on your post</span>
            <span className="py-1 text-muted pe-2">just now</span>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default NotificationsModal;
