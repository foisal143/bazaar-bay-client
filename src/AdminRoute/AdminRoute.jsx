import { useContext } from 'react';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAdmin, isLoading } = useAdmin();
  const { user, loading } = useContext(AuthContext);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default AdminRoute;
