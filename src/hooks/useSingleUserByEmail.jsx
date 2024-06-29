import { useQuery } from '@tanstack/react-query';
import useAxiosSecuire from './useAxiosSecuire';

const useSingleUserByEmail = email => {
  const axiosSecuire = useAxiosSecuire();
  const { data: singleUser } = useQuery({
    queryKey: ['email', 'getsingle-user'],
    queryFn: async () => {
      const res = await axiosSecuire.get(`/users/${email}`);
      return res.data;
    },
  });
  return { singleUser };
};

export default useSingleUserByEmail;
