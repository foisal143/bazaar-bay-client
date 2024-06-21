import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import useAxiosSecuire from './useAxiosSecuire';

const useSingleUser = () => {
  const { user } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  const { data: singleUser, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecuire.get(`/users/${user?.email}`);
      return res.data;
    },
  });
  return { singleUser, refetch };
};

export default useSingleUser;
