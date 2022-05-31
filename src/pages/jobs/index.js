import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateCard from "../../shared/components/common/createCard";
import Footer from "../../shared/components/common/footer";
import Header from "../../shared/components/common/header";
import JobCard from "../../shared/components/common/JobCard";
import { Spinner } from "react-bootstrap";

const Jobs = () => {
  const { user } = useSelector((state) => state.root);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [skip, setSkip] = useState(0);
  const fetchJobs = async () => {
    setLoading(true);
    axios
      .get(`jobs/skiping/${skip}`)
      .then((res) => {
        if (res.statusText === "OK") {
          setJobs([...jobs, ...res.data]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchJobs();
  }, [skip]);

  const scrollToEnd = () => {
    setSkip(jobs.length);
  };

  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        {user?.isLoggedIn && (
          <CreateCard
            openModal2={openModal}
            hideModal2={hideModal}
            open2={open}
            txt="Post a job"
            job
          />
        )}
        <hr />
        <div className="row">
          {jobs?.map((item, index) => {
            return <JobCard item={item} key={index} />;
          })}
        </div>
        <div className="d-flex  align-items-center justify-content-center">
          {loading && <Spinner animation="grow" size="xl" />}
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Jobs;
