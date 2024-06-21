import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';
import { useQuery } from '@tanstack/react-query';

const useSeller = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecuire();
  const { data: isSeller } = useQuery({
    queryKey: ['user'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/${user?.email}`);
      return res.data;
    },
  });
  return { isSeller: isSeller?.isSeller };
};

export default useSeller;
