import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import { Slide, Zoom } from 'react-awesome-reveal';

const image_hosting_token = import.meta.env.VITE_Image_Hosting_Token;

const AddClass = () => {
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const { user } = useContext(AuthContext);
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

    const handleAddClass = data => {
        console.log(data);

        const fromData = new FormData();
        fromData.append('image', data.image[0])
        fetch(image_hosting_url, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(img => {
                // console.log(img);
                if (img.success) {
                    const img_URL = img.data.display_url;
                    const { className, email, instructorName, price, seat, image } = data;
                    const classAdd = { email, instructorName, className, price: parseFloat(price), seat: parseInt(seat), image: img_URL, status: 'pending',enrollStudent: 0 };
                    console.log(classAdd);
                    axios.post(`https://school-summer-camp-server-faisal-samir.vercel.app/classes`, classAdd)
                        .then(data => {
                            console.log("new class added", data.data);
                            if (data.data.insertedId) {
                                alert("Item Added");
                                reset();
                            }
                        })
                }
            })
    }
    return (
        <Zoom duration={1500} className=''>
            <Slide triggerOnce>
                <h2 className="text-2xl font-semibold mb-6 text-center ">Add Class</h2>
            </Slide>

            <form onSubmit={handleSubmit(handleAddClass)} className='border rounded-lg shadow-lg p-6 border-indigo-500 border-opacity-50 animated-border'>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="className" className="text-lg font-medium">
                            Class Name *
                        </label>
                        <input
                            type="text"
                            id="className"
                            name='className'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            {...register("className", { required: true })}
                        />
                        {
                            errors.className && <span className='text-red-500 mt-2'>Class Name is required</span>
                        }
                    </div>
                    <div>
                        <label htmlFor="instructorName" className="text-lg font-medium">
                            Instructor Name
                        </label>
                        <input
                            type="text"
                            id="instructorName"
                            name='instructorName'
                            defaultValue={user?.displayName || ''}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            {...register("instructorName", { required: true })}
                        />

                    </div>
                    <div>
                        <label htmlFor="instructorEmail" className="text-lg font-medium">
                            Instructor Email
                        </label>
                        <input
                            type="email"
                            id="instructorEmail"
                            name='email'
                            defaultValue={user?.email || ''} readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            {...register("email", { required: true })}
                        />
                        {/* {
                            errors.email && <span className='text-red-500 mt-2'>email is required</span>
                        } */}

                    </div>
                    <div>
                        <label htmlFor="availableSeat" className="text-lg font-medium">
                            Available Seat *
                        </label>
                        <input
                            type="number"
                            id="availableSeat"
                            name='seat'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            {...register("seat", { required: true })}
                        />
                        {
                            errors.seat && <span className='text-red-500 mt-2'>Seat is required</span>
                        }
                    </div>
                    <div>
                        <label htmlFor="price" className="text-lg font-medium">
                            Price *
                        </label>
                        <input
                            type="number"
                            id="price"
                            name='price'
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                            {...register("price", { required: true })}
                        />
                        {
                            errors.price && <span className='text-red-500 mt-2'>Price is required</span>
                        }
                    </div>
                    <div>
                        <input
                            type="file"
                            id="classImage"
                            name='image'
                            className="file-input file-input-bordered  max-w-xs"
                            {...register("image", { required: true })}
                        />
                        {
                            errors.image && <span className='text-red-500 mt-2 ml-2'>image required</span>
                        }
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 text-white bg-primary rounded-md hover:bg-primary-dark"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </Zoom>
    );
};

export default AddClass;