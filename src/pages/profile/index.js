import React, { useState } from "react";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PostCard from "../../shared/components/common/postCard";
import PersonCard from "../../shared/components/common/personCard";
import EditProfileModal from "../../shared/components/modals/editProfile";
import "./style.css";
import UploadProfilePhotoModal from "../../shared/components/modals/uploadProfilePhoto";
const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const openModal = () => {
    setEdit(true);
  };
  const closeModal = () => {
    setEdit(false);
  };
  const openModal2 = () => {
    setUploadPhoto(true);
  };
  const closeModal2 = () => {
    setUploadPhoto(false);
  };
  return (
    <>
      <Header />
      <div className="container" data-aos="fade-up" data-aos-duration="650">
        <div className="px-4">
          <div className="bg-white rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="profile mr-3">
                  <img
                    src={require("../../assets/images/profilePlaceholder.png")}
                    alt="profilePic"
                    width="130"
                    className="rounded mb-2 img-thumbnail main-profile-pic"
                    onClick={openModal2}
                    role="button"
                  />
                </div>
                <div className="media-body profile-title-container text-white">
                  <h4 className="mt-0 text-font-family">Haseeb Shams</h4>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-between text-center">
              <a
                role="button"
                className="btn btn-outline-dark btn-sm btn-block text-font-family d-flex align-items-center"
                onClick={openModal}
              >
                Edit profile
              </a>
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block text-font-family">
                    0
                  </h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fas fa-image mr-1 text-font-family"></i>
                    Friends
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0 text-font-family">Bio</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-0 text-font-family">bio</p>
              </div>
            </div>
            <div className="py-4 px-4 mb-0">
              <Tabs
                defaultActiveKey="posts"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="posts" title="Posts">
                  <div className="row d-flex justify-content-center">
                    <div className="col-lg-7">
                      <PostCard />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="friends" title="Friends">
                  <div className="d-flex flex-wrap mx-100 justify-content-center">
                    <PersonCard />
                    <PersonCard />
                    <PersonCard />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="space" />
      <Footer />
      <EditProfileModal show={edit} hide={closeModal} />
      <UploadProfilePhotoModal show={uploadPhoto} hide={closeModal2} />
    </>
  );
};

export default Profile;
