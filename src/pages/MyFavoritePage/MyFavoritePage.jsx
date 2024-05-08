import { useState } from 'react';
import Container from '../../components/Container/Container';

const MyFavoritePage = () => {
  const [toggle, setToggle] = useState('wishlist');
  return (
    <Container>
      <div className="mt-5">
        <h3 className="title-text">Your WishList and followed Store</h3>
        <div className="bg-white mt-5 p-5">
          <div className="flex gap-5 font-bold">
            <button
              className={
                toggle === 'wishlist'
                  ? 'border-b-4 border-black'
                  : 'border-white border-b-4'
              }
              onClick={() => setToggle('wishlist')}
            >
              Wishlist
            </button>
            <button
              className={
                toggle === 'followed store'
                  ? 'border-b-4 border-black'
                  : 'border-white border-b-4'
              }
              onClick={() => setToggle('followed store')}
            >
              Followed Store
            </button>
          </div>
          <div className="mt-8">hello</div>
        </div>
      </div>
    </Container>
  );
};

export default MyFavoritePage;
