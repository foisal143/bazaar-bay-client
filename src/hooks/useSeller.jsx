import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';
import { useQuery } from '@tanstack/react-query';

const useSeller = () => {
  const { user } = useContext(AuthContext);
  const axioSecure = useAxiosSecuire();

  const { data, isLoading } = useQuery({
    queryKey: ['user', 'isSeller', user?.email],
    queryFn: async () => {
      const data = await axioSecure.get(`/is-seller/${user?.email}`);
      return data.data;
    },
  });
  console.log('from useSeller', user?.email, data?.isSeller);
  return { isSeller: data?.isSeller, isLoading };
};

export default useSeller;
