import React from 'react';
import Banner from '../Banner/Banner';
import useTitle from '../../../hooks/useTitle';
import PopularInstructor from '../PopularInstructor/PopularInstructor';
import PopularClass from '../PopularClass/PopularClass';
import SportsOfferSection from '../SportsOfferSection/SportsOfferSection';

const Home = () => {
    useTitle("Home");
    return (
        <div className='mt-10 mb-10'>
            <Banner></Banner>
            <PopularInstructor></PopularInstructor>
            <PopularClass></PopularClass>
            <SportsOfferSection></SportsOfferSection>
        </div>
    );
};

export default Home;