import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import "./style.css";
import NotificationsModal from "../../../modals/notifications";

const SideNav = ({ offCanvas, closeSideNav, user }) => {
  const [notifications, setNotifications] = useState(false);
  const openNotifications = () => {
    setNotifications(true);
    closeSideNav();
  };
  const closeNotifications = () => setNotifications(false);
  return (
    <>
      <div
        className={`offcanvas-backdrop ${offCanvas ? "show" : "fade"}`}
        onClick={closeSideNav}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`offcanvas offcanvas-end ${offCanvas && "show"}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <div className="offcanvas-title" id="offcanvasNavbarLabel">
            <Link to="/" onClick={closeSideNav}>
              <img
                src={require("../../../../../assets/svg/logo.svg").default}
                alt="logo"
                width="200"
              />
            </Link>
          </div>
          <i className="times" onClick={closeSideNav}>
            <FeatherIcon icon="x" />
          </i>
        </div>
        <div className="offcanvas-body">
          <div className="justify-content-end flex-grow-1 pe-3 navbar-nav">
            <ul className="header-list-style p-0">
              <li>
                <Link
                  className="d-flex flex-row align-items-center  header-list-item pb-3"
                  to="/feed"
                  onClick={closeSideNav}
                >
                  <FeatherIcon icon="home" size="20" className="me-2" />
                  Home
                </Link>
              </li>
              {user?.isLoggedIn && (
                <>
                  <li>
                    <Link
                      className="d-flex flex-row align-items-center  header-list-item pb-3"
                      to="/jobs"
                      onClick={closeSideNav}
                    >
                      <FeatherIcon
                        icon="briefcase"
                        size="20"
                        className="me-2"
                      />
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="d-flex flex-row align-items-center  header-list-item pb-3"
                      to="/search"
                      onClick={closeSideNav}
                    >
                      <FeatherIcon icon="search" size="20" className="me-2" />
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="d-flex flex-row align-items-center  header-list-item pb-3"
                      to="/profile/12345"
                      onClick={closeSideNav}
                    >
                      <FeatherIcon icon="user" size="20" className="me-2" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="d-flex flex-row align-items-center  header-list-item pb-3"
                      to="#"
                      onClick={openNotifications}
                    >
                      <FeatherIcon icon="bell" size="20" className="me-2" />
                      Notifications
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <NotificationsModal show={notifications} hide={closeNotifications} />
    </>
  );
};

export default SideNav;