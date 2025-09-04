import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HomeCategories from '../../Components/HomeCategories/HomeCategories';
import AboutLibrary from '../../Components/AboutLibrary/AboutLibrary';
import LibraryStats from '../../Components/LibraryStats/LibraryStats';
import UsePageTitle from '../../hooks/UsePageTitle';

const Home = () => {
    UsePageTitle("Home")
    return (
        <div>
            <Banner></Banner>
            <HomeCategories></HomeCategories>
            <AboutLibrary></AboutLibrary>
            <LibraryStats></LibraryStats>
        </div>
    );
};

export default Home;