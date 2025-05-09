import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/productTable.css';
import Sidebar from './sidebar';  // Import Sidebar

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(null);
  const [editableProduct, setEditableProduct] = useState({});

  // New product form fields
  const [newProduct, setNewProduct] = useState({
    name: '',
    brandId: '',
    description: '',
    quantity: '',
    price: '',
    color: '',
    isNew: 0,
    category: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (productId) => {
    const product = products.find(p => p.id === productId);
    setEditableProduct(product);
    setIsEditing(productId);
  };

  const handleSave = (productId) => {
    axios.put(`http://localhost:5000/api/products/${productId}`, editableProduct)
      .then(() => {
        setProducts(prev =>
          prev.map(p => (p.id === productId ? { ...p, ...editableProduct } : p))
        );
        setIsEditing(null);
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
  };

  const handleCancel = () => {
    setIsEditing(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      axios.delete(`http://localhost:5000/api/products/${productId}`)
        .then(() => {
          setProducts(products.filter(p => p.id !== productId));
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  // Handle new product form input changes
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle adding a new product
  const handleAddProduct = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/products', newProduct)
      .then((response) => {
        setProducts([...products, response.data.data]);  // Add the new product to the list
        setNewProduct({
          name: '',
          brandId: '',
          description: '',
          quantity: '',
          price: '',
          color: '',
          isNew: 0,
          category: ''
        });  // Reset the form
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-table-container">
      <div className="sidebar-container">
        <Sidebar /> {/* Render Sidebar component */}
      </div>

      <div className="product-content-container">
        {/* New Product Form */}
        <form onSubmit={handleAddProduct} className="product-form">
          <input type="text" name="name" value={newProduct.name} onChange={handleNewProductChange} placeholder="Name" required />
          <input type="text" name="brandId" value={newProduct.brandId} onChange={handleNewProductChange} placeholder="Brand ID" required />
          <input type="text" name="description" value={newProduct.description} onChange={handleNewProductChange} placeholder="Description" />
          <input type="number" name="quantity" value={newProduct.quantity} onChange={handleNewProductChange} placeholder="Quantity" required />
          <input type="number" name="price" value={newProduct.price} onChange={handleNewProductChange} placeholder="Price" required />
          <input type="text" name="color" value={newProduct.color} onChange={handleNewProductChange} placeholder="Color" />
          <select name="isNew" value={newProduct.isNew} onChange={handleNewProductChange}>
            <option value="1">New</option>
            <option value="0">Old</option>
          </select>
          <input type="text" name="category" value={newProduct.category} onChange={handleNewProductChange} placeholder="Category" required />
          <button type="submit">Add Product</button>
        </form>

        {/* Product Table */}
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Brand ID</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Color</th>
              <th>New?</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{isEditing === product.id ? (
                  <input name="name" value={editableProduct.name} onChange={handleInputChange} />
                ) : product.name}</td>
                <td>{isEditing === product.id ? (
                  <input name="brandId" value={editableProduct.brandId} onChange={handleInputChange} />
                ) : product.brandId}</td>
                <td>{isEditing === product.id ? (
                  <input name="quantity" value={editableProduct.quantity} onChange={handleInputChange} />
                ) : product.quantity}</td>
                <td>{isEditing === product.id ? (
                  <input name="price" value={editableProduct.price} onChange={handleInputChange} />
                ) : product.price}</td>
                <td>{isEditing === product.id ? (
                  <input name="color" value={editableProduct.color} onChange={handleInputChange} />
                ) : product.color}</td>
                <td>{isEditing === product.id ? (
                  <select name="isNew" value={editableProduct.isNew} onChange={handleInputChange}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                ) : product.isNew ? "Yes" : "No"}</td>
                <td>{isEditing === product.id ? (
                  <input name="category" value={editableProduct.category} onChange={handleInputChange} />
                ) : product.category}</td>
                <td>
                  {isEditing === product.id ? (
                    <>
                      <button onClick={() => handleSave(product.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(product.id)}>Edit</button>
                      <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
