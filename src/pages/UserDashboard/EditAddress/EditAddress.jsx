import toast from 'react-hot-toast';
import useSingleUser from '../../../hooks/useSingleUser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EditAddress = () => {
  const { singleUser } = useSingleUser();
  const { name, phoneNumber, province, city, area, userAddress } =
    singleUser || {};
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlerFormSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const province = form.province.value;
    const city = form.city.value;
    const area = form.area.value;
    const userAddress = form.address.value;
    const address = `${userAddress} ${area} ${city} ${province}`;

    const userInfo = {
      province,
      city,
      area,
      address,
      userAddress,
    };
    fetch(`http://localhost:3000/user-address-profile/${singleUser?._id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          toast.success('User Updated Success!');
          setLoading(false);
          navigate('/dashboard/profile');
        } else {
          setLoading(false);
          toast.success('User Updated failed!');
        }
      });
  };
  return (
    <div>
      <h3 className="title-text mt-5">Edit My Address</h3>
      <div
        className={`mt-5 p-2 bg-white ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <form onSubmit={handlerFormSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full lg:w-1/2 mb-4 lg:pr-2">
              <label className="block mb-1 font-bold">Name</label>
              <input
                defaultValue={name}
                type="text"
                name="name"
                readOnly
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pl-2">
              <label className="block mb-1 font-bold">Phone Number</label>
              <input
                defaultValue={phoneNumber}
                readOnly
                type="tel"
                name="phoneNumber"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pr-2">
              <label className="block mb-1 font-bold">Province</label>
              <input
                defaultValue={province}
                type="text"
                name="province"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your province"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pl-2">
              <label className="block mb-1 font-bold">City</label>
              <input
                type="text"
                defaultValue={city}
                name="city"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pr-2">
              <label className="block mb-1 font-bold">Area</label>
              <input
                type="text"
                name="area"
                defaultValue={area}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your area"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pl-2">
              <label className="block mb-1 font-bold">Address</label>
              <textarea
                name="address"
                defaultValue={userAddress}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
          <div className="text-start">
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded-md"
            >
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
