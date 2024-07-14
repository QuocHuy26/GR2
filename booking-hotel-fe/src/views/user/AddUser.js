import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification, Radio } from 'antd';
import { createUser } from '../../services/user';

const AddUser = () => {
    const navigate = useNavigate();

    const onFinish = (values) => {
        createUser(values, (res) => {
            if (res.status === 201) {
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                navigate('/user');
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

    return (
        <div style={{ width: '420px', margin: '0 auto', backgroundColor: '#ffffffa8' }}>
            <p style={{ fontSize: "30px", fontWeight: 'bold' }}>ĐĂNG KÝ</p>
            <Form onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
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
                    label='Mật khẩu'
                    name='password'
                    colon={false}
                    rules={[
                        {
                            required: true,
                            message: 'Nhập mật khẩu'
                        }
                    ]}
                >
                    <Input
                        type='password'
                        placeholder='Nhập mật khẩu'
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
                        <Radio value='0'>Admin</Radio>
                        <Radio value='1'>Quản lý</Radio>
                        <Radio value='2'>Khách hàng</Radio>
                    </Radio.Group>
                </Form.Item>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button danger block onClick={() => navigate('/user')}>Hủy</Button>
                    <Button type='primary' block htmlType="submit">Tạo</Button>
                </div>
            </Form>
        </div>
    )
}

export default AddUser;