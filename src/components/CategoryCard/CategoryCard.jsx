import { Link } from 'react-router-dom';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/products/${category.name}`}>
      {' '}
      <div className="text-center hover:shadow-md duration-200 transition-all h-[160px] border p-3">
        <img
          className="w-[80px] mx-auto h-[80px]"
          src={category?.image}
          alt=""
        />
        <h4 className="font-semibold text-base md:text-xl">{category.name}</h4>
      </div>
    </Link>
  );
};

export default CategoryCard;
