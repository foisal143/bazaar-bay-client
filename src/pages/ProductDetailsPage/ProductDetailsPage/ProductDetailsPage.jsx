import { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '../../../components/Container/Container';
import Rating from 'react-rating';
import { CiHeart, CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
import { IoIosReturnLeft, IoMdHeart } from 'react-icons/io';
import { FiMinus } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import ReviewsSection from '../ReviewsSection/ReviewsSection';
import {
  MdOutlineVerifiedUser,
  MdVerified,
  MdVerifiedUser,
} from 'react-icons/md';
import { AuthContext } from '../../../AtuhProvaider/AuthProvaider';
import Button from '../../../components/Button/Button';

const ProductDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const product = useLoaderData();
  const { name, image, category, rating, reviews, price } = product;
  const [isFavorite, setIsfavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isOpenZoom, setisOpenZoom] = useState(false);
  const [xAxis, setXaxis] = useState(0);
  const [yAxis, setyaxis] = useState(0);

  // calculate the positive reviews percentage
  const reveiwPercentage = (product?.rating / 5) * 100;

  // handler for image zoom
  const handlerMouseEnter = e => {
    // console.log(e.clientX);
    setXaxis(e.clientX - 400);
    setyaxis(e.clientY - 400);
  };

  return (
    <Container>
      <div className="  mt-1 text-sm breadcrumbs">
        <ul className="text-[#1ab3d7]">
          <li>Home</li>
          <li>{category}</li>
          <li>{name}</li>
        </ul>
      </div>

      <div className="flex lg:flex-row flex-col mt-3 relative  gap-2 justify-between ">
        {/* zoom image container */}

        <div
          className={
            isOpenZoom
              ? 'flex justify-center items-center transition-all duration-200  absolute w-[50%] h-[470px] shadow-md rounded-md overflow-hidden top-0 left-[320px] z-10 bg-white'
              : 'hidden'
          }
        >
          <img
            style={{ transform: `translate(${-xAxis}px,${-yAxis}px)` }}
            className="scale-[5] w-[200%] h-[200%]"
            src={image}
            alt=""
          />
        </div>
        <div className=" lg:grid  bg-white p-2 grid-cols-6 gap-2 lg:w-[75%]">
          <div className="col-span-2 w-fit h-fit relative shadow-md p-1 ">
            <img
              onMouseMove={handlerMouseEnter}
              onMouseEnter={() => setisOpenZoom(true)}
              onMouseOut={() => setisOpenZoom(false)}
              className="w-[300px] z-10 h-[300px] cursor-zoom-in"
              src={image}
              alt=""
            />
          </div>
          <div className="col-span-4 p-2  space-y-4">
            <h3 className="title-text">{name}</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs flex  items-center gap-1">
                  <Rating
                    emptySymbol={<CiStar />}
                    placeholderRating={rating}
                    readonly
                    fullSymbol={<FaStar className="text-yellow-500" />}
                    placeholderSymbol={<FaStar className="text-yellow-500" />}
                  />{' '}
                  <span className="text-[#1ab3d7]">
                    {reviews.length} ratings
                  </span>
                </p>
                <p>
                  Brand:{' '}
                  <span className="text-[#1ab3d7]">
                    {product?.brand ? product?.brand : 'No Brand'}
                  </span>
                </p>
              </div>
              <div>
                <button
                  className="text-3xl"
                  onClick={() => setIsfavorite(!isFavorite)}
                >
                  {isFavorite ? (
                    <IoMdHeart className="text-red-500" />
                  ) : (
                    <CiHeart />
                  )}
                </button>
              </div>
            </div>
            <hr />

            <p className="text-3xl text-primary">
              <span>${price}</span>
            </p>

            <div className="mt-5 flex justify-between lg:w-[40%] items-center">
              <span>Quantity:</span>{' '}
              <p className=" flex items-center gap-3">
                <button
                  onClick={() => setQuantity(prev => prev - 1)}
                  disabled={quantity === 1}
                  className={`text-2xl p-1  ${
                    quantity === 1
                      ? 'cursor-not-allowed bg-slate-50'
                      : 'bg-slate-200'
                  }`}
                >
                  <FiMinus />
                </button>
                <input
                  className=" outline-none border-none w-8 text-center"
                  type="number"
                  name="quantity"
                  value={quantity}
                  readOnly
                  id=""
                />{' '}
                <button
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="text-2xl p-1 bg-slate-200 "
                >
                  <GoPlus />
                </button>
              </p>
            </div>
            {/* buy now and add to cart button */}
            <div className="flex gap-3 pt-5">
              <button className="px-16 py-3 text-white bg-[#26abd4] duration-200  hover:bg-[#1ab3d7]">
                Buy Now
              </button>
              <button className="px-16 py-3 bg-primary text-white duration-200  hover:bg-[#e54d06]">
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        {/* service and store details section */}

        <div className=" bg-white flex-grow p-2">
          <div>
            <h4 className="font-semibold text-xl">Service</h4>
            <ul className="mt-5 space-y-1 font-semibold">
              <li className="flex items-center gap-2 text-primary">
                <MdVerifiedUser /> Daraz Verified
              </li>
              <li className="flex items-center gap-2 text-indigo-600">
                <MdVerified /> 100% Authentic from Trusted Brand
              </li>
              <li className="flex items-center gap-2 text-indigo-600">
                <IoIosReturnLeft /> 14 days free & easy return
              </li>
              <li className="flex items-center gap-2 text-indigo-600">
                {' '}
                <MdOutlineVerifiedUser /> 1 Year Brand Warranty
              </li>
            </ul>
          </div>

          <div className="mt-5">
            <h4 className="font-semibold text-xl">Sold By</h4>
            <div className="flex mt-3 gap-2">
              <img
                className="w-8 h-8 rounded-full"
                src={user?.photoURL}
                alt=""
              />
              <strong>{user?.displayName}</strong>
            </div>

            <div className="flex gap-3 mt-2">
              <div>
                <h4 className="text-xs">Positive Seller Ratings</h4>
                <span className="text-3xl">{reveiwPercentage}%</span>
              </div>
              <div>
                <h4 className="text-xs">Ship on Time</h4>
                <p className="text-3xl mt-4 ">100%</p>
              </div>
              <div>
                <h4 className="text-xs">Chat Response Rate</h4>
                <span className="text-xs">No Data found</span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <Button text="Visit Store"></Button>
            </div>
          </div>
        </div>
      </div>
      <ReviewsSection rating={rating} reviews={reviews} />
    </Container>
  );
};

export default ProductDetailsPage;
