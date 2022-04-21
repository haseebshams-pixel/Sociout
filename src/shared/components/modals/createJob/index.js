import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const CreateJobModal = ({ show, hide }) => {
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
    >
      <div className="close-icon-container" onClick={hide}>
        <FeatherIcon icon="x" role="button" width="20" className="close-icon" />
      </div>
      <Modal.Body className="d-flex align-items-center justify-content-center flex-column px-4">
        <h2>Job Modal</h2>
      </Modal.Body>
    </Modal>
  );
};

export default CreateJobModal;
