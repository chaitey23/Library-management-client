import React, { use } from 'react';
import { AuthContext } from '../../Contexts/AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import { Loader2 } from 'lucide-react';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext);
    const location = useLocation();
if(loading){
    return <Loader2 className=' className="text-center py-10'></Loader2>
}
if(!user){
    return  <Navigate to='/login' state={{ from: location }} replace>

    </Navigate>
}

    return children
};

export default PrivateRoute;