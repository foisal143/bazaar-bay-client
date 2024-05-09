import toast from 'react-hot-toast';
import useSingleUser from '../../../hooks/useSingleUser';
import { useState } from 'react';

const EditProfile = () => {
  const { singleUser } = useSingleUser();
  const [loading, setLoading] = useState(false);
  const handlerFormSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const phoneNumber = form.phoneNumber.value;
    const birthday = form.birthday.value;

    const userInfo = {
      name,
      email,
      gender,
      phoneNumber,
      birthday,
    };
    setLoading(true);
    fetch(`http://localhost:3000/user-personal-profile/${singleUser?._id}`, {
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
        } else {
          setLoading(false);
          toast.success('User Updated failed!');
        }
      });
  };
  return (
    <div className="mt-5">
      <h3 className="title-text">
        Edit Personal <span className="text-primary">Profile</span>
      </h3>
      <div
        className={`mt-5 p-2 bg-white ${
          loading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <form onSubmit={handlerFormSubmit}>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full sm:w-1/2 mb-4 sm:pr-2">
              <label className="block mb-1 font-bold">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={singleUser?.name}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="w-full sm:w-1/2 mb-4 sm:pl-2">
              <label className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={singleUser?.email}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          {/* Other form fields */}
          <div className="mb-4">
            <label className="block mb-1 font-bold">Gender</label>
            <select
              defaultValue={singleUser?.gender}
              name="gender"
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Phone Number</label>
            <input
              defaultValue={singleUser?.phoneNumber}
              type="tel"
              name="phoneNumber"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold">Birthday</label>
            <input
              defaultValue={singleUser?.birthday}
              type="date"
              name="birthday"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="lg:w-[200px]">
            <button
              disabled={loading}
              type="submit"
              className="py-2 w-full px-8 bg-primary text-white rounded-md"
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

export default EditProfile;
