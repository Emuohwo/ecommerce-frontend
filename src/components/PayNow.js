import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { useHistory } from 'react-router';

const FLWPUBK = process.env.REACT_APP_FLWPUBK;

export default function PayNow(props) {
    const { amount } = props;
    const history = useHistory();

  const config = {
    public_key: FLWPUBK,
    tx_ref: Date.now(),
    amount: 20,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'react@front.com',
      phonenumber: '07064586146',
      name: 'React Developer',
    },
    customizations: {
      title: 'Pay Eloshop',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="">

      <button
        onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
               history.push("/success", {
                 flwData: response,
                 products: props.cart 
               })
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}
      >
        Payment with React hooks
      </button>
    </div>
  );
}