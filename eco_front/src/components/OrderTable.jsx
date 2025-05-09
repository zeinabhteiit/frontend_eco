import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null); // To keep track of which row is being edited
  const [editableOrder, setEditableOrder] = useState({}); // Store the order data being edited

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then((response) => {
        setOrders(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (orderId) => {
    const orderToEdit = orders.find(order => order.id === orderId);
    setEditableOrder(orderToEdit); // Set order data for editing
    setIsEditing(orderId); // Mark the order as being edited
  };

  const handleSave = (orderId) => {
    // Here you can send the updated data to your backend
    axios.put(`http://localhost:5000/api/orders/${orderId}`, editableOrder)
      .then(() => {
        // After saving, update the table state with the new data
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, ...editableOrder } : order
          )
        );
        setIsEditing(null); // Exit editing mode
      })
      .catch(error => {
        console.error("Error saving the order:", error);
      });
  };

  const handleCancel = () => {
    setIsEditing(null); // Exit editing mode without saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableOrder({
      ...editableOrder,
      [name]: value,
    });
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      axios.delete(`http://localhost:5000/api/orders/${orderId}`)
        .then(() => {
          setOrders(orders.filter(order => order.id !== orderId));
        })
        .catch((error) => {
          console.error("Error deleting order:", error);
        });
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Subtotal</th>
          <th>Total</th>
          <th>Order Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{isEditing === order.id ? (
              <input
                type="text"
                name="id"
                value={editableOrder.id}
                onChange={handleInputChange}
              />
            ) : order.id}</td>
            <td>{isEditing === order.id ? (
              <input
                type="text"
                name="user_id"
                value={editableOrder.user_id}
                onChange={handleInputChange}
              />
            ) : order.user_id}</td>
            <td>{isEditing === order.id ? (
              <input
                type="number"
                name="subtotal_amount"
                value={editableOrder.subtotal_amount}
                onChange={handleInputChange}
              />
            ) : order.subtotal_amount}</td>
            <td>{isEditing === order.id ? (
              <input
                type="number"
                name="total_amount"
                value={editableOrder.total_amount}
                onChange={handleInputChange}
              />
            ) : order.total_amount}</td>
            <td>{isEditing === order.id ? (
              <input
                type="date"
                name="order_date"
                value={editableOrder.order_date}
                onChange={handleInputChange}
              />
            ) : new Date(order.order_date).toLocaleDateString()}</td>
            <td>
              {isEditing === order.id ? (
                <>
                  <button className="save-btn" onClick={() => handleSave(order.id)}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button className="edit-btn" onClick={() => handleEdit(order.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(order.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
