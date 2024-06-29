import toast from 'react-hot-toast';
import Container from '../Container/Container';
import { useForm } from 'react-hook-form';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import axios from 'axios';
import {
  FaDollarSign,
  FaInfoCircle,
  FaListAlt,
  FaTag,
  FaUsers,
} from 'react-icons/fa';

const UpdateProductModal = ({ product, refetch }) => {
  const closeModalRef = useRef();
  const { register, handleSubmit } = useForm();
  const axiosSecuire = useAxiosSecuire();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { name, category, details, image, promoters, price } = product || {};
  const stringPromoter =
    promoters && promoters.map(promoter => promoter.name).join(',');
  // form submit handler
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

        // Handle the form data as needed, such as sending it to a server or updating the UI
      } catch (error) {
        console.error('Error uploading the image:', error);
      }
    } else {
      data.image = image;
    }

    data.price = parseFloat(data.price);

    // make an array of object from promoters array
    const promoters = data.promoters.split(',');
    const promotersArrayOfOj = promoters.map(promoterName => {
      return { name: promoterName };
    });
    data.promoters = promotersArrayOfOj;
    data.email = user?.email;
    data.status = 'pending';
    axiosSecuire.patch(`/products/${product._id}`, data).then(data => {
      console.log(data);
      if (data.data.modifiedCount > 0) {
        toast.success('Product successfuly Updated!');
        closeModalRef.current.click();
        refetch();
        setLoading(false);
      } else {
        toast.error('Product Not Updated!');
        setLoading(false);
      }
    });
  };
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_3" className="modal w-full">
        <div className="modal-box max-w-[60%]">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              ref={closeModalRef}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="title-text">
            Update Your <span className="text-primary">Product</span>!
          </h3>
          <Container>
            {/* useing react hook forms here */}
            <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Name:</label>
                    <div className="flex items-center space-x-2">
                      <FaTag className="text-gray-500" />
                      <input
                        defaultValue={name}
                        placeholder="Enter the product name"
                        {...register('name', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Price:</label>
                    <div className="flex items-center space-x-2">
                      <FaDollarSign className="text-gray-500" />
                      <input
                        placeholder="Enter the amount of price"
                        type="number"
                        defaultValue={price}
                        {...register('price', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Category:
                    </label>
                    <div className="flex items-center space-x-2">
                      <FaListAlt className="text-gray-500" />
                      <select
                        defaultValue={category}
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
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Image:</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        {...register('image')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Details:</label>
                    <div className="flex items-center space-x-2">
                      <FaInfoCircle className="text-gray-500" />
                      <textarea
                        defaultValue={details}
                        placeholder="Enter your product details"
                        {...register('details', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      ></textarea>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">
                      Promoters (comma-separated):
                    </label>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-gray-500" />
                      <input
                        defaultValue={stringPromoter}
                        placeholder="Enter your product promoters name"
                        {...register('promoters', { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-md"
                >
                  {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    'Update Product'
                  )}
                </button>
              </form>
            </div>
          </Container>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateProductModal;
