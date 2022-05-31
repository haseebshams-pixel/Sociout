import React, { useState } from "react";
import PersonCard from "../../shared/components/common/personCard";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import "./style.css";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setResults([]);
    if (e.key === "Enter") {
      setLoading(true);
      setSearch(e.target.value);
      let formData = {
        name: e.target.value,
      };
      axios
        .post("search", formData)
        .then((res) => {
          if (res.statusText === "OK") {
            setResults(res.data);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Header />
      <div className="container" data-aos="fade-up" data-aos-duration="350">
        <div className="text-center search_searchinput">
          <input
            type="text"
            className="w-100 mb-4 ps-3 pt-2 pb-2 pe-5 rounded search_inputag"
            placeholder="Search..."
            onKeyPress={(e) => handleChange(e)}
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
          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" size="xl" />
            </div>
          ) : (
            results.map((item, index) => {
              return <PersonCard key={index} item={item} />;
            })
          )}
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Search;
