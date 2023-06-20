import React from 'react';
import bannerImage from '../../../assets/workout-5914643_1920.jpg'
import { Link } from 'react-router-dom';
const Banner = () => {
    return (
        <div className=''>
            <div>
                <img src={bannerImage} alt="" />
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Unleash Your Athletic Potential
                        </h1>
                        <p className="text-lg sm:text-xl text-white mb-8">
                            Elevate Your Game with Professional Training
                        </p>
                        <Link
                            to="/"
                            className="py-3 px-6 bg-white text-blue-500 font-bold rounded-full shadow-lg hover:shadow-xl transition duration-300"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Banner;