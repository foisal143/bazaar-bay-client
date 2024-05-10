import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ selectAll }) => {
  const navigate = useNavigate();

  // todo: set to the product discount and shipping cost
  // calculate the all price
  const subTotalValue = selectAll.reduce(
    (prev, currentValue) => prev + currentValue?.price * currentValue?.quantity,
    0
  );
  const subTotal = parseFloat(subTotalValue.toFixed(2));

  // calculate the quantity
  const totoalQuantity = selectAll.reduce(
    (prev, currentValue) => prev + currentValue?.quantity,
    0
  );

  // calculate the shiping cost
  const shipingCostValue =
    selectAll.reduce(
      (prev, currentValue) => prev + currentValue?.shipping,
      0
    ) || 10;

  // calculate the discount price
  const disCountPriceValue =
    selectAll.reduce(
      (prev, curr) => prev + (curr?.price * curr?.discount) / 100,
      0
    ) || 10;

  // calculate the total price
  const total = subTotal + (shipingCostValue - disCountPriceValue);

  // todo: apply the cupon feature
  const handlerCupon = e => {
    const myCupons = ['foisal', 'morshed'];
    e.preventDefault();
    const cuponValue = e.target.cupon.value;
    const cupon = cuponValue.toLowerCase();
    if (myCupons.includes(cupon)) {
      toast.success('Cupon applied success!');
    } else {
      toast.error('please provide a valid cupon!');
    }
  };

  const hanlderNavigateToPayment = () => {
    if (!selectAll?.length > 0) {
      toast.error('Please select a product!');
    } else {
      navigate(`/payment/${total}`);
    }
  };

  return (
    <div className="w-full h-[280px]">
      <h3 className=" font-semibold text-xl">Order Summary</h3>
      <div className="mt-5">
        <p className="flex justify-between ">
          <span>Subtotal({totoalQuantity})</span> <span>${subTotal}</span>
        </p>
        {selectAll?.length > 0 && (
          <>
            <p className="flex justify-between ">
              <span>Shipping Cost</span> <span>${shipingCostValue}</span>
            </p>
            <p className="flex justify-between ">
              <span>Shipping Cost Discount</span>{' '}
              <span>${disCountPriceValue}</span>
            </p>
          </>
        )}

        <div className="my-5">
          <form onSubmit={handlerCupon} className="flex gap-1" action="">
            <input
              type="text"
              name="cupon"
              placeholder="Enter Voucher Code"
              className="border w-10/12  border-gray-400 rounded-md outline-none py-2 px-2 "
            />
            <button
              type="submit"
              className="px-8 py-2 bg-primary rounded-md text-white"
            >
              Apply
            </button>
          </form>
        </div>
        <p className="flex font-bold  justify-between ">
          <strong>Total</strong> <span className="text-primary">${total}</span>
        </p>

        <button
          onClick={hanlderNavigateToPayment}
          className="bg-primary w-full px-8 py-2 rounded-md text-white mt-5"
        >
          Procceed To Checkout (${total})
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
