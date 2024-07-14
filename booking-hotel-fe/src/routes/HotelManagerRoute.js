import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const HotelManagerRoute = (props) => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== 1) {
            navigate('/');
        }
    }, [user?.role, navigate]);

    if (user?.role !== 1) {
        return null;
    }

    return (
        <>
            {props.children}
        </>
    )
}
export default HotelManagerRoute;