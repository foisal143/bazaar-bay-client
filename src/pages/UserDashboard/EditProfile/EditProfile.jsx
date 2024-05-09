import useSingleUser from '../../../hooks/useSingleUser';

const EditProfile = () => {
  const { singleUser } = useSingleUser();
  return (
    <div className="mt-5">
      <h3 className="title-text">
        Edit Personal <span className="text-primary">Profile</span>
      </h3>
      <div className="mt-5 p-2 bg-white">
        <form>
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
          <div className="">
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
