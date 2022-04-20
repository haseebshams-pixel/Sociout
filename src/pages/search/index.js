import React from "react";
import PersonCard from "../../shared/components/common/personCard";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import "./style.css";

const Search = () => {
  return (
    <>
      <Header />
      <div className="container" data-aos="fade-up" data-aos-duration="350">
        <div className="text-center search_searchinput">
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
              alt="search-icon"
            />
          </span>
        </div>
        <div className="d-flex flex-wrap mx-100 justify-content-center">
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
          <PersonCard />
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Search;
