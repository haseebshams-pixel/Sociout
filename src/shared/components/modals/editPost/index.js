import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { Spinner } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toastMessage } from "../../common/toast";
import { PhotoURL } from "../../../utils/endpoints";
import "./style.css";

const EditPostModal = ({ show, hide, item, setItem }) => {
  const user = useSelector((state) => state.root.user);
  const [localItem, setLocalItem] = useState(item);
  const [text, setText] = useState(item?.text);
  const [photos, setPhotos] = useState(item?.images);
  const [removedPhotos, setRemovedPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]);
  const [photosCount, setPhotosCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const editBlog = async () => {
    setSubmitting(true);
    if (photos.length === 0 && text === "" && newPhotos === null) {
      setSubmitting(false);
      toastMessage("Write Something", "error");
    } else {
      let formData = new FormData();
      if (newPhotos != null) {
        for (let i = 0; i < newPhotos.length; i++) {
          formData.append("photos", newPhotos[i]);
        }
      }
      formData.append("text", text);
      formData.append("postedBy", localItem?.postedBy);
      formData.append("removedImages", JSON.stringify(removedPhotos));
      formData.append("images", JSON.stringify(photos));
      axios
        .put(`posts/${localItem?._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res?.data) {
            setSubmitting(false);
            setPhotos(res?.data?.images);
            setNewPhotos([]);
            let tempObj = { ...localItem };
            tempObj.images = res?.data?.images;
            tempObj.text = res?.data?.text;
            setItem(tempObj);
            hide();
            toastMessage("Post updated Successfully", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          hide();
          toastMessage(error.response.data, "error");
        });
    }
  };

  const removeImage = (val) => {
    var filtered = photos.filter(function (value, index, arr) {
      return value !== val;
    });
    setPhotos(filtered);
    let obj = [...removedPhotos];
    obj.push(val);
    setRemovedPhotos(obj);
  };
  const onFileUpload = (e) => {
    let files = e.target.files;
    setPhotosCount(files.length);
    setNewPhotos(files);
  };

  useEffect(() => {
    setLocalItem(item);
    setText(item?.text);
    setPhotos(item?.images);
  }, [item]);

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
          <h3 className="m-0">Edit Post</h3>
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
              value={text}
              placeholder="what do you want to talk about?"
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="d-flex flex-wrap mt-2">
              {photos?.map((val, ind) => {
                return (
                  <div key={ind} className="position-relative">
                    <img
                      src={PhotoURL + val}
                      className="edit-image"
                      alt="post-photo"
                    />
                    <FeatherIcon
                      icon={"x-circle"}
                      size="20"
                      className="cross-icon"
                      onClick={() => removeImage(val)}
                    />
                  </div>
                );
              })}
            </div>
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
            <button className="post-modal-btn px-3 py-1" onClick={editBlog}>
              {submitting ? <Spinner animation="grow" size="sm" /> : "Post"}
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default EditPostModal;
