"use client";

import { useState, useEffect } from 'react';
import AddUser from './AddUser';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [getUserData, setGetUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setUsers(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const getUserDataAndSet = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setGetUserData(result);
    } catch (error) {
      setError(error);
      setGetUserData('');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <AddUser onUserAdded={handleUserAdded} />
      <h1>Users Data</h1>
      <div className="bg-sky-400 p-2 m-2 rounded-lg">
        {users && users.map(user => (
          <div key={user.id}>
            <h2>{user.name} {user.surname}</h2>
            <p>Age: {user.age}</p>
          </div>
        ))}
      </div>
      <div className="bg-violet-600 p-2">
        <div>Get User</div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="UserId"
          className="bg-black p-2"
        />
        <button
          onClick={getUserDataAndSet}
          className="p-2 bg-white text-black ml-1 rounded-lg"
        >
          Get User
        </button>
      </div>
      <div className="bg-violet-700 p-2">
        {getUserData && getUserData.length !== 0 ? (
          <div>
            <h2>{getUserData.name} {getUserData.surname}</h2>
            <p>Age: {getUserData.age}</p>
            <button onClick={() => setGetUserData(null)}>Remove User</button>
          </div>
        ) : (
          <div>No User Right Now</div>
        )}
      </div>
    </div>
  );
}
