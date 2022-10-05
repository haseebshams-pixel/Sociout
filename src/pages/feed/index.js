import React, { useEffect } from "react";
import useState from "react-usestateref";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../shared/components/common/header";
import Footer from "../../shared/components/common/footer";
import CreateCard from "../../shared/components/common/createCard";
import PostCard from "../../shared/components/common/postCard";
import { Spinner } from "react-bootstrap";
import SharePostCard from "../../shared/components/common/sharePostCard";
import Animation from "../../shared/components/common/animation";
import { NotFoundAnim } from "../../assets/index";
const Feed = () => {
  const { user } = useSelector((state) => state.root);
  const [posts, setPosts, postsRef] = useState([]);
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const hideModal = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const [newPostLength, setNewPostLength] = useState(0);
  const [skip, setSkip] = useState(0);

  const fetchPosts = async () => {
    setLoading(true);
    await axios
      .get(`posts/skiping/${skip}`)
      .then((res) => {
        if (res?.data) {
          setPosts([...posts, ...res.data]);
          setLoading(false);
          setNewPostLength(res?.data.length);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchPosts();
  }, [skip]);

  const scrollToEnd = () => {
    setSkip(posts?.length);
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
      <div className="container " data-aos="fade-up" data-aos-duration="350">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 justify-content-center d-flex flex-column align-items-center">
            {user?.isLoggedIn && (
              <>
                <CreateCard
                  openModal={openModal}
                  hideModal={hideModal}
                  open={open}
                  txt="start a post"
                />
                <hr className="w-100" />
              </>
            )}

            {posts?.length > 0 && (
              <>
                {posts?.map((item, index) => {
                  return item?.PostObject[0]?.isShared ? (
                    <SharePostCard item={item} key={index} />
                  ) : (
                    <PostCard
                      item={item}
                      key={index}
                      posts={posts}
                      setPosts={setPosts}
                    />
                  );
                })}
                {newPostLength == 0 && "Looks like we have reached end❗"}
              </>
            )}
            {loading ? (
              <Spinner animation="grow" size="xl" />
            ) : (
              posts?.length < 1 && (
                <Animation Pic={NotFoundAnim} Message="No Posts Found" />
              )
            )}
          </div>
        </div>
      </div>
      {posts?.length > 0 && <div className="space" />}
      <Footer />
    </>
  );
};

export default Feed;
