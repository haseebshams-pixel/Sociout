import React, { useState } from "react";
import CreateCard from "../../shared/components/common/createCard";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import JobCard from "../../shared/components/common/JobCard";

const Jobs = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="text-center search_searchinput"
          data-aos="fade-up"
          data-aos-duration="350"
        >
          <input
            type="text"
            className="w-100 mb-4 ps-3 pt-2 pb-2 pe-5 rounded search_inputag"
            placeholder="Search..."
          ></input>
          <span className="search_iconinside">
            <img
              src={require("../../assets/svg/search.svg").default}
              width="20"
              height="20"
              alt="search-logo"
            />
          </span>
        </div>
        <hr />
        <CreateCard
          openModal2={openModal}
          hideModal2={hideModal}
          open2={open}
          txt="Post a job"
          job
        />
        <hr />
        <div className="row">
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Jobs;
