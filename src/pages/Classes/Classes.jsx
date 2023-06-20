import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
// import { useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
const Classes = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useContext(AuthContext);
    useTitle("Classes");
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await fetch(`https://school-summer-camp-server.vercel.app/classes/approved`)
        return res.json();
    })
    console.log(classes);

    const handleSelect = (id) => {
        if (!user) {
            alert("Login first to select class");
        }
        else {
            fetch(`https://school-summer-camp-server.vercel.app/stdClass/${user.email}/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.length > 0) {
                        alert(`You have already selected ${classes.find((cls) => cls._id === id)?.className}`);
                        return;
                    }

                    // Continue with class selection logic
                    fetch(`https://school-summer-camp-server.vercel.app/stdClass`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            classId: id,
                            className: classes.find((cls) => cls._id === id)?.className,
                            instructorName: classes.find((cls) => cls._id === id)?.instructorName,
                            price: classes.find((cls) => cls._id === id)?.price,
                            userName: user.name,
                            userEmail: user.email,
                        }),
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.insertedId) {
                                alert("Class selection is successfully done");
                            }
                        });
                });
        }
    };

    return (
        <div className='mt-20 mb-20 grid grid-cols-2 gap-3 w-3/4 mx-auto'>
            {
                classes.map(cls => <div key={cls._id} className={cls.seat == 0 ? 'card w-96 bg-red-400 shadow-2xl' : 'card w-96 bg-base-100 shadow-2xl'}>
                    <figure><img className='h-80' src={cls.image} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-xl">{cls.className}</h2>
                        <p>Name of the Instructor: {cls.instructorName}</p>
                        <p>Available Seat: {cls.seat}</p>
                        <p>Enrollment Cost: {cls.price} Tk</p>
                        <p>Enrollment Student: {cls.enrollStudent} </p>
                        <div className="card-actions justify-end">
                            <button disabled={isAdmin || isInstructor || cls.seat == 0} onClick={() => handleSelect(cls._id)} className="btn btn-primary">Select</button>
                        </div>
                    </div>
                </div>
                )
            }
        </div>
    );
};

export default Classes;