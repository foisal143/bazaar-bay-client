import { useState } from 'react';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

const CartProductCard = ({ product, selcetAll, refetch }) => {
  const { image, name, price, category, quantity } = product;
  const [loading, setLoading] = useState(false);

  const handlerIncreaseQuantity = id => {
    const newQuantity = quantity + 1;
    setLoading(true);
    fetch(`http://localhost:3000/cart-products/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setLoading(false);
          refetch();
        }
      });
  };

  const handlerDecreaseQuantity = id => {
    const newQuantity = quantity - 1;
    setLoading(true);
    fetch(`http://localhost:3000/cart-products/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ quantity: newQuantity }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          setLoading(false);
          refetch();
        }
      });
  };
  return (
    <div
      className={`flex my-3 p-2 shadow-md gap-3 ${
        loading ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <input checked={selcetAll} type="checkbox" name="product" id="product" />{' '}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-between gap-5">
        <div className=" lg:flex gap-3">
          <img className="w-24 lg:mx-0 mx-auto h-24" src={image} alt="" />
          <div className="text-center lg:text-start">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p>
              <strong>Category:</strong> {category}
            </p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-3xl text-primary">${price}</p>
        </div>
        <div className=" flex justify-center lg:justify-end items-start">
          <p className=" flex items-center gap-3">
            <button
              onClick={() => handlerDecreaseQuantity(product?._id)}
              disabled={quantity === 1 || loading}
              className={`text-2xl p-1  ${
                quantity === 1
                  ? 'cursor-not-allowed bg-slate-50'
                  : 'bg-slate-200'
              }`}
            >
              <FiMinus />
            </button>
            <input
              className=" outline-none border-none w-8 text-center"
              type="number"
              name="quantity"
              value={quantity}
              readOnly
              id=""
            />{' '}
            <button
              disabled={loading}
              onClick={() => handlerIncreaseQuantity(product?._id)}
              className="text-2xl p-1 bg-slate-200 "
            >
              <GoPlus />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
