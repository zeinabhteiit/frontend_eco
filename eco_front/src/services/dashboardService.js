// src/services/dashboardService.js
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

export const fetchOrders = async () => {
  return axios.get(`${API_BASE}/orders`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const fetchUsers = async () => {
  return axios.get(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

export const fetchProducts = async () => {
  return axios.get(`${API_BASE}/products`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
