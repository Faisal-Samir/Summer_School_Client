// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Swal from 'sweetalert2';

const Feedback = () => {
    const classFeedback = useLoaderData();
    // const [feedback, setFeedback] = useState('');
    useTitle("Feedback");
    const [error, setError] = useState("");
    const handleFeedback = (event) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        console.log(feedback)
        fetch(`https://school-summer-camp-server.vercel.app/class/feedback/${classFeedback._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ feedback }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount == 1) {
                    Swal.fire({
                        title: 'Feedback send successfully',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    event.target.reset();
                }
            })
            .catch(error => {
                setError(error.message);
            })
    };

    return (
        <div className='w-2/3 mx-auto shadow-xl mt-10'>
            <h2 className='text-center text-3xl font-semibold'>Feedback Page</h2>
            <form onSubmit={handleFeedback} className='px-10 py-10'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Feedback</span>
                    </label>
                    <input type="textarea"
                        name='feedback'
                        required
                        placeholder="enter your feedback" className="input input-bordered" />
                </div>
                <div className="form-control mt-2">
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300">Send</button>
                </div>
                {
                    error && <div className='text-red-500 font-semibold text-center'>{error}</div>
                }
            </form>
        </div>
    );
};

export default Feedback;

// const handleFeedback = (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const feedback = form.feedback.value;
//     console.log(feedback);
// }