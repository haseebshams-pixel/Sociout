import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import CreateCard from "../../shared/components/common/createCard";
import PostCard from "../../shared/components/common/postCard";
import Pagination from "../../shared/components/common/pagination";
import { Spinner } from "react-bootstrap";
const Feed = () => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 justify-content-center d-flex flex-column align-items-center">
            <CreateCard
              openModal={openModal}
              hideModal={hideModal}
              open={open}
              txt="start a post"
            />
            <hr />
            {loading ? (
              <Spinner animation="grow" size="xl" />
            ) : (
              currentPosts?.map((item, index) => {
                return <PostCard item={item} key={index} />;
              })
            )}
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>

      <div className="space" />
      <Footer />
    </>
  );
};

export default Feed;
