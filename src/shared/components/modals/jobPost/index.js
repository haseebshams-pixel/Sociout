import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import "./style.css";

const JobPostModal = ({ show, hide, item }) => {
  return (
    <Modal show={show} animation backdrop="static" keyboard={false}>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">{item?.title}</h5>
          <div className="close-icon-container" onClick={hide}>
            <FeatherIcon
              icon="x"
              role="button"
              width="25"
              className="close-icon"
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="text-muted">{item?.companyName}</small>
            <small className="mx-1 text-muted">-</small>
            <small className="text-muted">{item?.location}</small>
          </div>
          <small style={{ color: "#3ec786" }}>
            {moment(item?.date).fromNow()}
          </small>
        </div>
        <hr className="m-0 mb-3 mt-2" />
        <Modal.Body className="d-flex flex-column p-0 pb-3">
          <div className="d-flex">
            <FeatherIcon icon="briefcase" />
            <span className="ms-2 ">{item?.employmentType}</span>
          </div>
          <div className="d-flex mt-2">
            <FeatherIcon icon="map-pin" />
            <span className="ms-2">{item?.location}</span>
          </div>
          <div className="d-flex mt-2">
            <FeatherIcon icon="mail" />
            <a
              href={`mailto:${item?.email}`}
              className="ms-2 login-forgot-txt text-decoration-none"
            >
              Send your resumé here!
            </a>
          </div>
          <hr className="m-0 mb-3 mt-2" />
          <span>{item?.description}</span>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default JobPostModal;
