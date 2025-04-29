import { useEffect, useState } from "react";
import { getShipments, deleteShipment, updateShipment } from "../../services/shipmentService"; 
import Sidebar from "../../components/sidebar"; 
import '../../styles/manageshipment.css';

function ManageShipments() {
  const [shipments, setShipments] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    order_id: '',
    shipment_amount: '',
    shipment_date: ''
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null); // <<< NEW

  useEffect(() => {
    loadShipments();
  }, []);

  const loadShipments = () => {
    getShipments()
      .then((res) => setShipments(res.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = (shipment) => {
    setEditId(shipment.id);
    setEditData({
      order_id: shipment.order_id,
      shipment_amount: shipment.shipment_amount,
      shipment_date: shipment.shipment_date,
    });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditData({
      order_id: '',
      shipment_amount: '',
      shipment_date: '',
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

//   const handleSave = (id) => {
//     updateShipment(id, editData)
//       .then(() => {
//         loadShipments();
//         setEditId(null);
//       })
//       .catch((err) => console.error(err));
//   };

const handleSave = (id) => {
    updateShipment(id, editData)
      .then(() => {
        setEditId(null); // close the inputs after saving
        loadShipments(); // reload the table with new data
      })
      .catch((err) => console.error(err));
  };


  const handleDelete = (id) => {
    setConfirmDeleteId(id); // show confirm popup
  };

  const confirmDelete = () => {
    deleteShipment(confirmDeleteId)
      .then(() => {
        loadShipments();
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error(err));
  };

  const cancelDelete = () => {
    setConfirmDeleteId(null);
  };

  return (
    <div className="manage-shipments-container">
      <Sidebar />
      <div className="main-content">
        <h2>Manage Shipments</h2>
        <table className="shipments-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Shipment Amount</th>
              <th>Shipment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                {editId === shipment.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="order_id"
                        value={editData.order_id}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="shipment_amount"
                        value={editData.shipment_amount}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="shipment_date"
                        value={editData.shipment_date}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleSave(shipment.id)} className="save-btn">Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{shipment.order_id}</td>
                    <td>{shipment.shipment_amount}</td>
                    <td>{shipment.shipment_date}</td>
                    <td>
                      <button onClick={() => handleEdit(shipment)} className="edit-btn">Edit</button>
                      <button onClick={() => handleDelete(shipment.id)} className="delete-btn">Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Custom Confirm Popup */}
        {confirmDeleteId && (
          <div className="confirm-delete-popup">
            <div className="confirm-delete-content">
              <p>Are you sure you want to delete this shipment?</p>
              <div className="popup-buttons">
                <button onClick={confirmDelete} className="confirm-btn">Yes</button>
                <button onClick={cancelDelete} className="cancel-btn">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageShipments;
