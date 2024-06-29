import useAxiosSecuire from './useAxiosSecuire';
import { useQuery } from '@tanstack/react-query';

const useProductsBySellerEmail = email => {
  const axiosSecuire = useAxiosSecuire();
  const { data: sellerProduts, refetch } = useQuery({
    queryKey: ['user', 'products-by-email'],
    queryFn: async () => {
      const res = await axiosSecuire.get(`/get-products-by-email/${email}`);
      return res.data;
    },
  });
  return { sellerProduts, refetch };
};

export default useProductsBySellerEmail;
