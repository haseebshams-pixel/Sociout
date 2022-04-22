import React from "react";
import FeatherIcon from "feather-icons-react";
import { Modal } from "react-bootstrap";
import "./style.css";

const JobPostModal = ({ show, hide }) => {
  return (
    <Modal show={show} animation backdrop="static" keyboard={false}>
      <div className="p-3">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">
            Frontend Developer - Part-Time, Bloom Institute of Technology
            (BloomTech) (Remote) - $30,000/year USD
          </h5>
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
            <small className="text-muted">Coding Pixel</small>
            <small className="mx-1 text-muted">-</small>
            <small className="text-muted">Lahore, Punjab, Pakistan</small>
          </div>
          <small style={{ color: "#3ec786" }}>2 hours ago</small>
        </div>
        <hr className="m-0 mb-3 mt-2" />
        <Modal.Body className="d-flex flex-column p-0 pb-3">
          <div className="d-flex">
            <FeatherIcon icon="briefcase" />
            <span className="ms-2 ">Full Time - Associate</span>
          </div>
          <div className="d-flex mt-2">
            <FeatherIcon icon="map-pin" />
            <span className="ms-2">Lahore, Punjab, Pakistan</span>
          </div>
          <div className="d-flex mt-2">
            <FeatherIcon icon="mail" />
            <a
              href="mailto:codingpixel@gmail.com"
              className="ms-2 login-forgot-txt text-decoration-none"
            >
              Send your resumé here!
            </a>
          </div>
          <hr className="m-0 mb-3 mt-2" />
          <span>
            Crossover is the world's #1 source of remote jobs. Our clients offer
            top-tier pay for top-tier talent. We're recruiting this role for our
            client, Bloom Institute of Technology (BloomTech). Have you got what
            it takes? If you’re eager to impart your knowledge of computer
            science fundamentals, but aren’t sure where to start - keep reading!
            Bloom Institute of Technology (BloomTech) is looking for part-time
            JavaScript developers to teach in an immersive, live, online
            classroom. You will set your schedule, choosing the weekly classes
            that work for your life. You will teach new developers the
            fundamentals of computer science: algorithmic problem-solving, Big-O
            and time-space complexity, and how to use hash tables to to optimize
            algorithms. You will prepare these new students for exciting careers
            in software development, ensuring they can pass the General Coding
            Assessment at the end of their studies. BloomTech is committed to
            building a diverse team of staff and instructors where everyone
            feels seen, heard, and valued. Therefore, we welcome a diverse pool
            of applicants, including those from historically marginalized groups
            and non-traditional backgrounds who can appreciate the diverse
            student communities we serve. If you’re passionate about JavaScript
            and computer science and ready to share your top-notch skills, apply
            today! What You Will Be Doing Teaching on Zoom via live code-along,
            explaining complex concepts simply, using real-life examples,
            exercises, and storytelling Providing learner support, encouraging
            struggling learners, and challenging those who are excelling
            Providing curriculum feedback and reporting learner progress What
            You Won’t Be Doing Managing other instructors or teaching assistants
            Tutoring students - your professional expertise forms the foundation
            of teaching the technical skills required for success in the real
            world Traveling for conferences, meetings, or training; we are a
            100% remote team Frontend Developer Key Responsibilities Prepare
            learners to pass the General Coding Assessment, launching their new
            career as a software engineer
          </span>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default JobPostModal;
