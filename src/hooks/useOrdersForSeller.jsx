import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useOrdersForSeller = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const {
    data: orderProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['orders', 'user'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecuire.get(
        `/get-orders-for-seller/${user?.email}`
      );
      return res.data;
    },
  });

  return { orderProducts, refetch, isLoading };
};

export default useOrdersForSeller;
