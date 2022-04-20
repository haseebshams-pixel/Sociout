import React from "react";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import JobCard from "../../shared/components/common/JobCard";

const Jobs = () => {
  return (
    <>
      <Header />
      <div class="container">
        <div className="text-center search_searchinput">
          <input
            type="text"
            className="w-100 mt-4 mb-4 ps-3 pt-2 pb-2 pe-5 rounded search_inputag"
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
        <div class="row">
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
