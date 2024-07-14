import React, { useEffect, useState } from "react";
import { Row, notification, Button } from "antd";
import "./hotel.css";
import { useSelector } from "react-redux";
import { getHotelListByUserId } from "../../services/hotel";
import HotelItem from "../../components/hotel-item/HotelItem";
import { Link } from "react-router-dom";

const HotelList = () => {
    const [data, setData] = useState([]);
    const user = useSelector(state => state.user);

    useEffect(() => {
        getHotelListByUserId(user.id, (res) => {
            if (res.status === 200) {
                setData(res.hotel_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            };
        });
    }, []);

    return (
        <div className="body">
            <section className="hotel">
                <div className="container-hotel">
                    <div className="hotel-results">
                        <div style={{ display: 'flex', marginTop: '20px' }}>
                            <Link to="/hotel/create">
                                <Button style={{
                                    backgroundColor: '#009cff',
                                    color: '#fff',
                                    marginBottom: '10px',
                                    borderRadius: '5px'
                                }}>
                                    Thêm khách sạn mới
                                </Button>
                            </Link>
                        </div>
                        <div className="title">
                            <h1>Bạn đang quản lý <span style={{ color: '#ff4d4d' }}>{data.length}</span> khách sạn</h1>
                        </div>
                        <div className="hotel-list">
                            {data && (
                                <Row
                                    gutter={[10, 20]}
                                    justify={data.length === 1 ? "center" : "start"}
                                >
                                    {data.map((hotel) => (
                                        <HotelItem
                                            data={hotel}
                                            key={hotel.id}
                                        />
                                    ))}
                                </Row>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HotelList;
