import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import ProductCard from '../../../components/ProductCard/ProductCard';
import useProducts from '../../../hooks/useProducts';

const ForYouProducts = () => {
  const { products } = useProducts();

  return (
    <Container>
      <h3 className="title-text">For You</h3>

      {products ? (
        <>
          <div className="grid grid-cols-3 mt-5 pb-12 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {products.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
          {products?.length > 12 && <Button text={'Load More'}></Button>}
        </>
      ) : (
        <p>No Prodcut to show</p>
      )}
    </Container>
  );
};

export default ForYouProducts;
