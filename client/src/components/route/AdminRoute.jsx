import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
    const { user } = useSelector(state => state.user);
    return (
        user.role === "admin" ?
            <Outlet /> :
            <Navigate to="/login" />
    )
}

export default AdminRoute