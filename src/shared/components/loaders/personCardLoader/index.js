import React from "react";
import ContentLoader from "react-content-loader";

const PersonCardLoader = (props) => (
  <ContentLoader
    speed={1}
    width={205}
    height={250}
    viewBox="0 0 205 250"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}
  >
    <rect x="10" y="10" rx="0" ry="0" width="182" height="200" />
    <rect x="10" y="220" rx="0" ry="0" width="40" height="10" />
  </ContentLoader>
);

export default PersonCardLoader;
