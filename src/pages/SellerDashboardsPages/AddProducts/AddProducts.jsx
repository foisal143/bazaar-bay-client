import { useForm } from 'react-hook-form';
import Container from '../../../components/Container/Container';
import axios from 'axios';
import {
  FaTag,
  FaDollarSign,
  FaListAlt,
  FaInfoCircle,
  FaUsers,
} from 'react-icons/fa';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from '../../../hooks/useAxiosSecuire';
import toast from 'react-hot-toast';
const AddProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const axiosSecuire = useAxiosSecuire();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const onSubmit = async data => {
    setLoading(true);
    if (data.image.length > 0) {
      const formData = new FormData();
      formData.append('image', data.image[0]);

      try {
        const response = await axios.post(
          'https://api.imgbb.com/1/upload?key=08dea360d9faac6a8de4cf6f88727008',
          formData
        );
        const uploadedImageUrl = response.data.data.url;
        data.image = uploadedImageUrl;
        data.price = parseFloat(data.price);

        // make an array of object from promoters array
        const promoters = data.promoters.split(',');
        const promotersArrayOfOj = promoters.map(promoterName => {
          return { name: promoterName };
        });
        data.promoters = promotersArrayOfOj;
        data.email = user?.email;
        data.status = 'pending';
        axiosSecuire.post('/products', data).then(data => {
          console.log(data.data);
          if (data.data.insertedId) {
            toast.success('Product successfuly Added!');
          }
          setLoading(false);
        });
        // Handle the form data as needed, such as sending it to a server or updating the UI
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    }
  };
  return (
    <Container>
      <h3 className="my-5 title-text">
        Add Your <span className="text-primary">Products</span>
      </h3>
      {/* useing react hook forms here */}
      <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Name:</label>
              <div className="flex items-center space-x-2">
                <FaTag className="text-gray-500" />
                <input
                  placeholder="Enter the product name"
                  {...register('name', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.name && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Price:</label>
              <div className="flex items-center space-x-2">
                <FaDollarSign className="text-gray-500" />
                <input
                  placeholder="Enter the amount of price"
                  type="number"
                  {...register('price', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.price && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Category:</label>
              <div className="flex items-center space-x-2">
                <FaListAlt className="text-gray-500" />
                <select
                  {...register('category', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="home">Home</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="beauty">Beauty And Personal Care</option>
                  <option value="sports">Sports</option>
                  <option value="toys">Toys</option>
                  <option value="automotive">Automotive</option>
                  <option value="health">Health And Wellness</option>
                  <option value="jewelry">Jewelry</option>
                  <option value="pets">Pet Supplies</option>
                  <option value="baby">Baby And Kids</option>
                  <option value="offices">Offices Supplies</option>
                  <option value="watches">Watches</option>
                </select>
              </div>
              {errors.category && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Image:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  {...register('image', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.image && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Details:</label>
              <div className="flex items-center space-x-2">
                <FaInfoCircle className="text-gray-500" />
                <textarea
                  placeholder="Enter your product details"
                  {...register('details', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                ></textarea>
              </div>
              {errors.details && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">
                Promoters (comma-separated):
              </label>
              <div className="flex items-center space-x-2">
                <FaUsers className="text-gray-500" />
                <input
                  placeholder="Enter your product promoters name"
                  {...register('promoters', { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              {errors.promoters && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md"
          >
            {loading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              'Add Product'
            )}
          </button>
        </form>
      </div>
    </Container>
  );
};

export default AddProducts;
