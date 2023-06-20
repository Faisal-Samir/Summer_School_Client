import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import './Checkout.css'
const Checkout = ({ payable, price }) => {
    console.log(price);
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const [transId, setTransId] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        axios.post(`https://school-summer-camp-server.vercel.app/create-payment-intent`, { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [])

    const handleSubmit = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        console.log(`card`, card);


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );
        if (confirmError) {
            setError(confirmError);
        }
        console.log(paymentIntent);

        if (paymentIntent.status == 'succeeded') {
            setTransId(paymentIntent.id);
            setSuccess(`Transaction complete with transaction id ${paymentIntent.id}`);
            console.log(paymentIntent.id);
            const payment = {
                email: user?.email, transactionId: paymentIntent.id,
                date: new Date(),
                price,
                name: payable.className,
                classId: payable.classId
            }
            axios.post(`https://school-summer-camp-server.vercel.app/payments`, payment)
                .then(res => {
                    console.log(res.data);
                })
        }



    }
    return (
        <form className='w-96' onSubmit={handleSubmit}>
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
            <button type="submit" className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" disabled={!stripe || !clientSecret}>Pay</button>
            {
                error ? <div className='text-red-500 font-semibold text-center'>{error}</div> : <div className='text-green-700 font-semibold text-center'>{success}</div> 
            }
        </form>

    );
};

export default Checkout;