import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';

const EnrollmentClass = () => {
    const {user} = useContext(AuthContext);

    const { data: enrollClasses = [], refetch } = useQuery
        (['enrollClasses'], async () => {
            const res = await fetch(`https://school-summer-camp-server.vercel.app/payments/${user.email}`)
            return res.json();
        })
    // console.log(enrollClasses);
    return (
        <div>
            <h1 className='text-center text-4xl text-fuchsia-500'>Enrollment Classes</h1>
            <table className="table table-zebra mt-6 w-full">
                {/* head */}
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Class Name</th>
                        <th>Price</th>
                        <th>Student Email</th>
                        <th>Transaction Id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        enrollClasses.map((enrollCls, index) => <tr className='text-center' key={enrollCls._id}>
                            <th>{index + 1}</th>
                            <td>{enrollCls.name}</td>
                            <td>{enrollCls.price}</td>
                            <td>{enrollCls.email}</td>
                            <td>{enrollCls.transactionId}</td>
                            <td>{enrollCls.status}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default EnrollmentClass;