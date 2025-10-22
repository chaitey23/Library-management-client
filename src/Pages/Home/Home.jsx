import React from 'react';
import Banner from '../../Components/Banner/Banner';
import HomeCategories from '../../Components/HomeCategories/HomeCategories';
import AboutLibrary from '../../Components/AboutLibrary/AboutLibrary';
import LibraryStats from '../../Components/LibraryStats/LibraryStats';
import UsePageTitle from '../../hooks/UsePageTitle';
import FeaturedReviews from '../../Components/FeaturedReviews/FeaturedReviews';
import FeaturedBooks from '../../Components/FeaturedBooks/FeaturedBooks';


const Home = () => {
    UsePageTitle("Home");
    return (
        <div>
            <Banner></Banner>
            <FeaturedBooks></FeaturedBooks>
            <HomeCategories></HomeCategories>
            <AboutLibrary></AboutLibrary>
            <LibraryStats></LibraryStats>
            <FeaturedReviews></FeaturedReviews>
        </div>
    );
};

export default Home;