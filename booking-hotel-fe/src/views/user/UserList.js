import { Card, Col, Modal, notification, Row, Table, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { deleteUser, getUserList } from "../../services/user";

const UserList = () => {
    const [data, setData] = useState([]);

    const handleTableChange = () => {
        getUserList((res) => {
            if (res.status === 200) {
                let key = 1;
                res.user_list.forEach((user) => {
                    user.key = key++;
                });
                setData(res.user_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            }
        })
    }

    const handleDelete = (id) => {
        Modal.confirm({
            title: `Xóa user`,
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa?',
            onOk() {
                deleteUser(id, (res) => {
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
                });
            },
            onCancel() {
                notification.info({
                    message: 'Thông báo',
                    description: 'Hủy xóa user',
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            },
            centered: true,
        });
    }

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
        },
        {
            title: "Tên",
            dataIndex: "username",
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            render: (role) => {
                return (
                    <>
                        {(role === 0) && (<span>Admin</span>)}
                        {(role === 1) && (<span>Quản lý</span>)}
                        {(role === 2) && (<span>Khách hàng</span>)}
                    </>
                )
            }
        },
        {
            title: "Email",
            dataIndex: "email",
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
                            <Link style={{ color: 'blue', textDecoration: 'none' }} to={`/user/${id}`}>Chi tiết</Link>
                        </span>
                        <span
                            style={{ margin: '0 5px', color: 'red', cursor: 'pointer', }}
                            onClick={() => handleDelete(id)}
                        >
                            Xóa
                        </span>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        getUserList((res) => {
            if (res.status === 200) {
                let key = 1;
                res.user_list.forEach((user) => {
                    user.key = key++;
                });
                setData(res.user_list);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                })
            }
        })
    }, []);

    return (
        <Row>
            <Col offset={3} span={18}>
                <div style={{ display: 'flex', marginTop: '20px' }}>
                    <Link to="/user/create">
                        <Button style={{
                            backgroundColor: '#009cff',
                            color: '#fff',
                            marginBottom: '10px',
                            borderRadius: '5px'
                        }}>
                            Thêm user mới
                        </Button>
                    </Link>
                </div>
                <Card
                    title="Danh sách user"
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

export default UserList;