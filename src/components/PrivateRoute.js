// client/src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth(); // 

    if (loading) {
        return <div>Loading authentication...</div>; // Or a spinner
    }

    return user ? children : <Navigate to="/login" />; // 
};

export default PrivateRoute;