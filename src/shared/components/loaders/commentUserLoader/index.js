import React from "react";
import ContentLoader from "react-content-loader";

const CommentUserLoader = (props) => (
  <ContentLoader
    speed={1}
    width={200}
    height={60}
    viewBox="0 0 200 60"
    backgroundColor="#6f6d6d"
    foregroundColor="#a8a8a8"
    {...props}
  >
    <rect x="0" y="8" rx="3" ry="3" width="88" height="12" />
    <rect x="0" y="30" rx="3" ry="3" width="48" height="10" />
  </ContentLoader>
);

export default CommentUserLoader;
