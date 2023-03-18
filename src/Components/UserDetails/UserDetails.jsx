import { useState, useRef, useEffect } from "react";
import FriendCard from "../FriendCard/FriendCard";
import "./UserDetails.css";

const Details = ({ user, friends, hasMoreFriends, onLoadMoreFriendsClick }) => {
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

  const handleLoadMoreFriends = () => {
    onLoadMoreFriendsClick(user?.id, page);
    setPage(page + 1);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 20
    ) {
      handleLoadMoreFriends();
    }
  };

  useEffect(() => {
    if (hasMoreFriends) {
      handleLoadMoreFriends();
    }
  }, []);

  return (
    <div ref={containerRef} className="details-container">
      <div className="user-details-container__item">
        <div className="usersImg">
          {user?.imageUrl && <img src={user.imageUrl} alt={user.name} />}
        </div>
        <div className="userAbout">
          <p>{user?.prefix}</p>
          <p>{user?.title}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="friends-container">
        {friends?.map((friend) => (
          <FriendCard
            key={friend?.id}
            friend={friend}
            imageUrl={friend?.imageUrl}
          />
        ))}
        {hasMoreFriends && <div>Loading...</div>}
      </div>
    </div>
  );
};

const UserDetails = ({
  user,
  friends,
  hasMoreFriends,
  onLoadMoreFriendsClick,
  children,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="user-details-container">
      {showDetails ? (
        <Details
          user={user}
          friends={friends}
          hasMoreFriends={hasMoreFriends}
          onLoadMoreFriendsClick={onLoadMoreFriendsClick}
        />
      ) : (
        <div className="user-details-container__item">
          <div className="items">
            <div className="usersRegalie">
              {user?.imageUrl && <img src={user.imageUrl} alt={user.name} />}
              <div className="userAbout">
                <p>{user?.prefix}</p>
                <p>{user?.title}</p>
                <p>{user?.about}</p>
              </div>
            </div>

            <div className="usersInform">{children}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
