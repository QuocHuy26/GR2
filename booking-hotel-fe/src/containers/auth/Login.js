import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import { login } from "../../services/auth";
import { setUser } from "../../store/reducers/user";
import "./style.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = (values) => {
        login(values, (res) => {
            // console.log(res);
            if (res.status === 200) {
                dispatch(setUser(res.data));
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                navigate('/abc');
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
        <div className='background'>
            <div className='overlay'>
                <div className="login-form">
                    <p style={{ fontSize: "30px", fontWeight: 'bold' }}>ĐĂNG NHẬP</p>
                    <Form onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
                        <Form.Item
                            label='Email'
                            name='email'
                            colon={false}
                            rules={[
                                {
                                    required: true
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
                                    required: true
                                }
                            ]}
                        >
                            <Input
                                type='password'
                                placeholder='Nhập mật khẩu'
                            />
                        </Form.Item>
                        <Button type='primary' htmlType="submit">Đăng nhập</Button>
                        <Button type='link' onClick={() => navigate("/register")}>Đăng ký</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login;