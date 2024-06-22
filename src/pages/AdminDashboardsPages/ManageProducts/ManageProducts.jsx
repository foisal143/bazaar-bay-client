import Container from '../../../components/Container/Container';
import ManageProductsTableRow from '../../../components/ManageProductsTableRow/ManageProductsTableRow';
import useProducts from '../../../hooks/useProducts';

const ManageProducts = () => {
  const { products } = useProducts();
  return (
    <Container>
      <h3 className="title-text mt-5">
        Manage All <span className="text-primary">Products</span>
      </h3>
      {products && products.length > 0 ? (
        <div className="mt-5 p-5 bg-white">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <ManageProductsTableRow
                    index={index}
                    product={product}
                    key={product._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h3 className="title-text text-center">No Products Found</h3>
      )}
    </Container>
  );
};

export default ManageProducts;
