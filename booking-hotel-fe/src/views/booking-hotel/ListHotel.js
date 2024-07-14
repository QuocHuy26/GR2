import React, { useEffect, useState } from "react";
import { Row, notification, Button, Col, Table, Card } from "antd";
import { useSelector } from "react-redux";
import { getHotelListByUserId } from "../../services/hotel";
import { Link } from "react-router-dom";

const ListHotel = () => {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user);

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
        },
        {
            title: "Tên",
            dataIndex: "name",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
        },
        {
            title: "Hành động",
            dataIndex: "id",
            render: (id) => {
                return (
                    <>
                        <span
                            style={{ margin: '0 5px', }}
                        >
                            <Link style={{ color: 'blue', textDecoration: 'none' }} to={`/booking-hotel/${id}`}>Xem đơn</Link>
                        </span>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        getHotelListByUserId(user.id, (res) => {
            if (res.status === 200) {
                if (res.status === 200) {
                    let key = 1;
                    res.hotel_list.forEach((hotel) => {
                        hotel.key = key++;
                    });
                    setData(res.hotel_list);
                } else {
                    notification.error({
                        message: 'Thông báo',
                        description: res.message,
                        placement: `bottomRight`,
                        duration: 1.5,
                    })
                };
            };
        }, []);
    })
    return (
        <Row>
            <Col offset={3} span={18}>
                <Card
                    title="Danh sách khách sạn"
                    bordered={false}
                >
                    <Table
                        className="overflow-auto"
                        columns={columns}
                        dataSource={data}
                    />
                </Card>
            </Col>
        </Row>
    )
}

export default ListHotel;
