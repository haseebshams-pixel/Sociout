import React from "react";
import FeatherIcon from "feather-icons-react";
import Form from "react-bootstrap/Form";
import { Modal, Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toastMessage } from "../../common/toast";
import { Formik } from "formik";
import { ChangePasswordVS } from "../../../utils/validation";
import "./style.css";

const ChangePasswordModal = ({ show, hide }) => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const handleChangePass = async (values, action) => {
    action.setSubmitting(false);
    hide();
    toastMessage("Password Updated Successfully", "success");
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
        <Modal.Body className="d-flex flex-column p-0 pb-3">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => {
              action.setSubmitting(true);
              handleChangePass(values, action);
            }}
            validationSchema={ChangePasswordVS}
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
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Old Password"
                  >
                    <Form.Control
                      type="password"
                      placeholder="old Password"
                      onChange={handleChange("oldPassword")}
                      value={values.oldPassword}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.oldPassword && errors.oldPassword
                      ? errors.oldPassword
                      : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="New Password"
                  >
                    <Form.Control
                      type="password"
                      placeholder="New Password"
                      onChange={handleChange("newPassword")}
                      value={values.newPassword}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.newPassword && errors.newPassword
                      ? errors.newPassword
                      : ""}
                  </div>
                </div>
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Confirm Password"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={handleChange("confirmPassword")}
                      value={values.confirmPassword}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.confirmPassword && errors.confirmPassword
                      ? errors.confirmPassword
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
                    <p className="mb-0 login-btn-txt-size">Change Password</p>
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

export default ChangePasswordModal;
