import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../../img/logo.jpg';
import { BsCart2 } from 'react-icons/bs';
import { CiHeart, CiLogout, CiSearch, CiStar } from 'react-icons/ci';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AtuhProvaider/AuthProvaider';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaBox, FaUsers } from 'react-icons/fa';
import { IoReturnDownBack } from 'react-icons/io5';
import useCartProducts from '../../../hooks/useCartProducts';
import useAdmin from '../../../hooks/useAdmin';
import { ImSpoonKnife } from 'react-icons/im';
import useSeller from '../../../hooks/useSeller';

const Navbar = () => {
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
  const [showSearch, setShowSearch] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { cartProducts, refetch } = useCartProducts();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const { isSeller } = useSeller();

  const handlerSearchProducts = e => {
    e.preventDefault();
    const form = e.target;
    const searchValue = e.target.search.value;
    navigate(`/search-products/${searchValue}`);
    form.reset();
  };

  const handlerLogout = async () => {
    await logOut();
    refetch();
  };

  return (
    <nav className="w-full sticky top-0 z-20 h-[80px] bg-primary text-white flex justify-between items-center px-2 lg:px-12">
      <div className="flex gap-5 items-center lg:block">
        <div
          className={
            location?.pathname.startsWith('/dashboard') ? 'block' : 'hidden'
          }
        >
          <label
            htmlFor="my-drawer-2"
            className=" cursor-pointer drawer-button lg:hidden"
          >
            <FaBars />
          </label>
        </div>
        <Link
          to="/"
          className="flex justify-center items-center gap-2  text-xl lg:text-3xl font-bold"
        >
          <img
            className="md:w-12 md:h-12 w-8 h-8 rounded-full"
            src={img}
            alt="Bazaar Bay logo"
          />{' '}
          <span className="uppercase">Bazaar Bay</span>
        </Link>
      </div>

      <div
        className={`lg:static p-5 lg:p-0 bg-primary w-full lg:w-auto h-24 lg:bg-transparent lg:h-auto absolute -top-[100%] duration-200 ${
          showSearch ? 'top-20 left-0' : '-top-[100%]'
        }`}
      >
        <form onSubmit={handlerSearchProducts}>
          <div className="flex  lg:w-[746px]  pe-2 gap-2 justify-between items-center bg-white rounded-md">
            <input
              placeholder="Search your products"
              type="search"
              name="search"
              className="h-10 text-black w-full outline-none border px-5 py-2 rounded-md"
            />
            <button className="text-black bg-red-200 rounded-md px-4 py-1 text-xl">
              <CiSearch />
            </button>
          </div>
        </form>
      </div>
      <div>
        <ul className="flex text-xs md:text-base justify-center items-center gap-5 font-semibold ">
          {!user && (
            <>
              {' '}
              <li>
                {' '}
                <Link to="/login">Login</Link>
              </li>
              <li className="w-[1px] h-3 bg-white"></li>
              <li>
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
          <li
            className="text-2xl lg:hidden cursor-pointer"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <HiOutlineXMark /> : <CiSearch />}
          </li>
          <li className="relative">
            {cartProducts && user && (
              <div className="absolute text-xs z-10 bg-white text-black w-4 h-4 flex justify-center items-center rounded-full -top-1 -right-2 ">
                {cartProducts?.length}
              </div>
            )}
            <Link to="/my-carts" className="text-2xl">
              {' '}
              <BsCart2 />
            </Link>
          </li>
          {user && (
            <li className="dropdown text-black dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 h-8 rounded-full">
                  <img
                    title={user?.displayName}
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[10] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 space-y-2"
              >
                {isAdmin ? adminLinks : isSeller ? sellerLinks : userLinks}
                <li>
                  <button className="flex gap-2" onClick={handlerLogout}>
                    <CiLogout /> Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
