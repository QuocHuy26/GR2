import { Card, Col, Modal, notification, Row, Table, Button, Form, Select, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { createRoom, deleteRoom, getRoomList, updateRoom } from "../../services/room";

const RoomList = ({ hotel_id }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [form] = Form.useForm();
    const [CreateForm] = Form.useForm();
    const formRef = useRef(null);
    const formCreateRef = useRef(null);

    const handleTableChange = () => {
        getRoomList(hotel_id, (res) => {
            if (res.status === 200) {
                let key = 1;
                res.room_list.forEach((room) => {
                    room.key = key++;
                });
                setData(res.room_list);
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
            title: `Xóa phòng`,
            icon: <ExclamationCircleOutlined />,
            content: 'Bạn có chắc chắn muốn xóa?',
            onOk() {
                deleteRoom(id, (res) => {
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
                    description: 'Hủy xóa phòng',
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            },
            centered: true,
        });
    }

    const create = (values) => {
        values.hotel_id = id;
        createRoom(values, (res) => {
            if (res.status === 201) {
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                setOpenCreateModal(false);
                handleTableChange();
                CreateForm.resetFields();
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

    const onFinish = (values) => {
        updateRoom(id, values, (res) => {
            if (res.status === 200) {
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                setOpenModal(false);
                handleTableChange();
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

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
        },
        {
            title: "Tên",
            dataIndex: "room_name",
        },
        {
            title: "Loại phòng",
            dataIndex: "type",
            render: (type) => {
                return (
                    <>
                        {(type === 0) && (<span>Phòng đơn kín</span>)}
                        {(type === 1) && (<span>Phòng đôi kín</span>)}
                        {(type === 2) && (<span>Phòng đơn có ban công</span>)}
                        {(type === 3) && (<span>Phòng đôi có ban công</span>)}
                    </>
                )
            }
        },
        {
            title: "Giá",
            dataIndex: "price",
        },
        {
            title: "Hành động",
            dataIndex: "room_id",
            render: (room_id) => {
                return (
                    <>
                        <span
                            style={{ margin: '0 5px', color: 'blue', cursor: 'pointer', }}
                            onClick={() => setOpenModal(true)}
                        >
                            Sửa
                        </span>
                        <span
                            style={{ margin: '0 5px', color: 'red', cursor: 'pointer', }}
                            onClick={() => handleDelete(room_id)}
                        >
                            Xóa
                        </span>
                    </>
                );
            },
        },
    ];

    useEffect(() => {
        getRoomList(hotel_id, (res) => {
            if (res.status === 200) {
                let key = 1;
                res.room_list.forEach((room) => {
                    room.key = key++;
                });
                setData(res.room_list);
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
        <>
            <Row>
                <Col span={24}>
                    <div><h1>Danh sách phòng</h1></div>
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <Button style={{
                            backgroundColor: '#009cff',
                            color: '#fff',
                            marginBottom: '10px',
                            borderRadius: '5px'
                        }}
                            onClick={() => setOpenCreateModal(true)}
                        >
                            Thêm phòng mới
                        </Button>
                    </div>
                    <Card
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
            <Modal
                title="Cập nhật thông tin phòng"
                open={openModal}
                onOk={() => formRef.current.submit()}
                onCancel={() => setOpenModal(false)}
            >
                <Form ref={formRef} form={form} onFinish={onFinish} labelAlign="left" labelCol={{ span: 5 }}>
                    <Form.Item
                        label='Tên'
                        name='room_name'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập tên phòng'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Loại phòng'
                        name='type'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Select>
                            <Select.Option value='0' key='0'>Phòng đơn kín</Select.Option>
                            <Select.Option value='1' key='1'>Phòng đôi kín</Select.Option>
                            <Select.Option value='2' key='2'>Phòng đơn có ban công</Select.Option>
                            <Select.Option value='3' key='3'>Phòng đôi có ban công</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Giá'
                        name='price'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập giá phòng'
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Thêm phòng"
                open={openCreateModal}
                onOk={() => formCreateRef.current.submit()}
                onCancel={() => setOpenCreateModal(false)}
            >
                <Form ref={formCreateRef} form={CreateForm} onFinish={create} labelAlign="left" labelCol={{ span: 5 }}>
                    <Form.Item
                        label='Tên'
                        name='room_name'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập tên phòng'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Loại phòng'
                        name='type'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Select>
                            <Select.Option value='0' key='0'>Phòng đơn kín</Select.Option>
                            <Select.Option value='1' key='1'>Phòng đôi kín</Select.Option>
                            <Select.Option value='2' key='2'>Phòng đơn có ban công</Select.Option>
                            <Select.Option value='3' key='3'>Phòng đôi có ban công</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label='Giá'
                        name='price'
                        colon={false}
                        rules={[
                            {
                                required: true,
                                message: 'Thông tin này là bắt buộc'
                            }
                        ]}
                    >
                        <Input
                            placeholder='Nhập giá phòng'
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default RoomList;