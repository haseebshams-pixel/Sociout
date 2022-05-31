import React, { useState } from "react";
import JobPostModal from "../../modals/jobPost";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import moment from "moment";
import { useSelector } from "react-redux";
import { toastMessage } from "../toast";
import "./style.css";
import CreateJobModal from "../../modals/createJob";

const JobCard = ({ item }) => {
  const { user } = useSelector((state) => state.root);
  console.log(item);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const openModal2 = () => {
    setOpen2(true);
  };
  const closeModal2 = () => {
    setOpen2(false);
  };

  const onDelete = async () => {
    axios
      .delete(`jobs/${item?._id}`, {
        headers: {
          "x-auth-token": user?.token,
        },
      })
      .then((res) => {
        if (res.statusText === "OK") {
          toastMessage("Deleted Successfuly", "success");
          window.location.reload();
        }
      })
      .catch((error) => {
        toastMessage(error.response.data, "error");
        console.log(error);
      });
  };
  return (
    <>
      <div className="col-md-6" data-aos="fade-up" data-aos-duration="600">
        <div className="jobCard card d-flex p-3 m-2">
          <div className="d-flex justify-content-between">
            <label className="jobTitle" onClick={openModal}>
              {" "}
              {item?.title}
            </label>
            <div className="d-flex justify-content-center align-items-center">
              {user?.user?.id === item?.postedBy && (
                <>
                  <FeatherIcon
                    icon="edit-2"
                    size="18"
                    role="button"
                    onClick={openModal2}
                  />
                  <FeatherIcon
                    icon="trash"
                    size="18"
                    className="ms-2"
                    role="button"
                    onClick={onDelete}
                  />
                </>
              )}
            </div>
          </div>
          <div className="jobSubtitle">{item?.companyName}</div>
          <div className="jobSubtitle">{item?.location}</div>
          <div className="posted d-flex justify-content-end">
            {moment(item?.date).fromNow()}
          </div>
        </div>
      </div>
      <JobPostModal show={open} hide={closeModal} item={item} />
      <CreateJobModal
        show={open2}
        hide={closeModal2}
        item={item}
        isEdit={true}
      />
    </>
  );
};

export default JobCard;
