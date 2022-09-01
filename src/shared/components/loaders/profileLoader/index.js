import React from "react";
import ContentLoader from "react-content-loader";

const ProfileLoader = (props) => (
  <ContentLoader
    speed={1}
    width={180}
    height={260}
    viewBox="0 0 180 260"
    backgroundColor="#d9d9d9"
    foregroundColor="#f0f0f0"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="160" height="150" />
    <rect x="0" y="160" rx="0" ry="0" width="80" height="20" />
  </ContentLoader>
);

export default ProfileLoader;
