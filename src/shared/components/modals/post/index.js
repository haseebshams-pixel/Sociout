import React,{useState} from "react";
import FeatherIcon from "feather-icons-react";
import { Modal,Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toastMessage } from "../../common/toast";
import FileBase64 from 'react-file-base64';
import axios from "axios";
import "./style.css";

const PostModal = ({ show, hide,fetchPosts }) => {
  const user = useSelector((state) => state.root.user);
  const [textt, setText] = useState("");
  const [photoss, setPhotos] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const createPost = async () => {
    setSubmitting(true);
    // let formData = new FormData();
    // if (photos === null && text === "") {
    //   setSubmitting(false);
    //   toastMessage("Write Something", "error");
    // } else {
    //   if (photos != null) {
    //     for (let i = 0; i < photos.length; i++) {
    //       formData.append("photos", photos[i]);
    //     }
    //   }

    //   formData.append("text", text);
    const formData={
      text:textt,
      photos:photoss
    }
    console.log(formData);
      axios
        .post("posts/", formData, {
          headers: {
            // "Content-Type": "multipart/form-data",
            "x-auth-token": user?.token,
          },
        })
        .then((res) => {
          if (res.statusText === "OK") {
            setSubmitting(false);
            setText("");
            setPhotos([]);
            fetchPosts();
            hide();
            toastMessage("Post posted Successfully", "success");
          }
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
          hide();
          toastMessage("Failed to post post", "error");
        });
    
  };
  const onFileUpload=(e)=>{
    let files = e.target.files;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);

    fileReader.onload = (event) => {
      setPhotos(event.target.result)
    }
  }
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
                src={require("../../../../assets/images/profilePlaceholder.png")}
                className="profile-pic"
                alt="profile-pic"
              />
              <b className="ms-2">Haseeb Shams</b>
            </div>
            <select id="privacy" name="privacy" role="button">
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
            </select>
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
              <input type="file" name="file" role="button" id="file"  multiple
                onChange={(e) => onFileUpload(e)}/>
                
            </div>
            <label>{photoss?.length} files</label>
            {/* <FileBase64
          type="file"
          multiple={true}
          onDone={({ base64 }) => setPhotos(base64)}
        /> */}
            <button className="blog-modal-btn px-3 py-1" onClick={createPost}>
              {submitting ? <Spinner animation="grow" size="sm" /> : "Post"}
            </button>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default PostModal;
