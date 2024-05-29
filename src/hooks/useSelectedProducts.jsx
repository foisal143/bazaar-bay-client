import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosSecuire from './useAxiosSecuire';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

const useSelectedProducts = () => {
  const axiosSecuire = useAxiosSecuire();
  const { user, loading } = useContext(AuthContext);
  const { data: selectedProducts, refetch } = useQuery({
    queryKey: ['selectProducts'],
    enabled: !loading,
    queryFn: async () => {
      const data = await axiosSecuire.get(`/selected-products/${user?.email}`);
      return data.data;
    },
  });

  return { selectedProducts, refetch };
};

export default useSelectedProducts;
