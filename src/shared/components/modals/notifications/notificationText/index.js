import React from "react";
import moment from "moment";

const NotificationText = ({ item }) => {
  return (
    <div className="d-flex justify-content-between ">
      <span className="py-1">
        <b>{item?.sender}</b> {item?.text}
      </span>
      <span className="py-1 text-muted pe-2">
        {moment(item?.date).fromNow()}
      </span>
    </div>
  );
};

export default NotificationText;
