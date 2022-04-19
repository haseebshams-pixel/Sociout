import React from "react";
import './style.css'

const Footer = () => {
  return (
    <div className='d-flex flex-column fixed-bottom'>
      <footer className='footer d-flex bg-light flex-wrap justify-content-center'>
        <p className='footItem'>About</p>
        <p className='footItem'>Accessibility</p>
        <p className='footItem'>User Agreement</p>
        <p className='footItem'>Privacy Policy</p>
        <p className='footItem'>Cookie Policy</p>
        <p className='footItem'>Copyright Policy</p>
        <p className='footItem'>Brand Policy</p>
        <p className='footItem'>Guest Controls</p>
        <p className='footItem'>Community Guidelines</p>
      </footer>
    </div>
  );
};

export default Footer;
