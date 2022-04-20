import React, { useState } from "react";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import "./style.css";
import CreateCard from "../../shared/components/common/createCard";
import PostCard from "../../shared/components/common/postCard";
const Feed = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            <CreateCard
              openModal={openModal}
              hideModal={hideModal}
              open={open}
              txt="start a post"
            />
            <hr />
            <PostCard />
            <PostCard />
          </div>
        </div>
      </div>
      <div className="space" />
      <Footer />
    </>
  );
};

export default Feed;
