import axios from 'axios';

// Define the base URL for your backend API
//const API_URL = 'http://localhost:5000/api/ordershipments'; // Adjust the URL based on your server's location
const API_URL = 'https://deployed-back.onrender.com/api/ordershipments';

// Function to get all shipments
export const getShipments = () => {
  return axios
    .get(API_URL)
    .then((response) => {
      // Handle the response, assuming the backend sends the shipments in response.data
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching shipments:', error);
      throw error; // Re-throw error for handling at the component level
    });
};

// Function to delete a shipment (if needed for the delete functionality)
export const deleteShipment = (id) => {
  return axios
    .delete(`${API_URL}/${id}`)
    .then((response) => {
      return response.data; // Assuming the backend returns a success message or data
    })
    .catch((error) => {
      console.error('Error deleting shipment:', error);
      throw error; // Re-throw error for handling at the component level
    });
};

// Function to update a shipment
export const updateShipment = (id, data) => {
    return axios
      .put(`${API_URL}/${id}`, data)
      .then((response) => {
        return response.data; // Assuming the backend returns updated shipment
      })
      .catch((error) => {
        console.error('Error updating shipment:', error);
        throw error;
      });
  };

  