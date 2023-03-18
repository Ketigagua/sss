import React from "react";
import "./UserCard.css";

const UserCard = ({ user, onUserClick, imageUrl }) => {
  const handleClick = () => {
    onUserClick(user.id);
  };
  return (
    <div className="userContainer" onClick={handleClick}>
      <div className="userContent">
        <div className="userImg">
          <img src={imageUrl} alt={user.name} />
        </div>

        <div className="userInfo">
          <div>
            <h2>{`${user.name} ${user.lastName}`}</h2>
            <p>{user.prefix}</p>
          </div>
          <div>
            <p className="userTitle">{user.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
