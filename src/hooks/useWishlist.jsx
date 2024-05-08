import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

const useWishlist = () => {
  const { user } = useContext(AuthContext);
  const {
    data: wishlistProduct,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/wishlists/${user?.email}`);

      return await res.json();
    },
  });
  return { refetch, wishlistProduct, isLoading };
};

export default useWishlist;
