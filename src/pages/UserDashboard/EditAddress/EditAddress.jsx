import useSingleUser from '../../../hooks/useSingleUser';

const EditAddress = () => {
  const { singleUser } = useSingleUser();
  const { name, phoneNumber, province, city, area, address } = singleUser;
  return (
    <div>
      <h3 className="title-text mt-5">Edit My Address</h3>
      <div className="mt-5 p-2 bg-white">
        <form>
          <div className="mb-4 flex flex-wrap">
            <div className="w-full lg:w-1/2 mb-4 lg:pr-2">
              <label className="block mb-1 font-bold">Name</label>
              <input
                defaultValue={name}
                type="text"
                name="name"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="w-full lg:w-1/2 mb-4 lg:pl-2">
              <label className="block mb-1 font-bold">Phone Number</label>
              <input
                defaultValue={phoneNumber}
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
                defaultValue={address}
                className="w-full p-2 border rounded-md"
                placeholder="Enter your address"
                required
              />
            </div>
          </div>
          <div className="text-start">
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

export default EditAddress;
