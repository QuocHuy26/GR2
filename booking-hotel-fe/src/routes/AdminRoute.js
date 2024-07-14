import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const AdminRoute = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== 0) {
            navigate('/');
        }
    }, [user?.role, navigate]);

    if (user?.role !== 0) {
        return null;
    }

    return (
        <>
            {props.children}
        </>
    )
}
export default AdminRoute;