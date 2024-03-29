import React, { useState, useEffect } from 'react';

import './style.css';

// 1. Fetch users objects on app start - https://reqres.in/api/users
// 2. Add "isLiked" field to each user object with initial value `false`
// 3. Render list of the users using UserCard component
// 4. Remove user from the list of the Users using onRemoveHandler
// 5. Add logic for "Like" button, on each click it should change it's styles
// Don't use:
// - if-else
// - loops (for, while), use .map .filter ect.

//User object example
/*
avatar: "https://reqres.in/img/faces/1-image.jpg"
email: "george.bluth@reqres.in"
first_name: "George"
id: 1
last_name: "Bluth"
*/

// Component for rendering the user
const UserCard = ({
  avatar,
  email,
  firstName,
  id,
  lastName,
  isLiked,
  onRemove,
  onLikeHandler,
}) => (
  <div className="user-card">
    <h3>
      {firstName} {lastName}
    </h3>
    <img src={avatar} alt="user's avatar" />
    <p>Email - {email}</p>
    <button
      className={isLiked ? 'liked' : ''}
      onClick={onLikeHandler.bind(null, id)}
    >
      {isLiked ? 'Liked' : 'Like'}
    </button>
    <button onClick={onRemove.bind(null, id)}>Remove</button>
  </div>
);

export default function App() {
  const [users, setUsers] = useState([]);

  const url = 'https://reqres.in/api/users';

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const response = await fetch(url);
      const parsed = await response.json();
      const updatedUsers = parsed.data.map((user) => ({
        ...user,
        isLiked: false, // Add isLiked field with initial value false
      }));
      setUsers(updatedUsers);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  console.log(users);

  // Use this handler to remove user from the list
  const onRemoveHandler = (id) => {
    const updatedUsers = users.filter((user) => {
      return user.id !== Number(id);
    });

    setUsers(updatedUsers);
  };

  // Use this handler to toggle user's isLiked property
  const onLikeHandler = (id) => {
    setUsers(
      users.map((user) =>
        user.id === Number(id) ? { ...user, isLiked: !user.isLiked } : user
      )
    );
  };

  return (
    <div className="App">
      {users.map((user) => (
        <UserCard
          key={user.id}
          avatar={user.avatar}
          email={user.email}
          firstName={user.first_name}
          id={user.id}
          lastName={user.last_name}
          isLiked={user.isLiked}
          onRemove={onRemoveHandler}
          onLikeHandler={onLikeHandler}
        />
      ))}
    </div>
  );
}
