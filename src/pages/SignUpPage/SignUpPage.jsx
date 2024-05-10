import { Link, useNavigate } from 'react-router-dom';
import Container from '../../components/Container/Container';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import toast from 'react-hot-toast';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';

const SignUpPage = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosSecuire = useAxiosSecuire();
  // submit form logic
  const handlerFormSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const imageFile = form.image.files[0];
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`,
      { method: 'POST', body: formData }
    )
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const image = data.data.url;
          createUser(email, password).then(data => {
            const loggedUser = data.user;
            updateUser(loggedUser, name, image).then(() => {
              const userInfo = {
                name,
                email,
              };
              axiosSecuire.put(`/users/${email}`, userInfo).then(data => {
                console.log(data);
                if (data.data.upsertedId) {
                  toast.success('Sign Up success!');
                  navigate('/');
                }
              });
            });
          });
        }
        setLoading(false);
      })
      .catch(er => {
        console.log(er.message);
        setLoading(false);
      });
  };

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
          <form onSubmit={handlerFormSubmit}>
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
              <label htmlFor="name" className="block text-gray-700">
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
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
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
          <div className="mt-6">
            <p className="text-gray-600">Or sign up with</p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
