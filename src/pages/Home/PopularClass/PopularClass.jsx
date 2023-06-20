import React, { useEffect, useState } from 'react';

const PopularClass = () => {
    const [popularCls, setPopularCls] = useState([]);

    useEffect(() => {
        fetch(`https://school-summer-camp-server.vercel.app/homeClasses/approved`)
            .then(res => res.json())
            .then(data => {
                setPopularCls(data);
            })
    }, [])
    return (
        <div className='w-full mt-10'>
            <h1 className='border-t-2 border-b-2 border-orange-600 py-3 text-5xl font-bold mb-14 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 '>Popular Classes</h1>
            <div className=' mx-auto space-y-4 grid grid-cols-1 lg:grid-cols-3 space-x-5'>
                {
                    popularCls.map(popular => <div className=" bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <div className="p-0 lg:p-4">
                            <img
                                class="rounded-t-lg h-60 mx-auto"

                                src={popular.image}
                                alt="" />
                            <a href="#!">
                                <div
                                    class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                            </a>
                            <div class="p-6">
                                <h5
                                    class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                    <span className='font-bold'>Name:</span> {popular.className}
                                </h5>
                                <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Instructor: {popular.instructorName}
                                </p>
                                <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Price: {popular.price}
                                </p>
                                <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                    Enroll Student: {popular.
                                        enrollStudent}
                                </p>

                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    );
};

export default PopularClass;

{/* <div key={popular._id}
    class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 w-5/6">
    <div
        class="relative overflow-hidden bg-cover bg-no-repeat"
        data-te-ripple-init
        data-te-ripple-color="light">
        <img
            class="rounded-t-lg h-60 mx-auto"

            src={popular.image}
            alt="" />
        <a href="#!">
            <div
                class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
    </div>
    <div class="p-6">
        <h5
            class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            <span className='font-bold'>Name:</span> {popular.className}
        </h5>
        <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Instructor: {popular.instructorName}
        </p>
        <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Price: {popular.price}
        </p>
        <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            Enroll Student: {popular.
                enrollStudent}
        </p>

    </div>
</div> */}