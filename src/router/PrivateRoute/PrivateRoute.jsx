import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();
if(loading){
    return (
        <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-green-700 animate-spin" />
      </div>
    )
}
if(!user){
    return  <Navigate to='/login' state={{ from: location }} replace>

    </Navigate>
}

    return children
};

export default PrivateRoute;