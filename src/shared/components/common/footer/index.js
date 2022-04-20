import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <div className="d-flex flex-column ">
      <footer className="footer mt-auto d-flex bg-light flex-wrap justify-content-center align-items-center  mb-3 fixed-bottom">
        <img
          className="footLogo"
          src={require("../../../../assets/svg/logo.svg").default}
        />
        <p className="footItem">About</p>
        <p className="footItem">Accessibility</p>
        <p className="footItem">User Agreement</p>
        <p className="footItem">Privacy Policy</p>
        <p className="footItem">Cookie Policy</p>
        <p className="footItem">Copyright Policy</p>
        <p className="footItem">Brand Policy</p>
        <p className="footItem">Guest Controls</p>
        <p className="footItem">Community Guidelines</p>
      </footer>
    </div>
  );
};

export default Footer;
