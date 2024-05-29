import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useOrderProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const {
    data: orderProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['orders'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecuire.get(`/orders/${user?.email}`);
      return res.data;
    },
  });

  return { orderProducts, refetch, isLoading };
};

export default useOrderProducts;
