import { CiTrash } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import toast from 'react-hot-toast';
import { MdManageAccounts } from 'react-icons/md';

const UsreCard = ({ user }) => {
  const { name, email } = user;
  const axiosSecure = useAxiosSecuire();
  const handlerMakeAdmin = email => {
    axiosSecure.patch(`/change-role/${email}`, { role: 'admin' }).then(data => {
      if (data.data.modifiedCount > 0) {
        toast.success('User promotoed to admin');
      }
    });
  };

  const handlerMakeSeller = email => {
    axiosSecure
      .patch(`/change-role/${email}`, { role: 'seller' })
      .then(data => {
        if (data.data.modifiedCount > 0) {
          toast.success('User promotoed to Seller');
        }
      });
  };

  return (
    <div className="p-3 my-5 flex justify-between items-center rounded-md shadow-md">
      <div className="lg:w-1/2 flex justify-between">
        <h3 className="font-semibold">{name}</h3>
        <p>{email}</p>
      </div>
      <div className="flex gap-5">
        <button onClick={() => handlerMakeAdmin(email)} title="Make Admin">
          <FaUser />
        </button>
        <button
          className="text-2xl"
          onClick={() => handlerMakeSeller(email)}
          title="Make Seller"
        >
          <MdManageAccounts />
        </button>
      </div>

      <button>
        <CiTrash />
      </button>
    </div>
  );
};

export default UsreCard;
