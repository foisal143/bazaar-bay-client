import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SocialLogin = () => {
  const { googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const handlerGoogleLogin = () => {
    googleLogin().then(data => {
      const loggedUser = data.user;
      const userInfo = {
        name: loggedUser?.displayName,
        email: loggedUser?.email,
      };
      fetch(`http://localhost:3000/users/${loggedUser?.email}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.upsertedId || data.matchedCount > 0) {
            toast.success('Sign Up success!');
            navigate('/');
          }
        });
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
