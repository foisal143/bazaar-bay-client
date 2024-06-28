import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { Navigate } from 'react-router-dom';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
  const { isSeller, isLoading } = useSeller();
  const { user, loading } = useContext(AuthContext);

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (user && isSeller) {
    return children;
  }
  return <Navigate to="/"></Navigate>;
};

export default SellerRoute;
