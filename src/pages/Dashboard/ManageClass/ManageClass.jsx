import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageClass = () => {
    const { data: classes = [], refetch } = useQuery
        (['classes',], async () => {
            const res = await fetch(`https://school-summer-camp-server.vercel.app/classes`)
            // refetch();
            return res.json();
        })
    console.log(classes);

    const handleMakeApprove = id => {
        fetch(`https://school-summer-camp-server.vercel.app/classes/approved/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }

    const handleMakeDeny = id => {
        fetch(`https://school-summer-camp-server.vercel.app/classes/deny/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }

    const navigate = useNavigate();
    const handleFeedback = id =>{
        navigate(`/feedBack/${id}`)
    }

    return (
        <div>
            <table className="table table-zebra mt-6 w-full">
                {/* head */}
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Image</th>
                        <th>Class Name</th>
                        <th>Instructor Name</th>
                        <th>Instructor Email</th>
                        <th>Price</th>
                        <th>Available seat</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((allClass, index) => <tr className='text-center' key={allClass._id}>
                            <th>{index + 1}</th>
                            <td><img className='w-12 h-12' src={allClass.image} alt="" /></td>
                            <td>{allClass.className}</td>
                            <td>{allClass.instructorName}</td>
                            <td>{allClass.email}</td>
                            <td>{allClass.price}</td>
                            <td>{allClass.seat}</td>
                            <td>{allClass.status}</td>
                            <td className="flex flex-col">
                                {
                                    allClass.status === 'pending' ? (
                                        <div className='flex flex-col space-y-2'>
                                            <button
                                                disabled={allClass.status === 'approved' || allClass.status === 'deny'}
                                                onClick={() => handleMakeApprove(allClass._id)}
                                                className='btn btn-success'
                                            >
                                                Approve
                                            </button>
                                            <button
                                                disabled={allClass.status === 'approved' || allClass.status === 'deny'}
                                                onClick={() => handleMakeDeny(allClass._id)}
                                                className='btn btn-error'
                                            >
                                                Deny
                                            </button>
                                            <button className='btn btn-primary mt-2' onClick={() => handleFeedback(allClass._id)}>
                                                Send Feedback
                                            </button>
                                        </div>
                                    ) : <div className='flex flex-col space-y-2'>
                                        <button
                                            disabled
                                            className='btn btn-success'
                                        >
                                            Approve
                                        </button>
                                        <button
                                            disabled
                                
                                            className='btn btn-error'
                                        >
                                            Deny
                                        </button>
                                        <button className='btn btn-primary mt-2' onClick={() => handleFeedback(allClass._id)}>
                                            Send Feedback
                                        </button>
                                    </div>
                                }

                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageClass;