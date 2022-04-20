import React from "react";
import PersonCard from "../../shared/components/common/personCard";
import "./style.css";

const Search = () => {
  return (
    <div className="container">
      <div className="text-center search_searchinput">
        <input
          type="text"
          className="w-100 mt-4 mb-4 ps-3 pt-2 pb-2 pe-5 rounded search_inputag"
          placeholder="Search..."
        ></input>
        <span className="search_iconinside">
          <img
            src={require("../../assets/svg/search.svg").default}
            width="22"
            height="22"
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
  );
};

export default Search;
