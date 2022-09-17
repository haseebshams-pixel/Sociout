import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetUser } from "../../../redux/reducers/userSlice";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SideNav from "./sideNav";
import { useHistory } from "react-router-dom";
import "./style.css";
import NotificationsModal from "../../modals/notifications";
import { socket } from "../../../services/socket.service";
import { PhotoURL } from "../../../utils/endpoints";

export default function Header() {
  const user = useSelector((state) => state.root.user);
  const history = useHistory();
  const [offCanvas, setOffCanvas] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [loader, setLoader] = useState(false);
  const [listNotify, setListNotify] = useState(null);
  const dispatch = useDispatch();
  const navigate = (id) => {
    history.push(`/profile/${id}`);
  };
  const signOutPressHandler = () => {
    confirmAlert({
      message: "Are you sure you want to Sign Out?",
      className: "d-flex justify-content-center",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            history.push("/");
            dispatch(resetUser());
            socket.emit("removeUser", {
              userId: user?.user?.id,
            });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const openSideNav = () => setOffCanvas(true);
  const closeSideNav = () => setOffCanvas(false);
  const openNotifications = () => {
    setListNotify(null);
    setLoader(true);
    setNotifications(true);
    axios
      .get("notifications/", {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          setListNotify(res.data);
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setLoader(false);
      });
  };
  const closeNotifications = () => setNotifications(false);
  return (
    <div>
      <header className="header py-1">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <Link to="/feed">
              <img
                src={require("../../../../assets/svg/logo.svg").default}
                width="200"
                alt="logo"
              />
            </Link>
          </div>
          <div>
            <nav className="d-flex">
              <ul className="p-0 m-0 header-list-style d-lg-flex d-none">
                <li>
                  <Link
                    className="d-flex flex-column align-items-center justify-content-center header-list-item"
                    to="/feed"
                  >
                    <FeatherIcon icon="home" size="20" />
                    <small className="font-weight-light">Home</small>
                  </Link>
                </li>
                {user?.isLoggedIn && (
                  <>
                    <li>
                      <Link
                        className="d-flex flex-column align-items-center justify-content-center header-list-item"
                        to="/jobs"
                      >
                        <FeatherIcon icon="briefcase" size="20" />
                        <small className="font-weight-light">Jobs</small>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="d-flex flex-column align-items-center justify-content-center header-list-item"
                        to="/search"
                      >
                        <FeatherIcon icon="search" size="20" />
                        <small className="font-weight-light">Search</small>
                      </Link>
                    </li>
                    <li role="button">
                      <Link
                        className="d-flex flex-column align-items-center justify-content-center header-list-item"
                        to="/chat"
                      >
                        <FeatherIcon icon="message-circle" size="20" />
                        <small className="font-weight-light">Chat</small>
                      </Link>
                    </li>
                    <li role="button">
                      <Link
                        className="d-flex flex-column align-items-center justify-content-center header-list-item"
                        to="#"
                        onClick={openNotifications}
                      >
                        <FeatherIcon icon="bell" size="20" />
                        <small className="font-weight-light">
                          Notifications
                        </small>
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={() => navigate(user?.user?.id)}
                        to="#"
                        className="d-flex flex-column align-items-center justify-content-center header-list-item"
                      >
                        <div className="profile-ctn">
                          <img
                            src={
                              user?.user?.avatar
                                ? PhotoURL + user?.user?.avatar
                                : require("../../../../assets/images/profilePlaceholder.png")
                            }
                            className="profile-pic"
                            alt="profile-pic"
                          />
                        </div>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              {user?.isLoggedIn && (
                <button
                  onClick={signOutPressHandler}
                  className="header-signout-btn"
                >
                  Sign Out
                </button>
              )}
              {!user?.isLoggedIn && (
                <>
                  <button
                    onClick={() => {
                      history.push("/");
                    }}
                    className="header-signout-btn"
                  >
                    Sign up
                  </button>
                  <button
                    onClick={() => {
                      history.push("/");
                    }}
                    className="header-signout-btn"
                  >
                    Log in
                  </button>
                </>
              )}
              <div className="menu-bar d-lg-none d-flex">
                <i className="hamburger" onClick={openSideNav}>
                  <FeatherIcon icon="menu" />
                </i>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className="empty-header" />
      <SideNav offCanvas={offCanvas} closeSideNav={closeSideNav} user={user} />
      <NotificationsModal
        show={notifications}
        hide={closeNotifications}
        listNotify={listNotify}
        loader={loader}
      />
    </div>
  );
}
