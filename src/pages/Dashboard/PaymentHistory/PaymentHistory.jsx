import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);

    const { data: paymentHistory = [], refetch } = useQuery
        (['paymentHistory'], async () => {
            const res = await fetch(`https://school-summer-camp-server.vercel.app/paymentsEnroll/${user.email}`)
            return res.json();
        })

    return (
        <div>
            <h1 className='text-center text-4xl text-fuchsia-500'>Payment History</h1>
            <table className="table table-zebra mt-6 w-full">
                {/* head */}
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Paid Amount</th>
                        <th>Student Email</th>
                        <th>Transaction Id</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        paymentHistory.map((history, index) => <tr className='text-center' key={history._id}>
                            <th>{index + 1}</th>
                            <td>{history.price}</td>
                            <td>{history.email}</td>
                            <td>{history.transactionId}</td>
                            <td>{history.date}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;