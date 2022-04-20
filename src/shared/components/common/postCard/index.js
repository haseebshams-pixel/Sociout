import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import FeatherIcon from "feather-icons-react";

import "./style.css";

function PostCard() {
  const [like, setLike] = useState(false);
  return (
    <div className="card-container" data-aos="fade-up" data-aos-duration="650">
      <Card className="card-main-container">
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <Card.Title className="d-flex align-items-center m-0">
              <img
                src={require("../../../../assets/images/profilePlaceholder.png")}
                className="profile-pic"
                alt="profile-pic"
              />
              <span className="ms-2">Haseeb Shams</span>
            </Card.Title>
            <Card.Subtitle className="text-muted">just now</Card.Subtitle>
          </div>
          <Card.Text>Hello friends! wazzup!!</Card.Text>
          <Carousel className="carosal">
            <Carousel.Item>
              <img
                className="carosal-image"
                src={require("../../../../assets/images/test.png")}
                alt="First slide"
              />
            </Carousel.Item>
          </Carousel>
          <div className="d-flex align-items-center justify-content-between">
            <span>0 Likes</span>
            <span>0 comments</span>
          </div>
          <hr className="mt-2 mb-3" />
          <div className="d-flex align-items-center justify-content-between">
            <button className="postCard-btn" onClick={() => setLike(true)}>
              {!like ? (
                <FeatherIcon icon="heart" />
              ) : (
                <FeatherIcon icon="heart" fill="red" />
              )}
              Like
            </button>
            <button className="postCard-btn">
              <FeatherIcon icon="message-square" />
              Comment
            </button>
            <button className="postCard-btn">
              <FeatherIcon icon="share" />
              Share
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PostCard;
