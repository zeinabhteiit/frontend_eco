import axios from 'axios';

// Set up the base URL for the API
//const API_URL = 'http://localhost:5000/api/products';  // Replace with your actual backend API URL

const API_URL = 'https://deployed-back.onrender.com/api/products';


const apiClient = axios.create({
  // baseURL: API_URL,
   baseURL: 'https://deployed-back.onrender.com/api/products',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor (Optional)
apiClient.interceptors.response.use(
  (response) => response, // Return the response as is
  (error) => {
    console.error('API Error: ', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

// Function to get all products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    
    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data; // If the API returns the array directly
    } else if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data; // If the API wraps the array in a data object
    } else {
      throw new Error("Unexpected API response structure");
    }
  } catch (error) {
    console.error("API Error Details:", error);
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

// Function to get product by ID
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};

// Function to add a product
export const addProduct = async (productData) => {
  try {
    const response = await apiClient.post('/', productData);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to add product');
  }
};

// Function to update a product by ID
export const updateProduct = async (id, productData) => {
  try {
    const response = await apiClient.put(`/${id}`, productData);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to update product');
  }
};

// Function to delete a product by ID
export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data.message;
  } catch (error) {
    throw new Error('Failed to delete product');
  }
};

// Add this new function for top sellers
// export const getTopSellers = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/top-sellers`);
    
//     // Handle different response structures consistently
//     if (Array.isArray(response.data)) {
//       return response.data;
//     } else if (response.data.data && Array.isArray(response.data.data)) {
//       return response.data.data;
//     } else {
//       throw new Error("Unexpected API response structure");
//     }
//   } catch (error) {
//     console.error("API Error Details:", error);
//     throw new Error(error.response?.data?.message || 'Failed to fetch top sellers');
//   }
// };
