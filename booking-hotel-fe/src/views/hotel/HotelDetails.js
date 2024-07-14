import { Button, Col, Image, notification, Row, Modal, Form, Select, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDistrictListByProvince } from "../../services/district";
import { deleteHotel, getHotelDetails, updateHotel } from "../../services/hotel";
import { getProvinceList } from "../../services/province";
import './hotel_detail.css';
import RoomList from "../room/RoomList";

const HotelDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const formRef = useRef(null);
    const [provinces, setProvince] = useState();
    const [districts, setDistrict] = useState();
    const [provinceID, setProvinceID] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const handleDeleteHotel = (id) => {
        Modal.confirm({
            title: `Xóa khách sạn`,
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa?',
            onOk() {
                deleteHotel(id, (res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: 'Thông báo',
                            description: res.message,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                        navigate('/hotel');
                    } else {
                        notification.error({
                            message: 'Thông báo',
                            description: res.message,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                    }
                });
            }
        })
    }

    const onFinish = (values) => {
        if (values.coordinates !== undefined) {
            const parts = values.coordinates.split(',');
            values.lat_address = parseFloat(parts[0]);
            values.long_address = parseFloat(parts[1]);
        }
        updateHotel(id, values, (res) => {
            if (res.status === 200) {
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                setOpenModal(false);
                setData(values);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
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
            } else {
                // notification.error({
                //     message: 'Thông báo',
                //     description: `${res.message}`,
                //     placement: `bottomRight`,
                //     duration: 1.5,
                // });
            }
        });
    }, [provinceID]);

    useEffect(() => {
        getHotelDetails(id, (res) => {
            if (res.status === 200) {
                setData(res.hotel);
                setImage(res.hotel.image);
                form.setFieldsValue({
                    name: res.hotel.name,
                    phone: res.hotel.phone,
                    min_price: res.hotel.min_price,
                    max_price: res.hotel.max_price,
                    province_id: res.hotel.province_id,
                    district_id: res.hotel.district_id,
                    address: res.hotel.address,
                    coordinates: res.hotel.lat_address ? (res.hotel.lat_address + ', ' + res.hotel.long_address) : null,
                    description: res.hotel.description,
                });
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
                        <Image className="image" src={image} alt={data.name} />
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
                        <div className="button">
                            <Button type="primary" onClick={() => setOpenModal(true)} >Sửa thông tin</Button>
                            <Button type="primary" danger onClick={() => handleDeleteHotel(id)}>Xóa khách sạn</Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <Modal
                title="Cập nhật thông tin khách sạn"
                open={openModal}
                onOk={() => formRef.current.submit()}
                onCancel={() => setOpenModal(false)}
            >
                <Form ref={formRef} form={form} onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
                    <Form.Item
                        label='Tên'
                        name='name'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập tên khách sạn'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Số điện thoại'
                        name='phone'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập số điện thoại liên hệ'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Giá thấp nhất'
                        name='min_price'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập giá thuê thấp nhất'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Giá cao nhất'
                        name='max_price'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập giá thuê cao nhất'
                        />
                    </Form.Item>
                    <Form.Item
                        name="province_id"
                        label='Tỉnh'
                        labelAlign="left"
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc',
                            },
                        ]}
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
                    {provinceID && (
                        <Form.Item
                            name="district_id"
                            label='Quận/Huyện'
                            labelAlign="left"
                            rules={[
                                {
                                    required: true,
                                    message: 'Thông tin này là bắt buộc',
                                },
                            ]}
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
                    )}
                    <Form.Item
                        label='Địa chỉ'
                        name='address'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập địa chỉ chi tiết'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Tọa độ'
                        name='coordinates'
                        colon={false}
                    >
                        <Input
                            placeholder='Nhập vĩ độ, kinh độ (không bắt buộc)'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Mô tả'
                        name='description'
                        colon={false}
                    >
                        <TextArea rows={10}
                            placeholder='Nhập mô tả (không bắt buộc)'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Row>
                <Col offset={6} span={12} style={{ marginTop: '20px' }}>
                    <RoomList hotel_id={id} />
                </Col>
            </Row>
        </>
    )
}

export default HotelDetails;