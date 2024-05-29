import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Container from '../Container/Container';
import './CheckoutForm.css';
import stripeImage from '../../assets/img/stripe.png';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecuire from '../../hooks/useAxiosSecuire';
import useSingleUser from '../../hooks/useSingleUser';
import toast from 'react-hot-toast';
import useSelectedProducts from '../../hooks/useSelectedProducts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AtuhProvaider/AuthProvaider';

const CheckoutForm = ({ price }) => {
  const { selectedProducts } = useSelectedProducts();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { singleUser } = useSingleUser();
  const { name, email, address, phoneNumber } = singleUser || {};
  const [loading, setLoading] = useState(false);
  const axiosSecuire = useAxiosSecuire();
  const stripe = useStripe();
  const elements = useElements();
  const [secretKey, setSecretKey] = useState('');
  useEffect(() => {
    axiosSecuire.post('/payment-intent', { price }).then(data => {
      const scKey = data.data.clientSecret;
      console.log(data);
      setSecretKey(scKey);
    });
  }, [axiosSecuire, price]);

  const handlerFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }

    const { error: confirmPaymentError, paymentIntent } =
      await stripe.confirmCardPayment(`${secretKey}`, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
            address: address,
            phone: phoneNumber,
          },
        },
      });

    if (confirmPaymentError) {
      console.log('error form confirm payment', confirmPaymentError.message);
      toast.error('payment unsuccessfull!');
      setLoading(false);
    } else {
      if (paymentIntent?.status === 'succeeded') {
        const ordersProdInfo = selectedProducts.map(prod => {
          return {
            ...prod,
            status: 'shipped',
            date: new Date(),
            email: user?.email,
          };
        });
        axiosSecuire.post('/buy-products', ordersProdInfo).then(data => {
          console.log(data);
          if (data.data.insertedCount > 0) {
            const selectedIds = selectedProducts.map(prod => prod._id);
            console.log(selectedIds);
            axiosSecuire
              .delete(`/select-carts?ids=${selectedIds}`)
              .then(data => {
                if (data.data.deletedCount > 0) {
                  axiosSecuire
                    .delete(`/selected-products/${selectedIds}`)
                    .then(data => {
                      if (data.data.deletedCount > 0) {
                        navigate('/dashboard/my-orders');
                        toast.success('payment success!');
                      }
                    });
                }
              });
          }
        });
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <div className="lg:w-1/2 mx-auto">
        <h3 className="title-text mt-5">Payment</h3>
        <div className="bg-white p-5 mt-5">
          <div className="flex gap-3 items-center">
            <img className="w-12 h-12" src={stripeImage} alt="" />{' '}
            <span className="text-xs"> Stripe Payment</span>
          </div>
          <form className="mt-5" onSubmit={handlerFormSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button
              className="w-full text-white bg-primary py-2 rounded-md"
              type="submit"
              disabled={!stripe || loading}
            >
              {loading ? (
                <span className="loading loading-spinner text-white"></span>
              ) : (
                `Pay $(${price})`
              )}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutForm;
