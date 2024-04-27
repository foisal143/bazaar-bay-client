import { Link } from 'react-router-dom';
import img from '../../../img/logo.jpg';
const Navbar = () => {
  return (
    <nav className="w-full h-[80px] bg-primary text-white flex justify-between items-center px-5">
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
          <div className="flex pe-5 gap-2 justify-between items-center bg-white rounded-md">
            <input
              placeholder="Search your products"
              type="text"
              className="h-10 w-full outline-[#f85606] lg:w-[746px] border px-5 py-2 rounded-md"
            />
            <button className="text-black">Search</button>
          </div>
        </form>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-3">
          <li>Login</li>
          <li className="w-[1px] h-3 bg-white"></li>
          <li>Sign Up</li>
          <li>cart</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
