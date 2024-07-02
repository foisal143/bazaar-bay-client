import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useApprovedProducts = () => {
  const axiosSecuire = useAxiosSecuire();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products', 'approved-products'],
    queryFn: async () => {
      const response = await axiosSecuire.get('/approved-products');
      return response.data;
    },
  });

  return { products, isLoading, refetch };
};

export default useApprovedProducts;
