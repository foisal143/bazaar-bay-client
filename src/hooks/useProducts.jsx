import { useQuery } from '@tanstack/react-query';

const useProducts = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/products');
      const data = await res.json();
      return data;
    },
  });

  return { products, isLoading, refetch };
};

export default useProducts;
