import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useSingleUserByEmail = email => {
  const axiosSecuire = useAxiosSecuire();
  const { data: singleUser, refetch } = useQuery({
    queryKey: ['email', 'user', 'single-user'],
    queryFn: async () => {
      const res = await axiosSecuire.get(`/users/${email}`);
      return res.data;
    },
  });
  return { singleUser, refetch };
};

export default useSingleUserByEmail;
