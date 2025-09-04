import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar/NavBar';
import Footer from '../Components/Footer/Footer';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col'>
          <NavBar></NavBar>
          <ScrollToTop></ScrollToTop>
           <div className='w-11/12 mx-auto px-4'>
             <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;