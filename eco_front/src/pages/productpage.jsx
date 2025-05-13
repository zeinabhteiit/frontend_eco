import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/apiServicee";
import ProductCard from "../components/productcard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/productpage.css";
// import "../styles/pagination.css";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal"; // Import Modal component

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOption, setSortOption] = useState('latest');
   const [showModal, setShowModal] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setProducts(productsData);
        setTotalProducts(productsData.length);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortProducts = (products, option) => {
    const sortedProducts = [...products];
    
    switch(option) {
      case 'price-high':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'price-low':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'latest':
      default:
        return sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  };

  const sortedProducts = sortProducts(products, sortOption);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 const handleAddToCart = (product) => {
    setAddedProduct(product);
    setShowModal(true);
  };
  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-6">All Products</h2>
        
        <div className="product-page-info">
          <p>Showing {indexOfFirstProduct + 1}–{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts} results</p>
          <select 
            className="sort-select"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="latest">Sort by latest</option>
            <option value="price-low">Sort by price: low to high</option>
            <option value="price-high">Sort by price: high to low</option>
          </select>
        </div>
        
        {/* <div className="product-page-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div> */}
         <div className="product-page-grid">
          {currentProducts.map((product) => (
            <ProductCard 
              key={product._id} 
              product={product} 
              onAddToCart={() => handleAddToCart(product)} // Add to cart handler
            />
          ))}
        </div>
      
<Pagination
  currentPage={currentPage}
  totalItems={totalProducts}
  itemsPerPage={productsPerPage}
  onPageChange={paginate}
/>



      </div>

{/* Modal for displaying added product */}
      {showModal && (
        <Modal
          product={addedProduct}
          onClose={() => setShowModal(false)} // Close the modal
        />
      )}


      <Footer />
    </div>
  );
};

export default ProductPage;