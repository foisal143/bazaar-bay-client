import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../components/CheckoutForm/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const { price } = useParams();
  console.log(price);
  const stripePromise = loadStripe(import.meta.env.VITE_stripe_pb_key);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
