import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import '../styles/users.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const fetchUsers = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      setUsers(response.data.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching users:", error.response?.data || error);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.post('http://localhost:5000/api/users', newUser, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      fetchUsers(); // refresh the list
      setNewUser({ name: '', email: '', password: '', role: 'user' });
    })
    .catch((error) => {
      console.error("Error adding user:", error.response?.data || error);
    });
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="users-container">
      <Sidebar />
      <div className="users-content">
        <h2>Users</h2>

        <form className="user-form" onSubmit={handleAddUser}>
          <input type="text" name="name" placeholder="Name" value={newUser.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleChange} required />
          <select name="role" value={newUser.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="super_admin">Super Admin</option>
          </select>
          <button type="submit">Add User</button>
        </form>

        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
