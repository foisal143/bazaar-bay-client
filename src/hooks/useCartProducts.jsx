import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';

const useCartProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const {
    data: cartProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecuire.get(`/cart-products/${user?.email}`);
      return data.data || [];
    },
  });
  return { cartProducts, isLoading, refetch };
};

export default useCartProducts;
