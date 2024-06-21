import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecuire();
  const { data: isAdmin } = useQuery({
    queryKey: ['user'],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/${user?.email}`);
      return res.data;
    },
  });
  return { isAdmin: isAdmin?.isAdmin };
};

export default useAdmin;
