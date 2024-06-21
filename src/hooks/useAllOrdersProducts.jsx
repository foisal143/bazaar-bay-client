import useAxiosSecuire from './useAxiosSecuire';
import { useQuery } from '@tanstack/react-query';

const useAllOrdersProducts = () => {
  const axiosSecuire = useAxiosSecuire();
  const {
    data: allOrderProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await axiosSecuire.get(`/orders`);
      return res.data;
    },
  });

  return { allOrderProducts, refetch, isLoading };
};

export default useAllOrdersProducts;
