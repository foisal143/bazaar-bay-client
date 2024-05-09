import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

const useSingleUser = () => {
  const { user } = useContext(AuthContext);
  const { data: singleUser, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/users/${user?.email}`);
      const data = await res.json();
      return data;
    },
  });
  return { singleUser, refetch };
};

export default useSingleUser;
