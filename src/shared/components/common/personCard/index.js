import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PersonCardLoader from "../../loaders/personCardLoader";
import { PhotoURL } from "../../../utils/endpoints";
import "./style.css";

const PersonCard = ({ item }) => {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = () => {
    history.push(`/profile/${item}`);
    //window.location.reload();
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`users/${item}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setCurrentUser(res.data);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  }, []);
  return (
    <div
      className="card personCard_card m-1 "
      data-aos="fade-up"
      data-aos-duration="600"
      onClick={navigate}
    >
      {loader ? (
        <PersonCardLoader />
      ) : (
        <>
          <img
            src={
              currentUser?.avatar
                ? PhotoURL + currentUser?.avatar
                : require("../../../../assets/images/profilePlaceholder.png")
            }
            className="p-3 person-card-img"
            width="200px"
            height="200px"
            alt="profile"
          />
          <h5 className="card-title ps-3 pb-3 person-card-title">
            {currentUser?.firstname + " " + currentUser?.lastname}
          </h5>
        </>
      )}
    </div>
  );
};

export default PersonCard;
