import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import GoogleLogin from '../Shared/GoogleLogin/GoogleLogin';
import useTitle from '../../hooks/useTitle';
const Registration = () => {
    useTitle("Registration");
    const { createAccount, updateUserDetails, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();

    const handelRegistration = (data) => {
        if (data.password !== data.confirmPassword) {
            return;
        }
        console.log(data);
        createAccount(data.email, data.password, data.photoURL)
            .then(result => {
                const createUser = result.user;
                console.log(createUser);
                reset();
                updateUserDetails(data.name, data.photoURL)
                    .then(() => {
                        const savedUser = { name: data.name, email: data.email, photo: data.photoURL };
                        fetch(`https://school-summer-camp-server.vercel.app/users`, {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(userData => {
                                console.log(userData);
                            })
                        logout()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    })
            })
            .catch(error => {
                console.log(error);
                setError(error.message);
            })
    };

    return (
        <div className='mt-20 mb-20'>
            <form onSubmit={handleSubmit(handelRegistration)} className="max-w-md mx-auto mt-8 border rounded-lg shadow-lg p-6 border-indigo-500 border-opacity-50 animated-border">
                <h2 className="text-2xl font-semibold mb-6">Registration Form</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder='name'
                        className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-indigo-500"
                        {...register("name", { required: true })}
                    />
                    {
                        errors.name && <span className='text-red-500 mt-2'>Name is required</span>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='email'
                        className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-indigo-500"
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && <span className='text-red-500 mt-2'>Email is required</span>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder='password'
                        className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-indigo-500"
                        {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/, minLength: 6 })}
                    />
                    {
                        errors.password && <span className='text-red-500 mt-2'>Password is required</span>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder='confirm password'
                        className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-indigo-500"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (value) =>
                                value === watch("password") || "Passwords do not match",
                        })}
                    />
                    {
                        errors.confirmPassword && <span className='text-red-500 mt-2'>ConfirmPassword is required</span>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="photoURL" className="block text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        id="photoURL"
                        name="photoURL"
                        placeholder='photo URL'
                        className="w-full px-4 py-2 rounded-lg border focus:border-indigo-500 focus:ring-indigo-500"
                        {...register("photoURL", { required: true })}
                    />
                    {
                        errors.photoURL && <span className='text-red-500 mt-2'>PhotoURL is required</span>
                    }
                </div>
                <button
                    type="submit"
                    className="w-full btn btn-primary"
                >
                    Register
                </button>
                <p className='mt-2 text-center mb-20'>Already have an account? <Link to="/login" className='btn-link'>Login</Link></p>
            </form>
            <div className='-mt-40'>
                <GoogleLogin ></GoogleLogin>
                {
                    error && <div className='text-red-500 font-semibold text-center'>{error}</div>
                }
            </div>
        </div>
    );
};

export default Registration;