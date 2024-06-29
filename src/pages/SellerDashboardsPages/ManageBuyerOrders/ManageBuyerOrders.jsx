import toast from 'react-hot-toast';
import Container from '../../../components/Container/Container';
import ManageBuyerOrderProductRow from '../../../components/ManageBuyerOrderProductRow/ManageBuyerOrderProductRow';
import useAxiosSecuire from '../../../hooks/useAxiosSecuire';
import useOrdersForSeller from '../../../hooks/useOrdersForSeller';

const ManageBuyerOrders = () => {
  const { orderProducts, refetch } = useOrdersForSeller();
  const axiosSecuire = useAxiosSecuire();
  const handlerUpdateStatus = (e, id) => {
    const status = e.target.value;
    axiosSecuire.patch(`/orders/${id}`, { status }).then(data => {
      if (data.data.modifiedCount > 0) {
        toast.success('Status Succesfully changed!');
        refetch();
      }
    });
  };
  return (
    <Container>
      <h3 className="title-text my-5">
        Manage Your <span className="text-primary">Products</span>
      </h3>

      {/* product details table */}

      {orderProducts && orderProducts.length > 0 ? (
        <div className="overflow-x-auto bg-white">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderProducts.map((product, i) => (
                <ManageBuyerOrderProductRow
                  key={product?._id}
                  product={product}
                  index={i}
                  handlerUpdateStatus={handlerUpdateStatus}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center title-text">No Product Found</p>
      )}
    </Container>
  );
};

export default ManageBuyerOrders;
