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
  const [selcetAll, setSelectAll] = useState([]);
  const [selectAllProducts, setSelectAllProducts] = useState([]);
  const axiosSecuire = useAxiosSecuire();
  // handler for select all products
  const handlerSelectAllProduct = e => {
    const checked = e.target.checked;
    if (checked) {
      setSelectAll(cartProducts.map(ele => ele?._id));
    } else {
      setSelectAll([]);
    }
  };

  // handler for single prodcut selecet
  const handlerSelectSingleProduct = (e, product) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectAll(prev => [...prev, product?._id]);
    } else {
      const filterById = selcetAll.filter(id => id !== product?._id);
      setSelectAll(filterById);
    }
  };

  // handler delete selected cards
  const handlerDeleteSelectCart = () => {
    if (selcetAll?.length > 0) {
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
          axiosSecuire.delete(`/select-carts?ids=${selcetAll}`).then(data => {
            console.log(data);
            if (data.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success',
              });
            }
          });
        }
      });
    } else {
      toast.error('please select a product');
    }
  };
  // set the all products to state
  useEffect(() => {
    if (!isLoading) {
      const seletedProducts = cartProducts.filter(prod =>
        selcetAll.includes(prod._id)
      );
      setSelectAllProducts(seletedProducts);
    }
  }, [cartProducts, selcetAll, isLoading]);

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
                checked={cartProducts?.length === selcetAll?.length}
                id="select"
              />{' '}
              <label className="cursor-pointer" htmlFor="select">
                Select All
              </label>
            </div>
            <button
              onClick={handlerDeleteSelectCart}
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
                    selectAll={selcetAll}
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
