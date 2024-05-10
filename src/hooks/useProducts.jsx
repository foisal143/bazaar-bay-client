import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useProducts = () => {
  const axiosSecuire = useAxiosSecuire();
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axiosSecuire.get('/products');
      return response.data;
    },
  });

  return { products, isLoading, refetch };
};

export default useProducts;
