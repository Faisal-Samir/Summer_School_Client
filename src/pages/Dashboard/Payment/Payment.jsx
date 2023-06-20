import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Checkout from './Checkout';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const payable = useLoaderData();
    // console.log(payable.price);
    return (
        <div>
            <h1 className='text-center text-4xl text-fuchsia-500'>Payment Page</h1>
            <Elements stripe={stripePromise}>
                <Checkout price={payable.price} payable={payable}></Checkout>
            </Elements>
        </div>
    );
};

export default Payment;