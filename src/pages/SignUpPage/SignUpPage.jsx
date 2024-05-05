import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';

const SignUpPage = () => {
  return (
    <Container>
      <div className="flex lg:w-10/12 mx-auto mt-8 justify-between items-center ">
        <h3 className="title-text">Create your account! Please Create </h3>
        <span>
          Already have an account?{' '}
          <Link className="text-blue-500" to="/login">
            Login{' '}
          </Link>{' '}
          here
        </span>{' '}
      </div>
      <div className="lg:w-10/12 mx-auto  mt-5 p-6 bg-white rounded-md shadow-md">
        <div className="max-w-md mx-auto">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your Password"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md w-full hover:bg-primary-dark transition-colors duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6">
            <p className="text-gray-600">Or sign up with</p>
            <button
              type="button"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
