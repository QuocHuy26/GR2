import { Button, Card, Col, Modal, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getHotelDetails } from "../../services/hotel";
import { getUserDetails } from "../../services/user";
import { formatToDate, formatToDateTime } from "../../services/formatDate";
import "./style.css";
import { getRoomDetails } from "../../services/room";
import { deleteBooking } from "../../services/booking";

const BookingItem = ({ data }) => {
    const [hotel, setHotel] = useState();
    const [cus, setCus] = useState();
    const [room, setRoom] = useState();

    const handleDeleteBooking = (id) => {
        Modal.confirm({
            title: `Hủy đặt phòng`,
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn hủy?',
            onOk() {
                deleteBooking(id, (res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: `Thông báo`,
                            description: res.message,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                        window.location.reload();
                    } else {
                        notification.error({
                            message: 'Thông báo',
                            description: 'Có lỗi xảy ra',
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                    }
                });
            },
            onCancel() {

            },
            centered: true,
        });
    }

    useEffect(() => {
        getUserDetails(data.user_id, (res) => {
            if (res.status === 200) {
                setCus(res.user);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            };
        });
        getHotelDetails(data.hotel_id, (res) => {
            if (res.status === 200) {
                setHotel(res.hotel);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            }
        });
        getRoomDetails(data.room_id, (res) => {
            if (res.status === 200) {
                setRoom(res.room);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            }
        });
    }, []);

    return (
        <>
            {hotel && room && (
                <div>
                    <Card>
                        <Row className="hotel-name">
                            <Col span={12} style={{ textAlign: 'left' }}>
                                <div style={{ color: '#05f' }}><h2>{hotel.name}</h2></div>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '12px', opacity: '0.7' }}>Thời gian: {formatToDateTime(data.bookDate)}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: 'left' }}>
                                <div><b>Địa chỉ: </b>{hotel.address}</div>
                                <div><b>SĐT: </b>{hotel.phone}</div>
                            </Col>
                            <Col span={11} offset={1} style={{ textAlign: 'right' }}>
                                <div><b>Phòng </b>{room.room_name}, loại: {(room.type === 0) && (<span>Phòng đơn kín</span>)}
                                    {(room.type === 1) && (<span>Phòng đôi kín</span>)}
                                    {(room.type === 2) && (<span>Phòng đơn có ban công</span>)}
                                    {(room.type === 3) && (<span>Phòng đôi có ban công</span>)}
                                </div>
                                <div>Ngày nhận phòng: {formatToDate(data.checkinDate)}</div>
                                <div>Ngày trả phòng: {formatToDate(data.checkoutDate)}</div>
                                <div className="status">
                                    {(data.status === 0) && <span style={{ color: 'gray' }}>Đang chờ duyệt</span>}
                                    {(data.status === 1) && <span style={{ color: '#5f0' }}>Đã xác nhận</span>}
                                    {(data.status === 2) && <span style={{ color: '#f50' }}>Bị từ chối</span>}
                                </div>
                                {(data.status === 0) && (
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => handleDeleteBooking(data.book_id)}
                                        style={{ padding: '5px' }}
                                    >
                                        Hủy đơn
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Card>
                </div>
            )}
        </>
    )
}
export default BookingItem;