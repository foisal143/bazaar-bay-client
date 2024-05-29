import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

const useUsers = () => {
  const axiosSecure = useAxiosSecuire();
  const { loading } = useContext(AuthContext);

  const { data: allUsers, refetch } = useQuery({
    queryKey: ['users'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data || [];
    },
  });

  return { allUsers, refetch };
};

export default useUsers;
