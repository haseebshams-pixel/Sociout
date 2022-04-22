import React from "react";
import FeatherIcon from "feather-icons-react";
import Form from "react-bootstrap/Form";
import { Modal, Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toastMessage } from "../../common/toast";
import { Formik } from "formik";
import { EditProfileVS } from "../../../utils/validation";

const EditProfileModal = ({ show, hide }) => {
  const initialValues = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    DOB: "",
  };
  const handleEditProfile = async (values, action) => {
    action.setSubmitting(false);
    hide();
    toastMessage("Profile Updated Successfuly", "success");
  };
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
      dialogClassName="reset-modal-dialog"
    >
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Edit Profile</h5>
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
              handleEditProfile(values, action);
            }}
            validationSchema={EditProfileVS}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <div className="mt-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="position-relative me-2">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange("firstname")}
                        value={values.firstname}
                        className="mb-4"
                      />
                    </FloatingLabel>
                    <div className="error">
                      {touched.firstname && errors.firstname
                        ? errors.firstname
                        : ""}
                    </div>
                  </div>
                  <div className="position-relative">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange("lastname")}
                        value={values.lastname}
                        className="mb-4"
                      />
                    </FloatingLabel>
                    <div className="error">
                      {touched.lastname && errors.lastname
                        ? errors.lastname
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Phone Number"
                  >
                    <Form.Control
                      type="phonenumber"
                      placeholder="Phone Number"
                      onChange={handleChange("phonenumber")}
                      value={values.phoneumber}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.phonenumber && errors.phonenumber
                      ? errors.phonenumber
                      : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel controlId="floatingPassword" label="DOB">
                    <Form.Control
                      type="date"
                      placeholder="DOB"
                      onChange={handleChange("DOB")}
                      value={values.DOB}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.DOB && errors.DOB ? errors.DOB : ""}
                  </div>
                </div>
                <button
                  className="w-100 btn login-btn mt-2"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    <p className="mb-0 login-btn-txt-size">Save</p>
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

export default EditProfileModal;
