import { useLoaderData } from 'react-router-dom';
import Container from '../../components/Container/Container';
import ProductCard from '../../components/ProductCard/ProductCard';

const SearchProductsPage = () => {
  const products = useLoaderData();
  return (
    <Container>
      {products && products?.length > 0 ? (
        <div className="mt-5">
          <h3 className="title-text">
            <span className="text-primary">{products?.length}</span> products
            Found
          </h3>

          <div className="mt-8 bg-white grid grid-cols-3 lg:grid-cols-6 gap-5 py-5 p-2">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-80px)] flex justify-center items-center ">
          <h3 className="title-text">No Products Found</h3>
        </div>
      )}
    </Container>
  );
};

export default SearchProductsPage;
