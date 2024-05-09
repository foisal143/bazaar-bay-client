import { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { FaTrashAlt } from 'react-icons/fa';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';

const CartProductCard = ({
  product,
  refetch,
  handlerSelectSingleProduct,
  selectAll,
}) => {
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

  const handlerDeleteSingleProduct = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      fetch(`http://localhost:3000/cart-products/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          if (data.deletedCount > 0) {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
              refetch();
            }
          }
        });
    });
  };
  return (
    <div
      className={`flex my-3 p-2 shadow-md gap-3 ${
        loading ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <input
        onChange={e => handlerSelectSingleProduct(e, product)}
        type="checkbox"
        name="product"
        id="product"
        checked={selectAll.includes(product?._id)}
      />{' '}
      <div className="grid grid-cols-1 lg:grid-cols-3 w-full justify-between gap-5">
        <div className=" lg:flex gap-3">
          <img className="w-24 lg:mx-0 mx-auto h-24" src={image} alt="" />
          <div className="text-center lg:text-start">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p>{category}</p>
          </div>
        </div>
        <div className="text-center space-y-8">
          <p className="text-xl text-primary">${price}</p>
          <button
            onClick={() => handlerDeleteSingleProduct(product?._id)}
            className="px-5 py-2 bg-primary rounded-md text-white"
          >
            <FaTrashAlt />
          </button>
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
