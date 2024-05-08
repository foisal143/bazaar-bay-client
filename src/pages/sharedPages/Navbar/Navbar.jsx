import { Link } from 'react-router-dom';
import img from '../../../img/logo.jpg';
import { BsCart2 } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AtuhProvaider/AuthProvaider';
const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const handlerLogout = async () => {
    await logOut();
  };
  return (
    <nav className="w-full h-[80px] bg-primary text-white flex justify-between items-center px-2 lg:px-12">
      <div>
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
        <form>
          <div className="flex  lg:w-[746px]  pe-2 gap-2 justify-between items-center bg-white rounded-md">
            <input
              placeholder="Search your products"
              type="text"
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
          <li>
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
                <div className="w-10 h-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <button onClick={handlerLogout}>Logout</button>
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
