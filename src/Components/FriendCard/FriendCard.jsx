import React, { useRef, useEffect } from "react";
import "./FriendCard.css";

const FriendCard = ({ friend, onLoadMore }) => {
  const observer = useRef();

  const handleObserver = async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      onLoadMore();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current) {
      observer.current.observe(document.querySelector(".friend-card-bottom"));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="friend-container">
      {friend?.imageUrl && (
        <div className="userImg">
          <img src={friend.imageUrl} alt={friend.name} />
        </div>
      )}
      <h2>{`${friend?.name} ${friend?.lastName}`}</h2>
      <p>{friend?.prefix}</p>
      <p>{friend?.title}</p>
      <div className="friend-card-bottom"></div>
    </div>
  );
};

export default FriendCard;
