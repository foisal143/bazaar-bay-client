import { Link } from 'react-router-dom';
import img from '../../../img/logo.jpg';
import { BsCart2 } from 'react-icons/bs';
const Navbar = () => {
  return (
    <nav className="w-full h-[80px] bg-primary text-white flex justify-between items-center px-5 lg:px-12">
      <div>
        <Link
          to="/"
          className="flex justify-center items-center gap-2 text-3xl font-bold"
        >
          <img
            className="w-12 h-12 rounded-full"
            src={img}
            alt="Bazaar Bay logo"
          />{' '}
          <span className="uppercase">Bazaar Bay</span>
        </Link>
      </div>
      <div>
        <form>
          <div className="flex lg:w-[746px] pe-5 gap-2 justify-between items-center bg-white rounded-md">
            <input
              placeholder="Search your products"
              type="text"
              className="h-10 text-black w-full outline-none border px-5 py-2 rounded-md"
            />
            <button className="text-black text-">Search</button>
          </div>
        </form>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-5 font-semibold ">
          <li>
            {' '}
            <Link to="/login">Login</Link>
          </li>
          <li className="w-[1px] h-3 bg-white"></li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
          <li>
            <Link to="/my-carts" className="text-2xl">
              {' '}
              <BsCart2 />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
