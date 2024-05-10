import { useContext, useState } from 'react';
import Container from '../../components/Container/Container';
import useWishlist from '../../hooks/useWishlist';
import { FaCartPlus, FaTrashAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import useCartProducts from '../../hooks/useCartProducts';
import FollowedStore from '../../components/FollowedStore/FollowedStore';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';

const MyFavoritePage = () => {
  const [toggle, setToggle] = useState('wishlist');
  const { wishlistProduct, refetch } = useWishlist();
  const { refetch: cartProdRefeatch } = useCartProducts();
  const { user } = useContext(AuthContext);
  const axiosSecuire = useAxiosSecuire();
  // handler delete
  const handlerDelete = id => {
    axiosSecuire.delete(`/products/wishlists/${id}`).then(data => {
      if (data.data.deletedCount > 0) {
        axiosSecuire
          .patch(`/product/wishlist/${id}`, { isWishlist: false })
          .then(data => {
            if (data.data.modifiedCount > 0) {
              toast.success('Deleted Success!');
              refetch();
            }
          });
      }
    });
  };

  const handlerAddToCart = prod => {
    delete prod._id;
    const addedProInfo = {
      ...prod,
      email: user?.email,
      buyer: user?.displayName,

      quantity: 1,
    };

    axiosSecuire.post('cart-products', addedProInfo).then(data => {
      if (data.data.insertedId || data.data.modifiedCount > 0) {
        toast.success('Already added quantity updated!');
        cartProdRefeatch();
      }
    });
  };

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
              {wishlistProduct && wishlistProduct?.length > 0 ? (
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
                      <p className="text-xl text-primary">${product?.price}</p>
                    </div>
                    <div className="lg:text-end mt-3 lg:mt-0 w-full justify-center lg:justify-normal flex lg:flex-col lg:items-end gap-3 space-y-2">
                      <button
                        onClick={() => handlerAddToCart(product)}
                        className="px-5 lg:w-fit py-2 bg-primary text-white rounded-md"
                      >
                        <FaCartPlus />
                      </button>
                      <button
                        onClick={() => handlerDelete(product?._id)}
                        className="bg-red-500 lg:w-fit text-white  px-5 py-2 rounded-md"
                      >
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
            <div className="mt-8">
              <FollowedStore />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default MyFavoritePage;
