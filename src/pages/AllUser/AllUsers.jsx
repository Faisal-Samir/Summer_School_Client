import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Fade } from "react-awesome-reveal";

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch(`https://school-summer-camp-server.vercel.app/users`)
        return res.json();
    })

    const handleMakeAdmin = id => {
        fetch(`https://school-summer-camp-server.vercel.app/users/admin/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }
    const handleMakeInstructor = id => {
        fetch(`https://school-summer-camp-server.vercel.app/users/instructor/${id}`, {
            method: "PATCH"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                refetch();
            })
    }
    return (
        <div>
            <Fade><h1 className='text-3xl font-semibold'>Total User: {users.length}</h1></Fade>
            <Fade className="overflow-x-auto">
                <table className="table table-zebra mt-6">
                    {/* head */}
                    <thead>
                        <tr className='text-center'>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.role ? item.role : "student"}</td>
                                <td>
                                    {item.role === 'student' ? 'admin' : <div className='space-x-3'>

                                        <button disabled={item.role === 'admin'} onClick={() => handleMakeAdmin(item._id)} className='btn btn-success'>Admin</button>

                                        <button disabled={item.role === 'admin' || item.role === 'instructor'} onClick={() => handleMakeInstructor(item._id)} className='btn btn-error'>Instructor</button>

                                    </div>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </Fade>
        </div>
    );
};

export default AllUsers;