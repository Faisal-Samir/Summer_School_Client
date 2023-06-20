import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { Rotate } from 'react-awesome-reveal';

const MyClasses = () => {
    const { user } = useContext(AuthContext);
    const { data: classes = [], refetch } = useQuery
        (['classes', user?.email], async () => {
            const res = await fetch(`https://school-summer-camp-server.vercel.app/class/${user?.email}`)
            return res.json();
        })
    console.log(classes, user);
    return (
        <div>
            <h1 className='text-center text-2xl font-bold'>Instructor Classes</h1>
            <Rotate duration={1500} className="overflow-x-auto">
                <table className="table table-zebra mt-6 w-full">
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Available seat</th>
                            <th>Enroll Student</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((insClass, index) => <tr className='text-center' key={insClass._id}>
                                <th>{index + 1}</th>
                                <td><img className='w-12 h-12' src={insClass.image} alt="" /></td>
                                <td>{insClass.className}</td>
                                <td>{insClass.price}</td>
                                <td>{insClass.seat}</td>
                                <td>{insClass.enrollStudent ? insClass.enrollStudent : 0}</td>
                                <td>{insClass.status}</td>
                                <td>{insClass.status === 'pending' || insClass.status === 'approved' ? "" : insClass.feedback}</td>
                                <td><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Update</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </Rotate>
        </div>
    );
};

export default MyClasses;