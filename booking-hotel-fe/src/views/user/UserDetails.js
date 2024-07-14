import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, Radio, Modal } from 'antd';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getUserDetails, updateUser } from '../../services/user';
import { useEffect } from 'react';

const UserDetails = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { id } = useParams();

    const onFinish = (values) => {
        let submitData = {
            username: values.username,
            phone: values.phone,
            role: values.role,
            email: values.email,
        }
        Modal.confirm({
            title: 'Cập nhật user',
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn cập nhật?',
            onOk() {
                updateUser(id, submitData, (res) => {
                    if (res.status === 200) {
                        notification.success({
                            message: 'Thông báo',
                            description: res.message,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                        navigate(`/user/${id}`);
                    } else {
                        notification.error({
                            message: 'Thông báo',
                            description: `Có lỗi xảy ra, vui lòng thử lại`,
                            placement: `bottomRight`,
                            duration: 1.5,
                        });
                    }
                });
            },
            centered: true,
        });
    }

    useEffect(() => {
        getUserDetails(id, (res) => {
            if (res.status === 200) {
                console.log(res.user);
                form.setFieldsValue({
                    username: res.user.username,
                    phone: res.user.phone,
                    role: res.user.role,
                    email: res.user.email,
                });
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        });
    })

    return (
        <div style={{ width: '420px', margin: '0 auto', backgroundColor: '#ffffffa8' }}>
            <p style={{ fontSize: "30px", fontWeight: 'bold' }}>CHI TIẾT</p>
            <Form form={form} onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
                <Form.Item
                    label='Email'
                    name='email'
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập địa chỉ email'
                        }
                    ]}
                >
                    <Input
                        placeholder='Nhập email'
                    />
                </Form.Item>
                <Form.Item
                    label='Tên'
                    name='username'
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập tên của bạn'
                        }
                    ]}
                >
                    <Input
                        placeholder='Nhập tên của bạn'
                    />
                </Form.Item>
                <Form.Item
                    label='SĐT'
                    name='phone'
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập số điện thoại của bạn'
                        }
                    ]}
                >
                    <Input
                        placeholder='Nhập số điện thoại'
                    />
                </Form.Item>
                <Form.Item
                    label='Vai trò'
                    name='role'
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: "Thông tin này là bắt buộc"
                        }
                    ]}
                >
                    <Radio.Group>
                        <Radio value={0}>Admin</Radio>
                        <Radio value={1}>Quản lý</Radio>
                        <Radio value={2}>Khách hàng</Radio>
                    </Radio.Group>
                </Form.Item>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button danger block onClick={() => navigate('/user')}>Quay lại</Button>
                    <Button type='primary' block htmlType="submit">Cập nhật</Button>
                </div>
            </Form>
        </div>
    )
}

export default UserDetails;