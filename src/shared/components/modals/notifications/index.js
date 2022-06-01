import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal, NavItem, Spinner } from "react-bootstrap";
import "./style.css";
import NotificationText from "./notificationText";

const NotificationsModal = ({ show, hide, listNotify, loader }) => {
  return (
    <Modal
      show={show}
      animation
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-top-margin"
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
        {loader ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" size="lg" />
          </div>
        ) : (
          <Modal.Body className="d-flex flex-column p-0 pb-3 notification-container overflow-auto">
            {listNotify?.map((item, index) => {
              return <NotificationText item={item} key={index} />;
            })}
          </Modal.Body>
        )}
      </div>
    </Modal>
  );
};

export default NotificationsModal;
