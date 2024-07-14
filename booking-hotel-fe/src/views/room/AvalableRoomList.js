import { Card, Col, Modal, notification, Row, Table, Button, Checkbox, DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { createBooking } from "../../services/booking";
import { getRoomList } from "../../services/room";

const AvalableRoomList = ({ hotel_id }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [checkedRooms, setCheckedRooms] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [checkinDate, setCheckinDate] = useState();
    const [checkoutDate, setCheckoutDate] = useState();
    const user = useSelector(state => state.user);
    const { RangePicker } = DatePicker;

    const onStartChange = (date, dateString) => {
        setCheckinDate(dateString);
    }

    const onEndChange = (date, dateString) => {
        setCheckoutDate(dateString);
    }

    const onOk = () => {
        const submitData = {
            user_id: user.id,
            hotel_id: hotel_id,
            bookingRooms: checkedRooms,
            checkinDate: checkinDate,
            checkoutDate: checkoutDate,
            status: 0,
        }
        createBooking(submitData, (res) => {
            if (res.status === 201) {
                notification.success({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
                setOpenModal(false);
            } else {
                notification.error({
                    message: 'Thông báo',
                    description: res.message,
                    placement: `bottomRight`,
                    duration: 1.5,
                });
            }
        })
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
            render: (price) => {
                return (
                    <>
                        {price + ' vnđ/ngày'}
                    </>
                );
            },
        },
        {
            title: "Chọn",
            dataIndex: "room_id",
            render: (room_id) => {
                return (
                    <>
                        <Checkbox onChange={(e) => {
                            if (e.target.checked) {
                                setCheckedRooms([...checkedRooms, room_id]);
                            } else {
                                setCheckedRooms(checkedRooms.filter((id) => id !== room_id));
                            }
                            console.log(checkedRooms);
                        }}>
                        </Checkbox>
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
                    <Button
                        type="primary"
                        disabled={checkedRooms.length === 0}
                        onClick={() => setOpenModal(true)}
                    >
                        Đặt phòng đã chọn
                    </Button>
                    <Card
                        bordered={false}
                    >
                        <Table
                            className="overflow-auto"
                            columns={columns}
                            dataSource={data}
                        />
                    </Card>
                </Col>
            </Row>
            <Modal
                title="Đặt phòng"
                open={openModal}
                onOk={onOk}
                onCancel={() => setOpenModal(false)}
            >
                <div>Chọn ngày bắt đầu <DatePicker onChange={onStartChange} /></div>
                <div style={{ marginTop: '10px' }}>Chọn ngày kết thúc <DatePicker onChange={onEndChange} /></div>
            </Modal>
        </>
    );
}

export default AvalableRoomList;