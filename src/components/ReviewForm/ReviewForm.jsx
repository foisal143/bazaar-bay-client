import { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Rating from 'react-rating-stars-component';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';

const ReviewForm = ({ productId, product }) => {
  const { user } = useContext(AuthContext);
  const [reviewer, setReviewer] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecuire = useAxiosSecuire();
  const handleImageChange = e => {
    setImage(e.target.files[0]);
  };
  console.log(product);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    // Image upload to imgbb
    const formData = new FormData();
    formData.append('image', image);

    try {
      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
        formData
      );

      const reviews = product?.reviews ? [...product.reviews] : [];

      const imageUrl = imgbbResponse.data.data.url;

      // Handle form submission
      const reviewData = {
        reviewer,
        rating,
        comment,
        imageUrl,
        reviewerEmail: user?.email,
      };
      reviews.push(reviewData);

      const res = await axiosSecuire.patch(
        `/add-reveiw-in-product/${productId}`,
        reviews
      );
      if (res.data.modifiedCount > 0) {
        toast.success('Review submitted successfully!');
      }

      // You can send `reviewData` to your backend or handle it as needed

      setReviewer('');
      setRating(0);
      setComment('');
      setImage(null);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-full bg-white  mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="reviewer">
            Reviewer
          </label>
          <input
            type="text"
            id="reviewer"
            value={reviewer}
            placeholder="Enter Your Name"
            onChange={e => setReviewer(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <Rating
            count={5}
            size={24}
            activeColor="#ffd700"
            value={rating}
            onChange={newRating => setRating(newRating)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Enter Your Comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
            accept="image/*"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-primary text-white rounded-md px-4 py-2"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
