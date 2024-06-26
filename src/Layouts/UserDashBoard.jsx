import Navbar from '../pages/sharedPages/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPages/Footer/Footer';
import { CgProfile } from 'react-icons/cg';
import { FaBox, FaPlus, FaUsers } from 'react-icons/fa';
import { CiHeart, CiLogout, CiStar } from 'react-icons/ci';
import { IoReturnDownBack } from 'react-icons/io5';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

import { ImSpoonKnife } from 'react-icons/im';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
const UserDashBoard = () => {
  const userLinks = (
    <>
      <li>
        <Link className="flex gap-2" to="/dashboard/profile">
          <CgProfile /> Manage My Profile
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/my-orders">
          <FaBox /> My Orders
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/my-favorite">
          <CiHeart className="text-[18px]" /> My Wishlist & Followed Stores
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/my-reviews">
          <CiStar className="text-[18px]" /> My Reviews
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/my-returns">
          <IoReturnDownBack /> My Returns
        </Link>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
        <Link className="flex gap-2" to="/dashboard/profile">
          <CgProfile /> Manage My Profile
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/manage-users">
          <FaUsers className="text-[18px]" /> Manage Users
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/manage-orders">
          <ImSpoonKnife className="text-[18px]" /> Manage Orders
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/manage-products">
          <ImSpoonKnife className="text-[18px]" /> Manage Products
        </Link>
      </li>
    </>
  );

  const sellerLinks = (
    <>
      <li>
        <Link className="flex gap-2" to="/dashboard/profile">
          <CgProfile /> Manage My Profile
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/add-products">
          <FaPlus /> Add Products
        </Link>
      </li>

      <li>
        <Link className="flex gap-2" to="/dashboard/manage-seller-orders">
          <ImSpoonKnife className="text-[18px]" /> Manage Orders
        </Link>
      </li>
      <li>
        <Link className="flex gap-2" to="/dashboard/manage-seller-products">
          <ImSpoonKnife className="text-[18px]" /> Manage Products
        </Link>
      </li>
    </>
  );

  const { logOut } = useContext(AuthContext);
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();
  const handlerLogout = () => {
    logOut().then();
  };
  return (
    <div>
      <Navbar />
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content px-5">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80  min-h-full lg:pt-5 pt-[100px] bg-white text-base-content">
            {/* Sidebar content here */}

            {(isAdmin && adminLinks) || (isSeller && sellerLinks) || userLinks}
            <li>
              <button className="flex gap-2" onClick={handlerLogout}>
                <CiLogout /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashBoard;
