import React, { useState, useEffect } from "react";
import UserCard from "./Components/UserCard/UserCard";
import UserDetails from "./Components/UserDetails/UserDetails";
import FriendCard from "./Components/FriendCard/FriendCard";
import Navigation from "./Components/NavBar/NavBar";
import "./App.css";

const apiUrl =
  "http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/";
const size = 10;

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsPage, setFriendsPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${apiUrl}${currentPage}/${size}`);
      const data = await response.json();
      if (data.list.length > 0) {
        const usersWithImages = data.list.map((user) => ({
          ...user,
          imageUrl: `https://picsum.photos/id/${user.id}/200`,
        }));
        setUsers([...users, ...usersWithImages]);
        setCurrentPage(currentPage + 1);
      } else {
        setHasMoreUsers(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      const response = await fetch(`${apiUrl}${selectedUserId}`);
      const data = await response.json();
      setSelectedUser(data);
    };

    if (selectedUserId) {
      fetchSelectedUser();
    }
  }, [selectedUserId]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const handleShowFriendsClick = async (userId) => {
    setFriendsPage(1);
    setHasMoreFriends(true);
    const response = await fetch(`${apiUrl}${userId}/friends/1/${size}`);
    const data = await response.json();
    setFriends(data.list);
  };

  const handleLoadMoreFriends = async () => {
    if (!hasMoreFriends) {
      return;
    }

    const response = await fetch(
      `${apiUrl}${selectedUser?.id}/friends/${friendsPage + 1}/${size}`
    );
    const data = await response.json();

    if (data.list.length > 0) {
      setFriends([...friends, ...data.list]);
      setFriendsPage(friendsPage + 1);
    } else {
      setHasMoreFriends(false);
    }
  };

  return (
    <div className="container">
      <Navigation
        onClick={() => window.open("https://ketigagua.github.io/Portfolio/")}
      />
      {!selectedUserId ? (
        <div className="container__users">
          {users.map((user) => (
            <UserCard
              key={user?.id}
              user={user}
              onUserClick={handleUserClick}
              imageUrl={user?.imageUrl || ""}
            />
          ))}
          {hasMoreUsers && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>
              Load More Users
            </button>
          )}
        </div>
      ) : (
        <UserDetails
          user={selectedUser}
          onShowFriendsClick={handleShowFriendsClick}
        >
          <div>
            {" "}
            <div>
              <h2>Contact</h2>
              <p>Email: {selectedUser?.email}</p>
            </div>
            <h2>Address</h2>
            <p>Address: {selectedUser?.address?.street}</p>
            <p>City: {selectedUser?.address?.city}</p>
            <p>State: {selectedUser?.address?.state}</p>
            <p>Zipcode: {selectedUser?.address?.zipcode}</p>
          </div>
          <div>
            <h2>Company</h2>
            <p>Name: {selectedUser?.company?.name}</p>
            <p>Catchphrase: {selectedUser?.company?.catchPhrase}</p>
            <p>BS: {selectedUser?.company?.bs}</p>
            <p>Type: {selectedUser?.jobType}</p>
            <p>Area: {selectedUser?.jobArea}</p>
          </div>
        </UserDetails>
      )}
      <div className="friends">
        <h2>Friends</h2>
        <div className="container__friends">
          {friends.map((friend, index) => (
            <FriendCard
              key={friend?.id}
              friend={friend}
              onLoadMore={() => handleLoadMoreFriends(index)}
            />
          ))}
        </div>

        {hasMoreFriends && (
          <button className="btn" onClick={handleLoadMoreFriends}>
            Click and Load Friends
          </button>
        )}
      </div>
    </div>
  );
};
export default App;
