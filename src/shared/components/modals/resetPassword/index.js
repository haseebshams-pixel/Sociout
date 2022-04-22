import React from "react";
import FeatherIcon from "feather-icons-react";
import Form from "react-bootstrap/Form";
import { Modal, Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toastMessage } from "../../common/toast";
import { Formik } from "formik";
import { ResetPasswordVS } from "../../../utils/validation";
import "./style.css";

const ResetPasswordModal = ({ show, hide }) => {
  const initialValues = {
    email: "",
  };
  const handleResetPass = async (values, action) => {
    action.setSubmitting(false);
    hide();
    toastMessage("Check your mail", "success");
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
      <div className="p-3 ">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Reset Password</h5>
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
              handleResetPass(values, action);
            }}
            validationSchema={ResetPasswordVS}
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
                  <FloatingLabel controlId="floatingEmail" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={handleChange("email")}
                      value={values.email}
                      className="mb-4"
                    />
                  </FloatingLabel>
                  <div className="error">
                    {touched.email && errors.email ? errors.email : ""}
                  </div>
                </div>
                <button
                  className="w-100 btn login-btn mt-2"
                  onClick={handleSubmit}
                >
                  {isSubmitting ? (
                    <Spinner animation="grow" size="sm" />
                  ) : (
                    <p className="mb-0 login-btn-txt-size">Reset</p>
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

export default ResetPasswordModal;
