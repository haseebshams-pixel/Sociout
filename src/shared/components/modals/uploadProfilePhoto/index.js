import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Modal, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/reducers/userSlice";
import { toastMessage } from "../../common/toast";
import axios from "axios";
import "./style.css";
import { PhotoURL } from "../../../utils/endpoints";

const UploadProfilePhotoModal = ({ show, hide, user }) => {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [userPhoto, setUserPhoto] = useState("");
  const [localUserAvatar, setLocalUserAvatar] = useState(
    PhotoURL + user?.user?.avatar
  );
  const [avatar, setAvatar] = useState(user?.user?.avatar);
  const handleFiles = (e) => {
    let file = e.target.files[0];
    const fileImage = URL.createObjectURL(file);
    setLocalUserAvatar(undefined);
    setUserPhoto(fileImage);
    setAvatar(file);
  };
  const handleDelete = (e) => {
    setLocalUserAvatar(undefined);
    setUserPhoto(undefined);
    setAvatar(null);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    let formData = new FormData();
    formData.append("file", avatar);
    if (avatar) {
      axios
        .put("users/change_profile", formData, {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res?.data) {
            let obj = {
              ...user,
              user: res.data,
            };

            dispatch(setUser(obj));
            hide();
            toastMessage("User Photo Updated Successfully", "success");
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          toastMessage(error, "error");
        });
    } else {
      axios
        .delete("users/delete_profile_photo", {
          headers: {
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res?.data) {
            let obj = {
              ...user,
              user: res.data,
            };

            dispatch(setUser(obj));
            hide();
            toastMessage("User Photo Updated Successfully", "success");
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          toastMessage(error, "error");
        });
    }
  };
  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
      className=""
    >
      <div className="p-3 profile-modal-container">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className="m-0 w-75">Profile Photo</h5>
          <div className="close-icon-container" onClick={hide}>
            <FeatherIcon icon="x" role="button" width="25" />
          </div>
        </div>

        <Modal.Body className="d-flex flex-column p-0 ">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={
                localUserAvatar
                  ? localUserAvatar
                  : userPhoto
                  ? userPhoto
                  : require("../../../../assets/images/profilePlaceholder.png")
              }
              alt="profile-pic"
              className="upload-profile-placeHolder"
            />
          </div>
          <hr className="m-0 mb-3 mt-3" />
          <div className="d-flex justify-content-between align-items-center">
            <div className="image">
              <label htmlFor="file" role="button">
                <FeatherIcon icon="camera" />
              </label>
              <input
                type="file"
                name="file"
                role="button"
                id="file"
                onChange={handleFiles}
              />
            </div>
            <div>
              <FeatherIcon icon="trash" role="button" onClick={handleDelete} />
              <button
                className="post-modal-btn px-3 py-1 ms-3"
                onClick={handleSubmit}
              >
                {submitting ? <Spinner animation="grow" size="sm" /> : "Save"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default UploadProfilePhotoModal;
