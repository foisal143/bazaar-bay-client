import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={location}></Navigate>;
};

export default PrivateRoute;
