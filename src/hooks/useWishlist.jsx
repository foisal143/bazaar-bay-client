import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';

const useWishlist = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const {
    data: wishlistProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['wishlist'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecuire.get(`/wishlists/${user?.email}`);
      return res.data;
    },
  });
  return { refetch, wishlistProduct, isLoading };
};

export default useWishlist;
