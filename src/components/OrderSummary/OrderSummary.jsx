const OrderSummary = () => {
  return (
    <div className="w-full h-[280px]">
      <h3 className=" font-semibold text-xl">Order Summary</h3>
      <div className="mt-5">
        <p className="flex justify-between ">
          <span>Subtotal</span> <span>${200}</span>
        </p>
        <p className="flex justify-between ">
          <span>Shipping Cost</span> <span>${200}</span>
        </p>
        <p className="flex justify-between ">
          <span>Shipping Cost Discount</span> <span>${200}</span>
        </p>

        <div className="my-5">
          <form className="flex gap-1" action="">
            <input
              type="text"
              placeholder="Enter Voucher Code"
              className="border w-10/12  border-gray-400 rounded-md outline-none py-2 px-2 "
            />
            <button className="px-8 py-2 bg-primary rounded-md text-white">
              Apply
            </button>
          </form>
        </div>
        <p className="flex font-bold  justify-between ">
          <strong>Total</strong> <span className="text-primary">${200}</span>
        </p>
        <button className="bg-primary w-full px-8 py-2 rounded-md text-white mt-5">
          Procceed To Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;