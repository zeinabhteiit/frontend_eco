import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductImages from '../components/productimage';
import ProductInfo from '../components/productinfo';
import Reviews from '../components/review';
import '../styles/detailsproductpage.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CartContext } from "../context/CartContext";
import BlackButton from "../components/BlackButton";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Access addToCart function from context
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();

        console.log('Fetched product:', data.data);

        const cleaned = {
          ...data.data,
          name: data.data.name?.replace(/^"|"$/g, ''),
          description: data.data.description?.replace(/^"|"$/g, ''),
        };
        setProduct(cleaned);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) setQuantity(newQuantity);
  };

//   const handleAddToCart = () => {
//   const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//   const existingItemIndex = cartItems.findIndex(item => item.id === product.id);

//   if (existingItemIndex > -1) {
//     cartItems[existingItemIndex].quantity += quantity;
//   } else {
//     cartItems.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       imageUrl: product.imageUrl,
//     });
//   }

//   localStorage.setItem('cart', JSON.stringify(cartItems));
//   navigate('/cart');
// };

const handleAddToCart = () => {
  addToCart({
    ...product,
    quantity, // Add the quantity selected by the user
  });
  navigate('/cart'); // Redirect to the cart page after adding
};



  if (!product) return <div>Loading...</div>;

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div>
      <Header />
      <div className="pd-container">
        <div className="pd-content">
          <div className="pd-image-container">
            <ProductImages images={[product.imageUrl]} />
          </div>
          <div className="pd-info">
            <h2>{product.name}</h2>
            <p className="pd-info-desc">{product.description}</p>
            <div className="pd-price">Total: ${totalPrice}</div>

            <div className="pd-quantity">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="pd-quantity-input"
              />
            </div>

            {/* <button 
              className="pd-add-to-cart"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button> */}
<BlackButton
  text="Add to Cart"
  onClick={handleAddToCart}
  className="pd-add-to-cart"
/>
          </div>
        </div>

        <div className="pd-reviews">
  <Reviews />
</div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
