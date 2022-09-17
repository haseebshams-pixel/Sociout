import React from "react";
import { useSelector } from "react-redux";
import { PhotoURL } from "../../../shared/utils/endpoints";
import "./style.css";

const PersonCard = ({
  item,
  setSelectedConversation,
  selectedConversation,
  setMsgs,
  fetchAllConversationMessages,
}) => {
  const { user } = useSelector((state) => state.root);
  return (
    <div
      className={`d-flex justify-content-between mt-2 pt-2 pb-2 ps-2 pe-2 singlePersonCard-mainContainer align-items-center rounded ${
        selectedConversation?._id === item?._id ? "bg-selected" : ""
      }`}
      onClick={() => {
        setSelectedConversation(item);
        fetchAllConversationMessages(item._id);
      }}
    >
      <div className="postCard-cmntimage">
        <img
          src={
            item?.user1?._id != user?.user?.id
              ? item?.user1?.avatar
                ? PhotoURL + item?.user1?.avatar
                : require("../../../assets/images/profilePlaceholder.png")
              : item?.user2?._id != user?.user?.id &&
                (item?.user2?.avatar
                  ? PhotoURL + item?.user2?.avatar
                  : require("../../../assets/images/profilePlaceholder.png"))
          }
          width="50px"
          height="50px"
          className="postCard-cmntimage"
          alt="profile-pic"
          role="button"
        />
      </div>

      <div className="w-100 ms-2  px-2 pt-1 rounded  justify-content-between d-none d-md-flex">
        <div>
          <strong>
            {item?.user1?._id != user?.user?.id
              ? `${item?.user1?.firstname} ${item?.user1?.lastname}`
              : item?.user2?._id != user?.user?.id &&
                `${item?.user2?.firstname}  ${item?.user2?.lastname}`}
          </strong>
          {/* <p>{item?.text}</p> */}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
