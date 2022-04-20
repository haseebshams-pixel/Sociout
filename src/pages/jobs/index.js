import React from "react";
import JobCard from "../../shared/components/common/JobCard";

const Jobs = () => {
  return (
    <div class="container">
      <div class="row">
        <JobCard/>
        <JobCard/>
        <JobCard/>
      </div>
    </div>
  );
};

export default Jobs;
