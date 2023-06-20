import React from 'react';
import Swal from 'sweetalert2';

const SportsOfferSection = () => {
    const handleBtn = () => {
        Swal.fire({
            title: 'Facilities',
            text: "With top-notch lighting systems and ample seating areas, our tennis facilities create the perfect environment for both casual matches and intense tournaments",
            imageUrl: 'https://i.ibb.co/qm5wg7s/tennis-2557074-1280.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
    const handleBtn1 = () => {
        Swal.fire({
            title: 'Facilities',
            text: "Spectator-Friendly Amenities: We provide a comfortable and enjoyable experience for spectators with well-designed seating arrangements, ample parking space, and convenient access to food and beverage facilities, allowing them to cheer for their favorite teams and players in style.",
            imageUrl: 'https://i.ibb.co/yykKNkM/pexels-riccardo-parretti-10469894.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
    const handleBtn2 = () => {
        Swal.fire({
            title: 'Facilities',
            text: "With ample space and excellent lighting, our dedicated table tennis area provides the perfect environment for players of all skill levels to enjoy intense matches and friendly competitions.",
            imageUrl: 'https://i.ibb.co/zS8XB1V/table-tennis-1208385-1280.jpg',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
        })
    }
    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="border-t-2 border-b-2 border-orange-600 py-2 text-6xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-10">Sports Facilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co/qm5wg7s/tennis-2557074-1280.jpg"
                            alt="Sports Offer"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Long Tennis</h3>
                            <p className="text-gray-600">
                                Our state-of-the-art tennis facilities boast meticulously maintained courts, providing players of all skill levels with an unparalleled experience.
                            </p>
                            <button onClick={handleBtn} className="mt-4 btn btn-primary">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co/yykKNkM/pexels-riccardo-parretti-10469894.jpg"
                            alt="Sports Offer"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Cricket</h3>
                            <p className="text-gray-600">
                                Our state-of-the-art infrastructure, including well-maintained pitches, spacious nets, and modern training equipment, ensuring an optimal environment for players to enhance their skills.
                            </p>
                            <button onClick={handleBtn1} className="mt-4 btn btn-primary">
                                View Details
                            </button>
                        </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img
                            src="https://i.ibb.co/zS8XB1V/table-tennis-1208385-1280.jpg"
                            alt="Sports Offer"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">Table Tennis</h3>
                            <p className="text-gray-600">
                                Our table tennis facilities are equipped with top-of-the-line tables, ensuring a smooth and consistent playing surface for an exceptional gaming experience. Also provide strong bats for play.
                            </p>
                            <button onClick={handleBtn2} className="mt-4 btn btn-primary">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SportsOfferSection;
