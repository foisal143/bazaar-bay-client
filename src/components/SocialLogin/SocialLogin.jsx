import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);

  const handlerGoogleLogin = () => {
    googleLogin().then(data => {
      const loggedUser = data.user;
      console.log(loggedUser);
    });
  };
  return (
    <div>
      <button
        onClick={handlerGoogleLogin}
        type="button"
        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-2"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
