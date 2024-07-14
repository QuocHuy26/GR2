import React, { useEffect, useState } from "react";
import { Row, notification, Col, Table, Card } from "antd";
import { useParams } from "react-router-dom";
import { getBookingListByHotel, updateBooking } from "../../services/booking";
import { formatToDate, formatToDateTime } from "../../services/formatDate";

const BookingConfirm = () => {
    const [data, setData] = useState([]);
    const { id } = useParams();

    const handleTableChange = () => {
        getBookingListByHotel(id, (res) => {
            if (res.status === 200) {
                let key = 1;
                res.booking_list.forEach((booking) => {
                    booking.key = key++;
                });
                setData(res.booking_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            };
        })
    }

    const handleAccept = (book_id) => {
        updateBooking(book_id, { status: 1 }, (res) => {
            if (res.status === 200) {
                notification.success({
                    message: `Thông báo`,
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                handleTableChange();
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: 'Có lỗi xảy ra',
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        })
    }

    const handleRefuse = (book_id) => {
        updateBooking(book_id, { status: 2 }, (res) => {
            if (res.status === 200) {
                notification.success({
                    message: `Thông báo`,
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                handleTableChange();
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: 'Có lỗi xảy ra',
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        })
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
        },
        {
            title: "Phòng",
            dataIndex: "fk_book_room",
            render: (fk_book_room) => {
                return (
                    <>{fk_book_room.room_name}</>
                )
            }
        },
        {
            title: "Thời gian đặt",
            dataIndex: "bookDate",
            render: (bookingDate) => {
                return (
                    <>{formatToDateTime(bookingDate)}</>
                )
            }
        },
        {
            title: "Ngày nhận phòng",
            dataIndex: "checkinDate",
            render: (checkinDate) => {
                return (
                    <>{formatToDate(checkinDate)}</>
                )
            }
        },
        {
            title: "Ngày trả phòng",
            dataIndex: "checkoutDate",
            render: (checkoutDate) => {
                return (
                    <>{formatToDate(checkoutDate)}</>
                )
            }
        },
        {
            title: "Tình trạng",
            dataIndex: "status",
            filters: [
                { text: 'Đang chờ duyệt', value: 0 },
                { text: 'Đã xác nhận', value: 1 },
                { text: 'Bị từ chối', value: 2 },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                return (
                    <>
                        {(status === 0) && <span style={{ color: 'gray' }}>Đang chờ duyệt</span>}
                        {(status === 1) && <span style={{ color: '#5f0' }}>Đã xác nhận</span>}
                        {(status === 2) && <span style={{ color: '#f50' }}>Bị từ chối</span>}
                    </>
                )
            }
        },
        {
            title: "Hành động",
            dataIndex: "book_id",
            render: (book_id) => {
                return (
                    <>
                        <span
                            style={{ margin: '0 5px', color: '#0f5', cursor: 'pointer', }}
                            onClick={() => handleAccept(book_id)}
                        >
                            Chấp nhận
                        </span>
                        <span
                            style={{ margin: '0 5px', color: 'red', cursor: 'pointer', }}
                            onClick={() => handleRefuse(book_id)}
                        >
                            Từ chối
                        </span>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        getBookingListByHotel(id, (res) => {
            if (res.status === 200) {
                if (res.status === 200) {
                    let key = 1;
                    res.booking_list.forEach((booking) => {
                        booking.key = key++;
                    });
                    setData(res.booking_list);
                } else {
                    notification.error({
                        message: 'Thông báo',
                        description: res.message,
                        placement: `bottomRight`,
                        duration: 1.5,
                    })
                };
            };
        });
    }, []);

    return (
        <Row>
            <Col offset={3} span={18}>
                <Card
                    title="Danh sách đơn"
                    bordered={false}
                >
                    <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={data}
                        onChange={handleTableChange}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default BookingConfirm;
