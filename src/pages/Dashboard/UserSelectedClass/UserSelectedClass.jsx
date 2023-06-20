import React, { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const UserSelectedClass = () => {
    const { user } = useContext(AuthContext);
    const { data: stdSelectedClass = [], refetch } = useQuery(['stdSelectedClass'], async () => {
        const res = await fetch(`https://school-summer-camp-server.vercel.app/stdClass/${user.email}`)
        return res.json();
    })
    console.log(stdSelectedClass)

    const handleDelete = id =>{
        fetch(`https://school-summer-camp-server.vercel.app/stdClass/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount == 1){
                alert("Class delete done");
            }
            refetch();
        })
    }

    const navigate = useNavigate();
    const handlePayment = classId =>{
        navigate(`/dashboard/payment/${classId}`);
        // console.log(id)
    }

    return (
        <div>
            <h1 className='text-center text-4xl text-fuchsia-500'>User Selected Class</h1>
            <table className="table table-zebra mt-6 w-full">
                {/* head */}
                <thead>
                    <tr className='text-center'>
                        <th></th>
                        <th>Class Name</th>
                        <th>Price</th>
                        <th>Instructor Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stdSelectedClass.map((stdClass, index) => <tr className='text-center' key={stdClass._id}>
                            <th>{index + 1}</th>
                            <td>{stdClass.className}</td>
                            <td>{stdClass.price}</td>
                            <td>{stdClass.instructorName}</td>
                            <td>
                                <button onClick={() =>handleDelete(stdClass.classId)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Delete</button>

                                <button onClick={() => handlePayment(stdClass.classId)} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Payment</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default UserSelectedClass;