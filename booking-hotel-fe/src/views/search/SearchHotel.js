import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button, notification, Select } from 'antd';
import './style.css';
import { getDistrictListByProvince } from "../../services/district";
import { getProvinceList } from "../../services/province";
import { getHotelListByAddress } from "../../services/hotel";
import HotelItem from "../../components/hotel-item/HotelItem";

const SearchHotel = () => {
    const [data, setData] = useState([]);
    const [provinces, setProvince] = useState();
    const [districts, setDistrict] = useState();
    const [provinceID, setProvinceID] = useState();
    const [districtID, setDistrictID] = useState();

    const onFinish = (values) => {
        getHotelListByAddress(values, (res) => {
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
    }
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
        getHotelListByAddress({ provinceID, districtID }, (res) => {
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
        <div>
            <Row>
                <div className="search-button">
                    <div className="title"><h1>Chọn địa điểm bạn muốn đến</h1></div>
                    <Form layout="vertical" onFinish={onFinish}>
                        <Row className="no-gutter-row">
                            <Col span={10}>
                                <Form.Item
                                    name="province_id"
                                    className="no-margin-form-item"
                                >
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Chọn tỉnh/thành phố"
                                        optionFilterProp="province_id"
                                        onChange={(value) => setProvinceID(value)}
                                        filterOption={(input, option) => {
                                            if (option.children) {
                                                return (
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                );
                                            } else {
                                                return true;
                                            }
                                        }}
                                    >
                                        {provinces &&
                                            provinces.map((item, index) => (
                                                <Select.Option value={item.province_id} key={index}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Form.Item
                                    name="district_id"
                                    className="no-margin-form-item"
                                >
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Chọn quận/huyện"
                                        optionFilterProp="district_id"
                                        filterOption={(input, option) => {
                                            if (option.children) {
                                                return (
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                );
                                            } else {
                                                return true;
                                            }
                                        }}
                                    >
                                        {districts &&
                                            districts.map((item, index) => (
                                                <Select.Option value={item.district_id} key={index}>
                                                    {item.name}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Row>
                    </Form>
                </div>
            </Row>
            <div className="body">
                <section className="hotel">
                    <div className="container-hotel">
                        <div className="hotel-results">
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
        </div>
    );
}

export default SearchHotel;