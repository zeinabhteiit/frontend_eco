import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get the product ID
import axios from 'axios';
import '../styles/detailsproductpage.css';

const Reviews = () => {
  const { id } = useParams(); // Assuming product detail URL like /product/14
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Fetch reviews for a specific product using the product ID
        const res = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        
        // If you are fetching reviews for a product, make sure it's an array
        setReviews([res.data.data]);  // Set the review as an array, since you're fetching a single review here
      } catch (err) {
        console.error("Error fetching review", err);
        setError("Error fetching review. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div className="reviews-section">
      <h3>Reviews</h3>
      {error && <p>{error}</p>} {/* Show error message if any */}
      {reviews.length === 0 ? (
        <p>No reviews yet for this product.</p>
      ) : (
        reviews.map((review, index) => (
          <div className="review-box" key={index}>
            <img
              src="https://i.pravatar.cc/100" // You can modify this with actual user image in future
              alt="User"
              className="review-avatar"
            />
            <div className="review-content">
              <p>“{review.review_description}”</p>
              <span>- User {review.user_id} | Rating: {review.rating}/5</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;

