import { useLoaderData } from 'react-router-dom';
import Container from '../../components/Container/Container';
import useSingleUser from '../../hooks/useSingleUser';

const BuyProductPage = () => {
  const product = useLoaderData();
  const { singleUser } = useSingleUser();
  const { name, phoneNumber, address, email, province } = singleUser || {};
  const delivaryChare = province?.toLowerCase() === 'dhaka' ? 2 : 10;
  const total = parseFloat((product?.price + delivaryChare).toFixed(2));
  return (
    <Container>
      <div className="mt-5 lg:flex space-y-5 justify-between gap-5">
        <div className=" lg:w-[65%] space-y-3">
          <div className="bg-white p-5 shadow-md space-y-3 rounded-md text-xs">
            <h3 className="font-semibold">Delever To: {name}</h3>
            <p>
              {phoneNumber} | {address}
            </p>
            <p>Bill to the same address</p>
            <p>Email To {email}</p>
          </div>
          <div className="bg-white p-5 shadow-md space-y-3 rounded-md text-xs">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <img className="w-12 h-12" src={product?.image} alt="" />
                <div>
                  <h3 className="text-sm font-semibold">{product?.name}</h3>
                  <p>{product?.category}</p>
                </div>
              </div>
              <p>Qun: {product?.quntity || 1}</p>
              <p className="font-semibold">${product?.price}</p>
            </div>
            <hr />
            <div className="flex justify-between ">
              <p>Stander Delivary ${delivaryChare}</p>
              <p className="text-xl">
                Total: <span className="text-primary"> ${total}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 shadow-md  rounded-md lg:w-[35%]">
          <h3>Order Summary</h3>
          <div className="mt-5 text-xs space-y-2">
            <p className="flex justify-between">
              Order Total: <span>${total}</span>
            </p>
            <p className="flex justify-between">
              Delivary Charge: <span>${delivaryChare}</span>
            </p>
            <p className="flex justify-between">
              Total: <span>${total}</span>
            </p>
          </div>
          <button className="w-full bg-primary py-2 px-8 rounded-md text-white mt-16">
            Procceed To Checkout ${total}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default BuyProductPage;
