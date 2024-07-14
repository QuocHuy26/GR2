import React, { Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import HotelManagerRoute from './HotelManagerRoute';
import CustomerRoute from './CustomerRoute';
import Login from '../containers/auth/Login';
import { useSelector } from 'react-redux';

const AppRoutes = () => {
    const Register = React.lazy(() => import("../containers/auth/Register"));
    const UserList = React.lazy(() => import("../views/user/UserList"));
    const AddUser = React.lazy(() => import("../views/user/AddUser"));
    const UserDetails = React.lazy(() => import("../views/user/UserDetails"));
    const HotelList = React.lazy(() => import("../views/hotel/HotelList"));
    const AddHotel = React.lazy(() => import("../views/hotel/AddHotel"));
    const HotelDetails = React.lazy(() => import("../views/hotel/HotelDetails"));
    const SearchHotel = React.lazy(() => import("../views/search/SearchHotel"));
    const SearchHotelDetails = React.lazy(() => import("../views/hotel/SearchHotelDetails"));
    const BookingList = React.lazy(() => import("../views/booking/BookingList"));
    const ListHotel = React.lazy(() => import("../views/booking-hotel/ListHotel"));
    const BookingConfirm = React.lazy(() => import("../views/booking-hotel/BookingConfirm"))

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    useEffect(() => {
        if (currentPath === '/') {
            if (user.role === '') navigate('/login');
            if (user.role === 0) navigate('/user');
            if (user.role === 1) navigate('/hotel');
            if (user.role === 2) navigate('/search');
        }
        console.log(currentPath);
    }, [currentPath]);

    return (
        <>
            <Suspense fallback={<h1>Loading ...</h1>}>
                <Routes>
                    <Route
                        path='/login'
                        element={<Login />}
                    />
                    <Route
                        path='/register'
                        element={<Register />}
                    />
                    <Route
                        path='/user'
                        element={
                            <AdminRoute>
                                <UserList />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path='/user/create'
                        element={
                            <AdminRoute>
                                <AddUser />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path='/user/:id'
                        element={
                            <AdminRoute>
                                <UserDetails />
                            </AdminRoute>
                        }
                    />
                    <Route
                        path='/hotel'
                        element={
                            <HotelManagerRoute>
                                <HotelList />
                            </HotelManagerRoute>
                        }
                    />
                    <Route
                        path='/hotel/create'
                        element={
                            <HotelManagerRoute>
                                <AddHotel />
                            </HotelManagerRoute>
                        }
                    />
                    <Route
                        path='/hotel/:id'
                        element={
                            <HotelManagerRoute>
                                <HotelDetails />
                            </HotelManagerRoute>
                        }
                    />
                    <Route
                        path='/booking-hotel'
                        element={
                            <HotelManagerRoute>
                                <ListHotel />
                            </HotelManagerRoute>
                        }
                    />
                    <Route
                        path='/booking-hotel/:id'
                        element={
                            <HotelManagerRoute>
                                <BookingConfirm />
                            </HotelManagerRoute>
                        }
                    />
                    <Route
                        path='/search'
                        element={
                            <CustomerRoute>
                                <SearchHotel />
                            </CustomerRoute>
                        }
                    />
                    <Route
                        path='/search/hotel/:id'
                        element={
                            <CustomerRoute>
                                <SearchHotelDetails />
                            </CustomerRoute>
                        }
                    />
                    <Route
                        path='/booking'
                        element={
                            <CustomerRoute>
                                <BookingList />
                            </CustomerRoute>
                        }
                    />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}
export default AppRoutes;