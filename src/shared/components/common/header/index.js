import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SideNav from "./sideNav";
import { useHistory } from "react-router-dom";
import "./style.css";

export default function Header(props) {
  const history = useHistory();

  const [offCanvas, setOffCanvas] = useState(false);
  const [loader, setLoader] = useState(false);
  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            dispatch(resetUser());
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const navigate1 = (id) => {
    console.log(user?.user._id);
    history.push(`/home/${id}`);
  };

  const openSideNav = () => setOffCanvas(true);
  const closeSideNav = () => setOffCanvas(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.root.user);

  return (
    <div>
      <header>
        <div className="container">
          <div className="header-flex">
            <div className="logo">
              <Link to="/">
                <img
                  src={require("../../../../assets/svg/logo.svg").default}
                  alt="logo"
                />
              </Link>
            </div>
            <div className="cus-navigation">
              <nav>
                <ul role="button">
                  {user?.isLoggedIn && (
                    <>
                      <li role="button" className="nav-hover">
                        <Link
                          to="#"
                          onClick={() => navigate1(user.user._id)}
                          role="button"
                        >
                          Home
                        </Link>
                      </li>
                      {user?.user?.type === "bookreader" && (
                        <>
                          <li role="button" className="nav-hover">
                            <Link to="/offers" role="button">
                              Offers
                            </Link>
                          </li>
                          <li role="button" className="nav-hover">
                            <Link to="/" role="button">
                              Market Place
                            </Link>
                          </li>
                        </>
                      )}
                      {user?.user?.type === "publisher" && (
                        <li role="button" className="nav-hover">
                          <Link to="/publish" role="button">
                            Publish
                          </Link>
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </nav>

              {user?.isLoggedIn && (
                <>
                  <Link to="#">
                    <div className="profile-ctn">
                      <img
                        src={require("../../../../assets/images/profilePlaceholder.png")}
                        className="profile-pic"
                      />
                    </div>
                  </Link>
                  <li role="button" className="ml-3">
                    <FeatherIcon icon="bell" />
                  </li>
                  <button
                    onClick={signOutPressHandler}
                    className="custom-site-btn3"
                  >
                    Sign Out
                  </button>
                </>
              )}
              <div className="menu-bar">
                <i className="hamburger" onClick={openSideNav}>
                  <FeatherIcon icon="menu" />
                </i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="empty-header"></div>
      <SideNav offCanvas={offCanvas} closeSideNav={closeSideNav} user={user} />
    </div>
  );
}
