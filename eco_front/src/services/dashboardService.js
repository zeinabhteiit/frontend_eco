import axios from 'axios';

const API_BASE = 'https://deployed-back.onrender.com/api';

const getToken = () => localStorage.getItem('token');

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE}/orders`, {
      headers: { Authorization:`Bearer ${getToken()}`},
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    throw error;
  }
};