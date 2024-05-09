import { CiTrash } from 'react-icons/ci';
import Container from '../../components/Container/Container';
import useCartProducts from '../../hooks/useCartProducts';
import { useEffect, useState } from 'react';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const MyCartPage = () => {
  const { cartProducts, refetch } = useCartProducts();
  const [selcetAll, setSelectAll] = useState([]);
  const [selectAllProducts, setSelectAllProducts] = useState([]);

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
  console.log(selcetAll);

  // set the all products to state
  useEffect(() => {
    const seletedProducts = cartProducts.filter(prod =>
      selcetAll.includes(prod._id)
    );
    setSelectAllProducts(seletedProducts);
  }, [cartProducts, selcetAll]);

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
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-5 mt-8">
        <div className="col-span-4">
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
            <button className="flex text-xs items-center gap-1 hover:text-error uppercase">
              <CiTrash /> Delete
            </button>
          </div>
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
        </div>

        {/* procceed to checkout */}
        <div className="col-span-2 bg-white p-2">
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
