import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { toastMessage } from "../toast";
import { Formik } from "formik";
import { LoginVS } from "../../../utils/validation";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import "./style.css";
import ResetPasswordModal from "../../modals/resetPassword";
import FeatherIcon from "feather-icons-react";
const LoginCard = () => {
  const history = useHistory();
  const [reset, setReset] = useState(false);
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleLogIn = async (values, action) => {
    let resp = {
      isLoggedIn: true,
    };
    dispatch(setUser(resp));
    action.setSubmitting(false);
    history.push("/feed");
    toastMessage("User Logged In Successfully", "success");
  };
  const responseGoogle = async (response) => {
    console.log(response);
    // const data = {
    //   email: response.profileObj.email,
    //   firstname: response.profileObj.givenName,
    //   lastname: response.profileObj.familyName,
    //   googleId: response.profileObj.googleId,
    // };
    let resp = {
      isLoggedIn: true,
    };
    dispatch(setUser(resp));
    history.push("/feed");
    toastMessage("User Logged In Successfully", "success");
  };
  const responseFacebook = (response) => {
    console.log("Facebook", response);
    let resp = {
      isLoggedIn: true,
    };
    dispatch(setUser(resp));
    history.push("/feed");
    toastMessage("User Logged In Successfully", "success");
  };

  const openModal = () => {
    setReset(true);
  };
  const closeModal = () => {
    setReset(false);
  };
  return (
    <>
      <div className="card py-3 px-4 login-card-container">
        <h2 className="m-0">Sign in</h2>
        <span>Stay updated on your professional world</span>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, action) => {
            action.setSubmitting(true);
            handleLogIn(values, action);
          }}
          validationSchema={LoginVS}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
          }) => (
            <div className="mt-4">
              <div className="position-relative">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    onChange={handleChange("email")}
                    value={values.email}
                    className="mb-4"
                  />
                </FloatingLabel>
                <div className="error">
                  {touched.email && errors.email ? errors.email : ""}
                </div>
              </div>
              <div className="position-relative">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={handleChange("password")}
                    value={values.password}
                    className="mb-3"
                  />
                </FloatingLabel>
                <div className="error">
                  {touched.password && errors.password ? errors.password : ""}
                </div>
              </div>
              <div className="d-flex justify-content-end" onClick={openModal}>
                <span className="login-forgot-txt">Forgot password?</span>
              </div>
              <button
                className="w-100 btn login-btn mt-2"
                onClick={handleSubmit}
                type="submit"
              >
                {isSubmitting ? (
                  <Spinner animation="grow" size="sm" />
                ) : (
                  <p className="mb-0 login-btn-txt-size">Sign in</p>
                )}
              </button>
            </div>
          )}
        </Formik>
        <div className="mb-4 divider mt-4">
          <span className="divider-txt">OR</span>
        </div>
        <GoogleLogin
          clientId="325395712191-d421cqk40ijkvqukrbkemtil316tuj8i.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          className="rounded"
        />
        <FacebookLogin
          appId="514864707026991"
          autoLoad={false}
          fields="name,email,birthday,first_name,last_name"
          callback={responseFacebook}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="my-facebook-button-class mt-2 rounded d-flex align-items-center"
            >
              <FeatherIcon icon="facebook" className="me-3" />
              Continue with Facebook
            </button>
          )}
        />
        ,
      </div>
      <ResetPasswordModal show={reset} hide={closeModal} />
    </>
  );
};

export default LoginCard;
