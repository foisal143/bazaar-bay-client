import { Link } from 'react-router-dom';

const OrderProductCard = ({ product }) => {
  const { name, image, category, status, price, productId } = product || {};
  return (
    <div className="flex my-5 shadow-md rounded-md p-3 justify-between items-start">
      <div className=" md:flex gap-3 w-1/2">
        <img className="w-20 h-20" src={image} alt="" />
        <h4 className="text-xl font-semibold">{name}</h4>
      </div>
      <p>{category}</p>
      <p>${price}</p>
      <p
        className={
          (status === 'shipped' && 'text-yellow-500') ||
          (status === 'recived' && 'text-green-500') ||
          (status === 'paid' && 'text-red-500')
        }
      >
        {status}
      </p>
      <Link to={`/dashboard/my-orders/add-review/${productId}`}>
        <button className="text-primary">Add Review</button>
      </Link>
    </div>
  );
};

export default OrderProductCard;
