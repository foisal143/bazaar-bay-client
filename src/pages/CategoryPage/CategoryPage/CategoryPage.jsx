import React from 'react';
import { useParams } from 'react-router-dom';
import useProducts from '../../../hooks/useProducts';
import Container from '../../../components/Container/Container';
import ProductCard from '../../../components/ProductCard/ProductCard';

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useProducts();
  const filterProduct = products.filter(
    item => item.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <Container>
      <h3 className="title-text mt-5">
        <span className="text-primary">{filterProduct.length}</span> products
        found for <span className="text-primary">{category}</span>
        {filterProduct && filterProduct.length > 0 ? (
          <div className="grid grid-cols-3 mt-12 pb-12 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {filterProduct.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center title-text mt-12">No Product found</p>
        )}
      </h3>
    </Container>
  );
};

export default CategoryPage;
