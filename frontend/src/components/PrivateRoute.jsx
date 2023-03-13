import React from 'react';
import {useAuthStatus} from "../hooks/useAuthStatus.js";
import Spinner from "./Spinner.jsx";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {

    const {loggedIn, checkingStatus} = useAuthStatus();

    if(checkingStatus){
        return <Spinner />
    }

    return (
        <div>
            {loggedIn ? <Outlet /> : <Navigate to='/login' />}
        </div>
    );
};

export default PrivateRoute;