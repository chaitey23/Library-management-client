import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Components/NavBar/NavBar';
import Footer from '../Components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
          <NavBar></NavBar>
           <div className='w-11/12 mx-auto'>
             <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;