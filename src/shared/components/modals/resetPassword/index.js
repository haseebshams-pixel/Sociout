import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import Form from "react-bootstrap/Form";
import { Modal, Spinner } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toastMessage } from "../../common/toast";
import { Formik } from "formik";
import { ResetPasswordVS } from "../../../utils/validation";
import axios from "axios";
import "./style.css";

const ResetPasswordModal = ({ show, hide }) => {
  const initialValues = {
    email: "",
    otp: "",
    newpassword: "",
  };
  const [isEmail, setIsEmail] = useState(true);
  const [isOtp, setIsOtp] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const handleResetPass = async (values, action) => {
    axios
      .post(`users/forgot_pass/${values.email}`)
      .then((res) => {
        if (res.statusText === "OK") {
          action.setSubmitting(false);
          toastMessage(res.data, "success");
          setIsOtp(true);
          setIsEmail(false);
        }
      })
      .catch((error) => {
        console.log(error);
        action.setSubmitting(false);
        toastMessage(error.response.data, "error");
      });
  };
  const handleOTP = async (values, action) => {
    const data = {
      email: values.email,
      otp: values.otp,
    };
    axios
      .post("users/verify-otp", data)
      .then((res) => {
        if (res.statusText === "OK") {
          action.setSubmitting(false);
          toastMessage(res.data, "success");
          setIsPassword(true);
          setIsEmail(false);
          setIsOtp(false);
        }
      })
      .catch((error) => {
        console.log(error);
        action.setSubmitting(false);
        toastMessage(error.response.data, "error");
      });
  };
  const handlePassword = async (values, action) => {
    if (values.password === "") {
      toastMessage("Please Provide Password!", "error");
    } else {
      const data = {
        email: values.email,
        password: values.newpassword,
      };
      axios
        .put("users/set-pass", data)
        .then((res) => {
          if (res.statusText === "OK") {
            action.setSubmitting(false);
            toastMessage(res.data, "success");
            setIsPassword(false);
            setIsEmail(true);
            setIsOtp(false);
            hide();
          }
        })
        .catch((error) => {
          console.log(error);
          action.setSubmitting(false);
          toastMessage(error.response.data, "error");
        });
    }
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
              if (isEmail) {
                handleResetPass(values, action);
              } else if (isOtp) {
                handleOTP(values, action);
              } else if (isPassword) {
                handlePassword(values, action);
              }
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
                  {isEmail && (
                    <FloatingLabel controlId="floatingEmail" label="Email">
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        onChange={handleChange("email")}
                        value={values.email}
                        className="mb-4"
                      />
                    </FloatingLabel>
                  )}
                  {isOtp && (
                    <FloatingLabel controlId="floatingOTP" label="OTP">
                      <Form.Control
                        type="text"
                        placeholder="OTP"
                        onChange={handleChange("otp")}
                        value={values.otp}
                        className="mb-4"
                      />
                    </FloatingLabel>
                  )}
                  {isPassword && (
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="New Password"
                    >
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        onChange={handleChange("newpassword")}
                        value={values.newpassword}
                        className="mb-4"
                      />
                    </FloatingLabel>
                  )}
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
