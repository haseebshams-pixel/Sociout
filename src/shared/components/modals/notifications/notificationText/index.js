import React from "react";

const NotificationText = (props) => {
  return (
    <div className="d-flex justify-content-between ">
      <span className="py-1">
        <b>{props.user}</b> {props.text}
      </span>
      <span className="py-1 text-muted pe-2">just now</span>
    </div>
  );
};

export default NotificationText;
