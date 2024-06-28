import { useState } from 'react';
import Container from '../../../components/Container/Container';
import ManageSellerProdcutCardRow from '../../../components/ManageSellerProductCard/ManageSellerProdcutCardRow';
import UpdateProductModal from '../../../components/Modal/UpdateProductModal';

import useProductsByEmail from '../../../hooks/useProductsByEmail';

const ManageMyProducts = () => {
  const { sellerProduts, refetch } = useProductsByEmail();
  const [product, setProdcut] = useState({});
  return (
    <Container>
      <h3 className="title-text my-5">
        Manage Your <span className="text-primary">Products</span>
      </h3>

      {/* product details table */}

      {sellerProduts && sellerProduts.length > 0 ? (
        <div className="overflow-x-auto bg-white">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sellerProduts.map((product, i) => (
                <ManageSellerProdcutCardRow
                  key={product?._id}
                  product={product}
                  i={i}
                  setProdcut={setProdcut}
                />
              ))}
            </tbody>
          </table>
          <UpdateProductModal refetch={refetch} product={product} />
        </div>
      ) : (
        <p className="text-center title-text">No Product Found</p>
      )}
    </Container>
  );
};

export default ManageMyProducts;
