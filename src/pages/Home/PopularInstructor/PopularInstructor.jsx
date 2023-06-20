import { useQuery } from '@tanstack/react-query';
import React from 'react';

const PopularInstructor = () => {
    const { data: instructors = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch(`https://school-summer-camp-server.vercel.app/users/instructor`)
        return res.json();
    })
    console.log(instructors);
    return (
        <div className='mt-10 mb-20 w-3/4 mx-auto'>
            <div className='mb-14 py-4'>
                <h1 className='text-4xl lg:text-6xl font-bold border-t-2 border-b-2 border-orange-600 py-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-10'>Popular Instructors</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    instructors.map(ins => <div className="wrapper bg-gray-400 antialiased text-gray-900">
                        <div>

                            <img src={ins.photo} alt=" instructor image" className="w-full object-cover object-center rounded-lg shadow-md h-96" />

                            <div className="relative px-4 -mt-16 text-center ">
                                <div className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex items-baseline justify-center">
                                        <span className="bg-teal-200 text-teal-800 px-2 inline-block rounded-full  uppercase font-semibold tracking-wide text-lg">
                                            Name:
                                        </span>
                                        <span className='text-xl ml-1'>{ins.name}</span>
                                    </div>

                                    <div className="mt-1">
                                        Email:
                                        <span className="text-gray-600 text-sm">{ins.email}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularInstructor;