import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";
import { CreateJobVS } from "../../../utils/validation";
import { Formik } from "formik";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toastMessage } from "../../common/toast";

const CreateJobModal = ({ show, hide }) => {
  const initialValues = {
    jobTitle: "",
    companyName: "",
    employmentType: "",
    location: "",
    contact: "",
    description: "",
  };
  const handleCreateJob = async (values, action) => {
    action.setSubmitting(false);
    hide();
    toastMessage("Job Posted Successfully", "success");
  };

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
          <h5 className="m-0 w-75">Create Job Post</h5>
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
        <Modal.Body className="d-flex flex-column p-0 pb-3">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => {
              action.setSubmitting(true);
              handleCreateJob(values, action);
            }}
            validationSchema={CreateJobVS}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <div className="mt-2">
                <div className="position-relative">
                  <FloatingLabel controlId="floatingPassword" label="Job Title">
                    <Form.Control
                      type="text"
                      placeholder="Job Title"
                      onChange={handleChange("jobTitle")}
                      value={values.jobTitle}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.jobTitle && errors.jobTitle ? errors.jobTitle : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Company Name"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Company Name"
                      onChange={handleChange("companyName")}
                      value={values.companyName}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.companyName && errors.companyName
                      ? errors.companyName
                      : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Employment Type"
                  >
                    <select
                      id="privacy"
                      name="privacy"
                      role="button"
                      className="form-control mb-4"
                      value={values.employmentType}
                      onChange={handleChange("employmentType")}
                    >
                      <option value="">Choose.....</option>
                      <option value="Full time">Full time</option>
                      <option value="Half time">Half time</option>
                      <option value="Contractual">Contractual</option>
                    </select>
                  </FloatingLabel>
                  <div className="error">
                    {touched.employmentType && errors.employmentType
                      ? errors.employmentType
                      : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel controlId="floatingPassword" label="Location">
                    <Form.Control
                      type="text"
                      placeholder="Location"
                      onChange={handleChange("location")}
                      value={values.location}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.location && errors.location ? errors.location : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Contact Email"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      onChange={handleChange("contact")}
                      value={values.contact}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.contact && errors.contact ? errors.contact : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <textarea
                    className="form-control mb-4"
                    rows="4"
                    placeholder="Description"
                    onChange={handleChange("description")}
                    value={values.description}
                  ></textarea>
                  <div className="error2">
                    {touched.description && errors.description
                      ? errors.description
                      : ""}
                  </div>
                </div>
                <button
                  className="w-100 btn login-btn mt-2"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    <p className="mb-0 login-btn-txt-size">Post</p>
                  )}
                </button>
              </div>
            )}
          </Formik>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default CreateJobModal;
