import React, { useEffect, useState } from "react";
import { getRoomDetails } from "../../services/room";
import { getUserDetails } from "../../services/user";

const BookingTable = ({ data }) => {
    const [cus, setCus] = useState();
    const [room, setRoom] = useState();

    useEffect(() => {
        getUserDetails(data.user_id, (res) => {
            if (res.status === 200) {
                setData(res.user);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            };
        });
        getRoomDetails(data.room_id, (res) => {
            if (res.status === 200) {
                setData(res.room);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            };
        });
    }, [])
}