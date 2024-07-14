import { Button, Col, Image, notification, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDistrictListByProvince } from "../../services/district";
import { getHotelDetails } from "../../services/hotel";
import { getProvinceList } from "../../services/province";
import AvalableRoomList from "../room/AvalableRoomList";
import "./hotel_detail.css";

const SearchHotelDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [provinces, setProvince] = useState();
    const [districts, setDistrict] = useState();
    const [provinceID, setProvinceID] = useState();

    useEffect(() => {
        getProvinceList((res) => {
            if (res.status === 200) {
                setProvince(res.province_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: `${res.message}`,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        });
    }, []);

    useEffect(() => {
        getDistrictListByProvince(provinceID, (res) => {
            if (res.status === 200) {
                setDistrict(res.district_list);
            }
        });
    }, [provinceID]);

    useEffect(() => {
        getHotelDetails(id, (res) => {
            if (res.status === 200) {
                setData(res.hotel);
                setProvinceID(res.hotel.province_id);
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
        <>
            <Row>
                <Col span={9} offset={3}>
                    <div className="name">{data.name}</div>
                    <div className="hotel-image">
                        <Image className="image" src={data.image} alt={data.name} />
                    </div>
                </Col>
                <Col span={9} style={{ display: 'flex' }}>
                    <div className="hotel-info">
                        <div className="address">
                            <div><b>Địa chỉ: </b>{data.address} </div>
                            <div><b>Số điện thoại liên hệ: </b>{data.phone}</div>
                            <div><b>Giá: </b>{data.min_price} - {data.max_price} VNĐ/ngày</div>
                            {data.lat_address &&
                                <div>
                                    <b>Tọa độ: </b>{data.lat_address}, {data.long_address}
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${data.lat_address},${data.long_address}`}
                                        target={"_blank"}
                                        style={{
                                            color: "#05f",
                                            marginLeft: '20px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                                    >
                                        Vị trí GG MAPS
                                    </a>
                                </div>
                            }
                            <div><b>Mô tả: </b>{data.description}</div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col offset={6} span={12} style={{ marginTop: '20px' }}>
                    <AvalableRoomList hotel_id={id} />
                </Col>
            </Row>
        </>
    )
}

export default SearchHotelDetails;