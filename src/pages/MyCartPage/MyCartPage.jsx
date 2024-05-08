import { CiTrash } from 'react-icons/ci';
import Container from '../../components/Container/Container';
import useCartProducts from '../../hooks/useCartProducts';
import { useState } from 'react';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const MyCartPage = () => {
  const { cartProducts, refetch } = useCartProducts();
  const [selcetAll, setSelectAll] = useState(false);

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
                onChange={e => setSelectAll(e.target.checked)}
                type="checkbox"
                name="select"
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
                  selcetAll={selcetAll}
                  product={product}
                  refetch={refetch}
                />
              ))}
          </div>
        </div>

        {/* procceed to checkout */}
        <div className="col-span-2 bg-white p-2">
          <OrderSummary />
        </div>
      </div>
    </Container>
  );
};

export default MyCartPage;
