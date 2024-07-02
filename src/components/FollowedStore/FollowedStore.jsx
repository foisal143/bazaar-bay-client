import { useEffect, useState } from 'react';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import useSingleUser from '../../hooks/useSingleUser';
import Container from '../Container/Container';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const FollowedStore = () => {
  const { singleUser } = useSingleUser();
  const axiosSecuire = useAxiosSecuire();
  const [followedStores, setFollowedStores] = useState([]);
  console.log(followedStores);
  useEffect(() => {
    const emails = singleUser?.followedStores;
    axiosSecuire.get(`/get-followed-seller/${emails}`).then(res => {
      setFollowedStores(res.data);
    });
  }, [axiosSecuire, singleUser]);

  return (
    <Container>
      {followedStores && followedStores.length > 0 ? (
        followedStores.map(store => (
          <div className="bg-white p-5 shadow-lg rounded-md" key={store._id}>
            <div className="lg:w-1/2 flex gap-4 bg-white p-5 rounded-md">
              <img
                className="w-20 h-20 rounded-full"
                src={store?.image}
                alt={store?.name}
              />
              <div className="w-full">
                <h3 className="text-2xl font-bold uppercase"> {store?.name}</h3>
                <p>{store?.email}</p>
                <div className="flex justify-between w-full items-center">
                  <p className="text-xs">
                    {store?.followers ? store?.followers?.length : 0} Followers
                  </p>
                </div>
              </div>
            </div>
            <Link to={`/visit-seller-store/${store?.email}`}>
              <Button text="Visit Store"></Button>
            </Link>
          </div>
        ))
      ) : (
        <h3 className="title-text text-center">No Products Found</h3>
      )}
    </Container>
  );
};

export default FollowedStore;
