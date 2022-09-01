import React from "react";
import ContentLoader from "react-content-loader";

const PostContentLoader = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={50}
    viewBox="0 0 400 50"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}
  >
    <rect x="0" y="8" rx="3" ry="3" width="300" height="10" />
    <rect x="0" y="28" rx="3" ry="3" width="200" height="10" />
  </ContentLoader>
);

export default PostContentLoader;
