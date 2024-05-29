import { CiTrash } from 'react-icons/ci';
import Container from '../../components/Container/Container';
import useCartProducts from '../../hooks/useCartProducts';
import { useEffect, useState } from 'react';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';

const MyCartPage = () => {
  const { cartProducts, refetch, isLoading } = useCartProducts();
  const axiosSecuire = useAxiosSecuire();
  const [selectAllIds, setSelectAllIds] = useState([]);
  const [selectAllProducts, setSelectAllProducts] = useState([]);

  // handler for all

  const handlerSelectAllProduct = e => {
    const checked = e.target.checked;
    if (checked) {
      const cartProdIds = cartProducts.map(prod => prod._id);
      setSelectAllIds(cartProdIds);

      const selecteProds = cartProducts.filter(prod =>
        cartProdIds.includes(prod._id)
      );

      // impliment data base

      axiosSecuire.post('/selected-products', selecteProds).then(data => {
        if (data.data.insertedCount > 0) {
          toast.success('Products Selected!');
        }
      });
    } else {
      axiosSecuire.delete(`/selected-products/${selectAllIds}`).then(data => {
        if (data.data.deletedCount > 0) {
          toast.success('Product Unselected!');
        }
      });
      setSelectAllIds([]);
    }
  };

  const handlerSelectSingleProduct = (e, product) => {
    const checked = e.target.checked;
    const seleectPorductsSingle = [];
    if (checked) {
      setSelectAllIds(prev => [...prev, product._id]);
      seleectPorductsSingle.push(product);
      // impliment data base
      axiosSecuire
        .post('/selected-products', seleectPorductsSingle)
        .then(data => {
          if (data.data.insertedCount > 0) {
            toast.success('Products Selected!');
          }
        });
    } else {
      const selectProdIds = selectAllIds.filter(id => product._id !== id);
      const idsForDelete = selectAllIds.filter(id => id === product._id);
      axiosSecuire.delete(`/selected-products/${idsForDelete}`).then(data => {
        if (data.data.deletedCount > 0) {
          toast.success('Product Unselected!');
          setSelectAllIds(selectProdIds);
        }
      });
    }
  };

  const handlerDeleteAllCartProducts = () => {
    if (selectAllIds.length > 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(result => {
        if (result.isConfirmed) {
          axiosSecuire
            .delete(`/select-carts?ids=${selectAllIds}`)
            .then(data => {
              if (data.data.deletedCount > 0) {
                axiosSecuire
                  .delete(`/selected-products/${selectAllIds}`)
                  .then(data => {
                    if (data.data.deletedCount > 0) {
                      Swal.fire({
                        title: 'Deleted!',
                        text: 'Your file has been deleted.',
                        icon: 'success',
                      });
                      setSelectAllIds([]);
                      refetch();
                    }
                  });
              }
            });
        }
      });
    } else {
      toast.error('Please select at least one product!');
    }
  };
  // set all products by using useeffect
  useEffect(() => {
    if (!isLoading) {
      const selecteProds = cartProducts.filter(prod =>
        selectAllIds.includes(prod._id)
      );
      setSelectAllProducts(selecteProds);
    }
  }, [selectAllIds, isLoading, cartProducts]);

  return (
    <Container>
      <h3 className="title-text mt-5">
        My Added Products:{' '}
        <strong className="text-primary font-normal">
          {cartProducts?.length < 10
            ? `0${cartProducts?.length}`
            : cartProducts?.length}
        </strong>
      </h3>
      <div className=" lg:grid grid-cols-1 lg:grid-cols-6  gap-5 mt-8">
        <div className="lg:col-span-4">
          <div className="p-2 bg-white flex justify-between">
            <div className="cursor-pointer w-fit">
              <input
                onChange={handlerSelectAllProduct}
                type="checkbox"
                name="select"
                checked={cartProducts?.length === selectAllProducts?.length}
                id="select"
              />{' '}
              <label className="cursor-pointer" htmlFor="select">
                Select All
              </label>
            </div>
            <button
              onClick={handlerDeleteAllCartProducts}
              className="flex text-xs items-center gap-1 hover:text-error uppercase"
            >
              <CiTrash /> Delete
            </button>
          </div>
          {cartProducts && cartProducts.length > 0 ? (
            <div className="p-2 bg-white mt-4">
              {cartProducts &&
                cartProducts.map(product => (
                  <CartProductCard
                    key={product._id}
                    handlerSelectSingleProduct={handlerSelectSingleProduct}
                    product={product}
                    refetch={refetch}
                    selectAll={selectAllIds}
                  />
                ))}
            </div>
          ) : (
            <div className="text-center mt-24">
              <h3 className="title-text">No Product Added</h3>
            </div>
          )}
        </div>

        {/* procceed to checkout */}
        <div className="lg:col-span-2  bg-white  p-2">
          <OrderSummary
            selectAll={selectAllProducts}
            cartProducts={cartProducts}
          />
        </div>
      </div>
    </Container>
  );
};

export default MyCartPage;
