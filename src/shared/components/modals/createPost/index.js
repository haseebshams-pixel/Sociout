import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import { Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toastMessage } from "../../common/toast";
import { PhotoURL } from "../../../utils/endpoints";
import "./style.css";

const PostModal = ({ show, hide }) => {
  const user = useSelector((state) => state.root.user);
  const [textt, setText] = useState("");
  const [photoss, setPhotos] = useState([]);
  const [photosCount, setPhotosCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const createPost = async () => {
    setSubmitting(true);
    if (photoss.length === 0 && textt === "") {
      setSubmitting(false);
      toastMessage("Write Something!", "error");
    } else {
      let formData = new FormData();
      if (photoss != null) {
        for (let i = 0; i < photoss.length; i++) {
          formData.append("photos", photoss[i]);
        }
      }
      formData.append("text", textt);
      axios
        .post("posts/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            setSubmitting(false);
            setText("");
            setPhotos([]);
            hide();
            window.location.reload();
            setPhotosCount(0);
            toastMessage("Post posted Successfully", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          hide();
          toastMessage("Failed to post post", "error");
        });
    }
  };
  const onFileUpload = (e) => {
    let files = e.target.files;
    setPhotosCount(files.length);
    setPhotos(files);
  };

  return (
    <Modal
      show={show}
      onHide={hide}
      animation
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-top-margin"
    >
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <h3 className="m-0">Create a post</h3>
          <div className="close-icon-container" onClick={hide}>
            <FeatherIcon
              icon="x"
              role="button"
              width="25"
              className="close-icon"
            />
          </div>
        </div>
        <hr className="m-0 mb-3 mt-2" />
        <Modal.Body className="d-flex flex-column p-0">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img
                src={
                  user?.user?.avatar
                    ? PhotoURL + user?.user?.avatar
                    : require("../../../../assets/images/profilePlaceholder.png")
                }
                className="profile-pic"
                alt="profile-pic"
              />
              <b className="ms-2">
                {user?.user?.firstname} {user?.user?.lastname}
              </b>
            </div>
          </div>
          <div className="pt-3">
            <textarea
              className="form-control border-0"
              rows="5"
              placeholder="what do you want to talk about?"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
          <div className="d-flex justify-content-between mt-4 align-items-center">
            <div className="image">
              <label htmlFor="file" role="button">
                <FeatherIcon icon="camera" />
              </label>
              <input
                type="file"
                name="file"
                role="button"
                id="file"
                multiple
                onChange={(e) => onFileUpload(e)}
              />
              <label>{photosCount} files</label>
            </div>
            <button className="post-modal-btn px-3 py-1" onClick={createPost}>
              {submitting ? <Spinner animation="grow" size="sm" /> : "Post"}
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default PostModal;
