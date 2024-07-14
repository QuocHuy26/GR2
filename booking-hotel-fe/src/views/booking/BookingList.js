import { Col, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookingList } from "../../services/booking";
import BookingItem from "./BookingItem";

const BookingList = () => {
    const user = useSelector(state => state.user);
    const [data, setData] = useState([]);
    useEffect(() => {
        getBookingList(user.id, (res) => {
            if (res.status === 200) {
                console.log(res);
                setData(res.booking_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            }
        })
    }, []);

    return (
        <Col span={12} offset={6}>
            {data.map((booking) => (
                <BookingItem
                    data={booking}
                    key={booking.booking_id}
                />
            ))}
        </Col>
    )
}

export default BookingList;