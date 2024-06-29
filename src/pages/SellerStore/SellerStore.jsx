import { useParams } from 'react-router-dom';
import useSingleUserByEmail from '../../hooks/useSingleUserByEmail';
import useProductsBySellerEmail from '../../hooks/useProductsBySellerEmail';
import Container from '../../components/Container/Container';
import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import ProductCard from '../../components/ProductCard/ProductCard';

const SellerStore = () => {
  const { email } = useParams();
  const { user } = useContext(AuthContext);
  const { singleUser } = useSingleUserByEmail(email);
  const { sellerProduts } = useProductsBySellerEmail(email);

  return (
    <Container>
      <h3 className="title-text my-5">
        Wellcome To My Store{' '}
        <span className="text-primary">{user?.displayName}</span>
      </h3>

      <div className="lg:w-1/2 flex gap-4 bg-white p-5 rounded-md">
        <img
          className="w-20 h-20 rounded-full"
          src={singleUser?.image}
          alt={singleUser?.name}
        />
        <div className="w-full">
          <h3 className="text-2xl font-bold uppercase"> {singleUser?.name}</h3>
          <p>{singleUser?.email}</p>
          <div className="flex justify-between w-full items-center">
            <p className="text-xs">
              {singleUser?.followers ? singleUser?.followers : 0} Followers
            </p>
            <button className="text-primary">Follow</button>
          </div>
        </div>
      </div>

      {/* products section */}

      <div className="mt-12">
        <h3 className="title-text mb-8">Products</h3>

        {sellerProduts && sellerProduts.length > 0 ? (
          <div className="grid grid-cols-3 mt-5 pb-12 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {sellerProduts.map(product => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <h3>No Products Found</h3>
        )}
      </div>
    </Container>
  );
};

export default SellerStore;
