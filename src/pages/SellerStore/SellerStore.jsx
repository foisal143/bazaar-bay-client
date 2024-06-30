import { useParams } from 'react-router-dom';
import useSingleUserByEmail from '../../hooks/useSingleUserByEmail';
import useProductsBySellerEmail from '../../hooks/useProductsBySellerEmail';
import Container from '../../components/Container/Container';
import { useContext } from 'react';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';
import ProductCard from '../../components/ProductCard/ProductCard';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import toast from 'react-hot-toast';
import useSingleUser from '../../hooks/useSingleUser';

const SellerStore = () => {
  const { email } = useParams();
  const { singleUser: currentUser } = useSingleUser();
  const { user } = useContext(AuthContext);
  const { singleUser, refetch } = useSingleUserByEmail(email);
  const { sellerProduts } = useProductsBySellerEmail(email);
  const axiosSecuire = useAxiosSecuire();
  // const handlerFollowButton = () => {
  //   const followers = singleUser?.followers ? [...singleUser.followers] : [];
  //   if (singleUser?.followers?.includes(user?.email)) {
  //     const updateFollowers = followers.filter(
  //       follower => follower !== user?.email
  //     );
  //     axiosSecuire
  //       .patch(`/follow-status/${singleUser?._id}`, {
  //         followers: updateFollowers,
  //       })
  //       .then(data => {
  //         console.log(data);
  //         if (data.data.modifiedCount > 0) {
  //           toast.success('Stored unfollowed Done!');
  //           refetch();
  //         }
  //       });
  //     refetch();
  //   } else {
  //     followers.push(user?.email);
  //     axiosSecuire
  //       .patch(`/follow-status/${singleUser?._id}`, { followers })
  //       .then(data => {
  //         console.log(data);
  //         if (data.data.modifiedCount > 0) {
  //           toast.success('Stored Followed Done!');
  //           refetch();
  //         }
  //       });
  //   }

  // };

  const handlerFollowButton = async () => {
    const followers = singleUser?.followers ? [...singleUser.followers] : [];
    const followedStores = singleUser?.followedStores
      ? [...singleUser.followedStores]
      : [];
    // set the user email in follower list conditionaly
    if (singleUser?.followers?.includes(user?.email)) {
      followers.splice(followers.indexOf(user?.email), 1);
      followedStores.splice(followedStores.indexOf(user?.email), 1);
    } else {
      followers.push(user?.email);
      followedStores.push(singleUser?.email);
    }

    try {
      const response = await axiosSecuire.patch(
        `/follow-status/${singleUser?._id}`,
        { followers }
      );

      if (response.data.modifiedCount > 0) {
        const res = await axiosSecuire.patch(
          `/followed-store-status/${currentUser?._id}`,
          { followedStores }
        );

        if (res.data.modifiedCount > 0) {
          toast.success(
            singleUser?.followers?.includes(user?.email)
              ? 'Unfollowed successfully!'
              : 'Followed successfully!'
          );
          refetch();
        }
      } else {
        toast.error('Failed to update follow status.');
      }
    } catch (error) {
      console.error('Axios Error:', error);
      toast.error('An error occurred while updating follow status.');
    }
  };

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
              {singleUser?.followers ? singleUser?.followers?.length : 0}{' '}
              Followers
            </p>
            <button
              onClick={handlerFollowButton}
              className={
                singleUser?.followers?.includes(user?.email)
                  ? 'text-blue-500'
                  : 'text-primary'
              }
            >
              {singleUser?.followers?.includes(user?.email)
                ? 'Unfollow'
                : 'Follow'}
            </button>
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
