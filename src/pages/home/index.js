import React, { useState } from "react";
import Footer from "../../shared/components/common/footer";
import LoginCard from "../../shared/components/common/loginCard";
import SignUpCard from "../../shared/components/common/signupCard";
const Home = () => {
  const [card, setCard] = useState(true);
  return (
    <>
      <div className="container d-flex align-items-start justify-content-center row m-auto mt-5 mb-5">
        <div className="col-lg-6 d-flex flex-column align-items-lg-start align-items-center justify-content-center">
          <img
            src={require("../../assets/svg/logo.svg").default}
            height="80"
            alt="logo"
          />
          <h4 className="my-4">
            Sociout helps you connect and share with the people in your life.
          </h4>
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          {card ? <LoginCard /> : <SignUpCard />}
        </div>
        <div className="d-flex justify-content-end row mt-3">
          <div className="col-lg-6 d-flex  justify-content-center">
            <span className="me-1">
              {card ? "New to Sociout?" : "Already have an account?"}
            </span>
            <span className="login-forgot-txt" onClick={() => setCard(!card)}>
              <b>{card ? "Join Now" : "Sign In"}</b>
            </span>
          </div>
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Home;
