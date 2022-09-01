import React, { useState, useEffect } from "react";
import PersonCard from "../../shared/components/common/personCard";
import JobCard from "../../shared/components/common/JobCard";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import { Spinner } from "react-bootstrap";
import useDebounce from "../../shared/utils/useDebounce";
import axios from "axios";
import "./style.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [value, setValue] = useState("");
  const [results1, setResults1] = useState([]);
  const [results2, setResults2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("person");
  const GetSearchResults = () => {
    setLoading(true);
    let formData = {
      name: search,
    };
    searchType === "person"
      ? axios
          .post("search", formData)
          .then((res) => {
            if (res.statusText === "OK") {
              setResults1(res.data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          })
      : axios
          .post("search/jobs", formData)
          .then((res) => {
            if (res.statusText === "OK") {
              setResults2(res.data);
              setLoading(false);
            }
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
  };
  const handleChange = (e) => {
    setResults1([]);
    setResults2([]);
    setLoading(true);
    setSearch(e.target.value);
    if (e.key === "Enter") {
      GetSearchResults();
    }
  };
  useEffect(() => {
    GetSearchResults();
  }, [searchType, value]);

  useDebounce(
    () => {
      setValue(search);
    },
    [search],
    800
  );

  return (
    <>
      <Header />
      <div
        className="container d-flex row justify-content-center m-auto"
        data-aos="fade-up"
        data-aos-duration="350"
      >
        <div className="text-center search_searchinput col-10">
          <input
            type="text"
            className="w-100 mb-4 ps-3 pt-2 pb-2 pe-5 rounded search_inputag"
            placeholder="Search..."
            onKeyPress={(e) => handleChange(e)}
            onChange={(e) => handleChange(e)}
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
        <div className="col-2">
          <select
            name="type"
            id="type"
            className="select-tag search_inputag "
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="person">Person</option>
            <option value="jobs">Jobs</option>
          </select>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="grow" size="xl" />
          </div>
        ) : searchType === "person" ? (
          <div className="d-flex flex-wrap mx-100 justify-content-start">
            {results1.length > 0
              ? results1.map((item, index) => {
                  return <PersonCard key={index} item={item} />;
                })
              : "No User found❗"}
          </div>
        ) : (
          <div className="d-flex flex-wrap mx-100 justify-content-start">
            {results2.length > 0
              ? results2.map((item, index) => {
                  return <JobCard key={index} item={item} />;
                })
              : "No Jobs found❗"}
          </div>
        )}
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Search;
