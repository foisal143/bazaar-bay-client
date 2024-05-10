import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../AtuhProvaider/AuthProvaider';

const useCartProducts = () => {
  const { user, loading } = useContext(AuthContext);
  const {
    data: cartProducts,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['cart'],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3000/cart-products/${user?.email}`
      );
      return await res.json();
    },
  });
  return { cartProducts, isLoading, refetch };
};

export default useCartProducts;
