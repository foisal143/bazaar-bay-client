import { useState } from 'react';
import Container from '../../components/Container/Container';
import useWishlist from '../../hooks/useWishlist';
import { FaCartPlus, FaTrashAlt } from 'react-icons/fa';

const MyFavoritePage = () => {
  const [toggle, setToggle] = useState('wishlist');
  const { wishlistProduct } = useWishlist();

  return (
    <Container>
      <div className="mt-5">
        <h3 className="title-text">
          Your <span className="text-primary">WishList</span> and{' '}
          <span className="text-primary">Followed Store</span>
        </h3>
        <div className="bg-white mt-5 p-5">
          <div className="flex gap-5 font-bold">
            <button
              className={
                toggle === 'wishlist'
                  ? 'border-b-4 border-black'
                  : 'border-white border-b-4'
              }
              onClick={() => setToggle('wishlist')}
            >
              Wishlist
            </button>
            <button
              className={
                toggle === 'followed store'
                  ? 'border-b-4 border-black'
                  : 'border-white border-b-4'
              }
              onClick={() => setToggle('followed store')}
            >
              Followed Store
            </button>
          </div>
          {toggle === 'wishlist' && (
            <div className="mt-8 space-y-3">
              {wishlistProduct ? (
                wishlistProduct.map(product => (
                  <div
                    className="shadow-md text-center lg:text-start grid grid-cols-1 lg:grid-cols-3 p-2  "
                    key={product._id}
                  >
                    <div className="lg:flex gap-5">
                      {' '}
                      <img
                        className="w-24 lg:mx-0 mx-auto h-24"
                        src={product?.image}
                        alt=""
                      />
                      <div>
                        <h3 className="text-xl font-semibold">
                          {product?.name}
                        </h3>
                        <p>
                          {' '}
                          <strong>Category:</strong> {product?.category}
                        </p>
                      </div>
                    </div>
                    <div className="lg:text-center">
                      <p className="text-3xl text-primary">${product?.price}</p>
                    </div>
                    <div className="lg:text-end space-y-2">
                      <button className="px-5 py-2 bg-primary text-white rounded-md">
                        <FaCartPlus />
                      </button>{' '}
                      <br />
                      <button className="bg-red-500 text-white px-5 py-2 rounded-md">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-5 title-text text-center">
                  No Wishlist product found
                </p>
              )}
            </div>
          )}
          {toggle === 'followed store' && (
            <div className="mt-8">no followed store found</div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyFavoritePage;
