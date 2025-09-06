import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
 const axiosInstance = axios.create({
        baseURL:import.meta.env.VITE_BASE_URL
    }) 

const useAxiosSecure = () => {
   
const {user} = useContext(AuthContext);
axiosInstance.interceptors.request.use(config => {
   if(user?.accessToken){
     config.headers.authorization = `Bearer ${user.accessToken}`
   }
    return config;
})

    return axiosInstance;
};

export default useAxiosSecure;