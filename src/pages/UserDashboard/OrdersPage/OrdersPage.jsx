import { useEffect, useState } from 'react';
import Container from '../../../components/Container/Container';
import useOrderProducts from '../../../hooks/useOrderProducts';
import OrderProductCard from '../../../components/OrderProdcutCard/OrderProductCard';

const OrdersPage = () => {
  const [status, setStatus] = useState('all');
  const { orderProducts } = useOrderProducts();
  const [filteredProds, setFilteredProds] = useState([]);

  //  filtering the data by status
  useEffect(() => {
    if (status === 'paid') {
      const paidProducts = orderProducts.filter(
        prod => prod?.status === 'paid'
      );
      setFilteredProds(paidProducts);
    } else if (status === 'shipped') {
      const shippedProducts = orderProducts.filter(
        product => product?.status === 'shipped'
      );
      setFilteredProds(shippedProducts);
    } else if (status === 'recevied') {
      const receviedProds = orderProducts.filter(
        products => products?.status === 'recevied'
      );
      setFilteredProds(receviedProds);
    } else {
      setFilteredProds(orderProducts);
    }
  }, [orderProducts, status]);

  return (
    <Container>
      <h3 className="title-text mt-3">My Orders</h3>
      <div className="mt-3">
        <ul className="flex w-full  lg:w-1/2 gap-5 ">
          <li
            className={`${
              status === 'all'
                ? 'border-b-4 border-black '
                : 'border-b-4 border-transparent '
            } cursor-pointer`}
            onClick={() => setStatus('all')}
          >
            All
          </li>
          <li
            className={`${
              status === 'paid'
                ? 'border-b-4 border-black '
                : 'border-b-4 border-transparent '
            } cursor-pointer`}
            onClick={() => setStatus('paid')}
          >
            To Pay
          </li>
          <li
            className={`${
              status === 'shipped'
                ? 'border-b-4 border-black '
                : 'border-b-4 border-transparent '
            } cursor-pointer`}
            onClick={() => setStatus('shipped')}
          >
            To Ship
          </li>
          <li
            className={`${
              status === 'recevied'
                ? 'border-b-4 border-black '
                : 'border-b-4 border-transparent '
            } cursor-pointer`}
            onClick={() => setStatus('recevied')}
          >
            To Recive
          </li>
        </ul>
        <hr className="border-2 " />
      </div>

      <div className="bg-white p-5 mt-3 ">
        {filteredProds && filteredProds.length > 0 ? (
          filteredProds.map(product => (
            <OrderProductCard product={product} key={product._id} />
          ))
        ) : (
          <h3 className="title-text text-center mt-5">No Order Found</h3>
        )}
      </div>
    </Container>
  );
};

export default OrdersPage;
