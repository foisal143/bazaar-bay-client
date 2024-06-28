import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';
import { useQuery } from '@tanstack/react-query';

const useProductsByEmail = () => {
  const { user } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const { data: sellerProduts, refetch } = useQuery({
    queryKey: ['user', 'products-by-email'],
    queryFn: async () => {
      const res = await axiosSecuire.get(
        `/get-products-by-email/${user?.email}`
      );
      return res.data;
    },
  });
  return { sellerProduts, refetch };
};

export default useProductsByEmail;
