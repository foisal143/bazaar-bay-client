import Rating from 'react-rating';
import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
const ProductCard = ({ product }) => {
  const { image, name, rating, price, reviews } = product;
  return (
    <div className="shadow-sm hover:shadow-lg duration-200   ">
      <img className=" h-32 lg:h-40 w-full" src={image} alt="" />
      <div className="bg-white w-full h-[calc(100% - 128px)] p-2 space-y-2 lg:h-[calc(100%-160px)]">
        <h3 className="text-base font-semibold ">{name}</h3>
        <p className="text-xl font-semibold text-primary">${price}</p>
        <p className="text-xs flex  items-center gap-1">
          <Rating
            emptySymbol={<CiStar />}
            placeholderRating={rating}
            readonly
            fullSymbol={<FaStar className="text-yellow-500" />}
            placeholderSymbol={<FaStar className="text-yellow-500" />}
          />{' '}
          <span>({reviews.length})</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
