import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-8">
            <div className="container mx-auto px-4">
                <div className=" grid grid-cols-1 lg:grid-cols-2 py-6 justify-center items-center">
                    {/* address */}
                    <div className=" w-full px-4 text-center">
                        <p className="text-white normal-case text-xl mb-4">Sam<span className='text-3xl font-semibold text-[#006600] '>'s Gr</span>ound</p>
                        <p className="text-gray-400">Kalachadpur main road<br />Gulsan, Dhaka 1212</p>
                    </div>
                    {/* contact */}
                    <div className=" w-full px-4 text-center">
                        <h4 className="text-white text-lg mb-4">Contact</h4>
                        <p className="text-gray-400">
                            <strong>Email:</strong> samirfaisal16@gmail.com<br />
                            <strong>Phone:</strong> 01619252319
                        </p>
                    </div>
                    <div className="md:w-1/2 lg:w-1/4 w-full px-4">
                        {/* Add any additional sections or links here */}
                    </div>
                    <div className="md:w-1/2 lg:w-1/4 w-full px-4">
                        {/* Add any additional sections or links here */}
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-gray-400">
                        © {new Date().getFullYear()} Sam's Ground. All rights reserved. |
                        Design and development by <span className=" normal-case text-xl">Sam<span className='text-3xl font-semibold text-[#006600] '>'s Gr</span>ound</span>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;