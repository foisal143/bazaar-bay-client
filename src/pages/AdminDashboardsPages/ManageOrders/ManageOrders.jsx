import toast from 'react-hot-toast';
import Container from '../../../components/Container/Container';
import ManageOrderTableRow from '../../../components/MangeOrderTableRow/ManageOrderTableRow';
import useAllOrdersProducts from '../../../hooks/useAllOrdersProducts';
import useAxiosSecuire from '../../../hooks/useAxiosSecuire';

const ManageOrders = () => {
  const { allOrderProducts, refetch } = useAllOrdersProducts();
  const axiosSecure = useAxiosSecuire();
  const handlerStatusChanged = (e, id) => {
    const status = e.target.value;
    axiosSecure.patch(`/orders/${id}`, { status }).then(data => {
      console.log(data.data);
      if (data.data.modifiedCount > 0) {
        toast.success('Status Changed Success');
        refetch();
      }
    });
  };

  return (
    <Container>
      <h3 className="title-text my-5">
        Manage All <span className="text-primary">Orders</span>
      </h3>

      <div className="p-5 bg-white">
        {allOrderProducts && allOrderProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allOrderProducts &&
                  allOrderProducts.map((prod, i) => (
                    <ManageOrderTableRow
                      key={prod._id}
                      index={i}
                      handlerStatusChanged={handlerStatusChanged}
                      product={prod}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h3 className="text-center title-text">No Product Found </h3>
        )}
      </div>
    </Container>
  );
};

export default ManageOrders;
