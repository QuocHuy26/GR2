import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Select } from 'antd';
import { useState, useEffect } from 'react';
import { createHotel } from '../../services/hotel';
import { getProvinceList } from '../../services/province';
import { getDistrictListByProvince } from '../../services/district';
import { useSelector } from 'react-redux';

const AddHotel = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [provinces, setProvince] = useState();
    const [districts, setDistrict] = useState();
    const [provinceID, setProvinceID] = useState();

    const onFinish = (values) => {
        if (values.coordinates !== undefined) {
            const parts = values.coordinates.split(',');
            values.lat_address = parseFloat(parts[0]);
            values.long_address = parseFloat(parts[1]);
        }
        values.image = file;
        values.user_id = user.id;
        createHotel(values, (res) => {
            if (res.status === 201) {
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

    return (
        <div style={{ width: '500px', margin: '0 auto', backgroundColor: '#ffffffa8' }}>
            <p style={{ fontSize: "30px", fontWeight: 'bold' }}>Thêm khách sạn</p>
            <Form onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
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
                    label='Ảnh'
                    name="image"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the image!",
                        },
                    ]}
                >
                    <Input
                        type="file"
                        value={file}
                        onChange={(e) => {
                            const file = e.target.files[0]
                            setFile(file)
                        }}
                        placeholder={"Chọn 1 ảnh"}
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
                    <Input
                        placeholder='Nhập mô tả (không bắt buộc)'
                    />
                </Form.Item>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button danger block onClick={() => navigate('/hotel')}>Hủy</Button>
                    <Button type='primary' block htmlType="submit">Tạo</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddHotel;