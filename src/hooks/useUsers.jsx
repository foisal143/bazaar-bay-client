import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useUsers = () => {
  const axiosSecure = useAxiosSecuire();
  const { data: allUsers, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  return { allUsers, refetch };
};

export default useUsers;
