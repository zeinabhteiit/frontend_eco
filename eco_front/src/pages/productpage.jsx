import React, { useState, useEffect } from "react";
import { getAllProducts } from "../services/apiServicee";
import ProductCard from "../components/productcard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/productpage.css";
import "../styles/pagination.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortOption, setSortOption] = useState('latest');

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
        
        <div className="product-page-grid">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
          )}
          
          {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }).map((_, index) => {
            const pageNumber = index + 1;
            if (
              pageNumber === 1 || 
              pageNumber === Math.ceil(totalProducts / productsPerPage) ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={index}
                  onClick={() => paginate(pageNumber)}
                  className={currentPage === pageNumber ? "active" : ""}
                >
                  {pageNumber}
                </button>
              );
            }
            if (
              (pageNumber === currentPage - 2 && currentPage > 3) ||
              (pageNumber === currentPage + 2 && currentPage < Math.ceil(totalProducts / productsPerPage) - 2)
            ) {
              return <span key={index}>...</span>;
            }
            return null;
          })}
          
          {currentPage < Math.ceil(totalProducts / productsPerPage) && (
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;