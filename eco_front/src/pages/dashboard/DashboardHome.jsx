import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar';
import '../../styles/dashboard.css';

const DashboardHome = () => {
  const [shipments, setShipments] = useState([]);
  const [editShipmentId, setEditShipmentId] = useState(null);
  const [editedShipment, setEditedShipment] = useState({
    order_id: '',
    shipment_date: '',
    shipment_amount: '',
    order_shipment_id: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/ordershipments')
      .then((res) => res.json())
      .then((data) => {
        setShipments(data.data);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedShipment({ ...editedShipment, [name]: value });
  };

  const handleCreate = () => {
    fetch('http://localhost:5000/api/ordershipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedShipment),
    })
      .then((res) => res.json())
      .then((newShipment) => {
        setShipments([...shipments, newShipment]);
        setEditedShipment({
          order_id: '',
          shipment_date: '',
          shipment_amount: '',
          order_shipment_id: ''
        });
      })
      .catch((err) => console.error('Create error:', err));
  };

  const handleEdit = (id) => {
    const shipmentToEdit = shipments.find((s) => s.id === id);
    if (shipmentToEdit) {
      setEditShipmentId(id);
      setEditedShipment({
        order_id: shipmentToEdit.order_id,
        shipment_date: shipmentToEdit.shipment_date.slice(0, 10),
        shipment_amount: shipmentToEdit.shipment_amount,
        order_shipment_id: shipmentToEdit.order_shipment_id,
      });
    }
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/ordershipments/${editShipmentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedShipment),
    })
      .then((res) => res.json())
      .then((updated) => {
        setShipments(shipments.map(s => s.id === editShipmentId ? { ...updated } : s));
        setEditShipmentId(null);
        setEditedShipment({
          order_id: '',
          shipment_date: '',
          shipment_amount: '',
          order_shipment_id: ''
        });
      })
      .catch((err) => console.error('Update error:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/ordershipments/${id}`, {
      method: 'DELETE',
    })
      .then(() => setShipments(shipments.filter(s => s.id !== id)))
      .catch((err) => console.error('Delete error:', err));
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-home">
        <h1>Shipments Dashboard</h1>

        {/* Create Shipment Form */}
        <div className="shipments-table-container">
          <h2>Create New Shipment</h2>
          <table className="shipments-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Shipment Date</th>
                <th>Amount</th>
                <th>Shipment Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="order_id"
                    value={editedShipment.order_id}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="shipment_date"
                    value={editedShipment.shipment_date}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="shipment_amount"
                    value={editedShipment.shipment_amount}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="order_shipment_id"
                    value={editedShipment.order_shipment_id}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={handleCreate} className="create-btn">Create</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shipment Table */}
        <div className="shipments-table-container">
          <h2>All Shipments</h2>
          <table className="shipments-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order ID</th>
                <th>Shipment Date</th>
                <th>Amount</th>
                <th>Shipment Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.length > 0 ? (
                shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td>{shipment.id}</td>

                    {editShipmentId === shipment.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="order_id"
                            value={editedShipment.order_id}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            name="shipment_date"
                            value={editedShipment.shipment_date}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            name="shipment_amount"
                            value={editedShipment.shipment_amount}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="order_shipment_id"
                            value={editedShipment.order_shipment_id}
                            onChange={handleChange}
                          />
                        </td>
                        <td>
                          <button onClick={handleUpdate} className="update-btn">Save</button>
                          <button onClick={() => setEditShipmentId(null)} className="cancel-btn">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{shipment.order_id}</td>
                        <td>{new Date(shipment.shipment_date).toLocaleDateString()}</td>
                        <td>{shipment.shipment_amount}</td>
                        <td>{shipment.order_shipment_id}</td>
                        <td>
                          <button onClick={() => handleEdit(shipment.id)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDelete(shipment.id)} className="delete-btn">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No shipments available</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

