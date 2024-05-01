import { useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('productsCategoryData.json')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <Container>
      <div className="my-12">
        <h3 className="title-text">Categories</h3>
        <div className="mt-5 bg-white  grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 ">
          {categories.map(category => (
            <CategoryCard category={category} key={category.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CategorySection;
