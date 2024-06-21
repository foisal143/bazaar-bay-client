import { CiTrash } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import toast from 'react-hot-toast';
import { MdManageAccounts } from 'react-icons/md';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';

const UsreCard = ({ user }) => {
  const { auth } = useContext(AuthContext);
  const { name, email } = user;
  const disabled = user?.role === 'admin' || user?.role === 'seller';
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

  const handlerDelete = email => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      const user = auth.getUserByEmail(email);
      console.log(user);
      axiosSecure.delete(`/delete-user/${email}`).then(data => {
        if (data.data.deletedCount > 0) {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          }
        }
      });
    });
  };

  return (
    <div className="p-3 my-5 flex justify-between items-center rounded-md shadow-md">
      <div className="lg:w-1/2 flex justify-between">
        <h3 className="font-semibold">{name}</h3>
        <p>{email}</p>
      </div>
      <div className="flex gap-5">
        <button
          disabled={disabled}
          className={disabled && 'text-gray-400'}
          onClick={() => handlerMakeAdmin(email)}
          title="Make Admin"
        >
          <FaUser />
        </button>
        <button
          className={`text-xl ${disabled && 'text-gray-400'}`}
          disabled={disabled}
          onClick={() => handlerMakeSeller(email)}
          title="Make Seller"
        >
          <MdManageAccounts />
        </button>
      </div>
      <p>
        <strong>{user?.role ? user.role : 'User'}</strong>
      </p>

      <button
        className="p-3 rounded-full bg-primary text-white"
        onClick={() => handlerDelete(email)}
      >
        <CiTrash />
      </button>
    </div>
  );
};

export default UsreCard;
