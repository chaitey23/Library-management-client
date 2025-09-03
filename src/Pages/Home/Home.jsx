import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HomeCategories from '../../Components/HomeCategories/HomeCategories';
import AboutLibrary from '../../Components/AboutLibrary/AboutLibrary';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HomeCategories></HomeCategories>
            <AboutLibrary></AboutLibrary>
        </div>
    );
};

export default Home;