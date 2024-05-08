import { Link } from 'react-router-dom';
import Container from '../../components/Container/Container';
import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
  const { googleLogin } = useContext(AuthContext);

  const handlerGoogleLogin = () => {
    console.log('clicekd');
    googleLogin().then(data => {
      const loggedUser = data.user;
      console.log(loggedUser);
    });
  };
  return (
    <Container>
      <div className="lg:w-10/12 mx-auto mt-8">
        <div className="flex justify-between items-center ">
          <h3 className="title-text">Wellcome to Bazaar Bay! Please Login </h3>
          <span>
            New member?{' '}
            <Link className="text-blue-500" to="/sign-up">
              Register{' '}
            </Link>{' '}
            here
          </span>{' '}
        </div>

        <div className="mt-5 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <form className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm mt-2"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-primary hover:text-primary-dark"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mt-4"
                >
                  Sign in
                </button>
              </div>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
