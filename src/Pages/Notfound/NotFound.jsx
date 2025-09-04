import React from 'react';

import UsePageTitle from '../../hooks/UsePageTitle';
import { Link } from 'react-router';


const NotFound = () => {
    
UsePageTitle("404 Not found")
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 px-4">
            <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
            <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
            <p className="mb-6 text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-gradient-to-r from-[#c6d936] to-[#6dd36d] text-white rounded-3xl transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default NotFound;
