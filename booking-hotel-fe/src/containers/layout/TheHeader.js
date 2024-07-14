import React, { useState } from "react";
import { Dropdown, Menu } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './layout.css';

const TheHeader = () => {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [showSubMenu, setShowSubMenu] = useState(false);

    let menuItems = [];
    //Admin
    if (user.role === 0) {
        menuItems = [{
            key: 1,
            label: 'Quản lý người dùng',
            onClick: () => { navigate("/user"); }
        }];
    }
    //HotelManager
    if (user.role === 1) {
        menuItems = [
            {
                key: 1,
                label: 'Đơn đặt phòng',
                onClick: () => { navigate("/booking-hotel"); }
            },
            {
                key: 2,
                label: 'Khách sạn',
                onClick: () => { navigate("/hotel"); }
            }
        ];
    }
    //Customer
    if (user.role === 2) {
        menuItems = [
            {
                key: 1,
                label: 'Tìm khách sạn',
                onClick: () => { navigate("/search"); }
            },
            {
                key: 2,
                label: 'Đơn đặt của tôi',
                onClick: () => { navigate("/booking"); }
            }
        ];
    }

    const handleLogout = () => {
        localStorage.removeItem('persist:root');
        navigate('/login');
        window.location.reload();
    }

    const handleMenuClick = (path) => {
        if (path === "/profile") { navigate("/profile"); setShowSubMenu(false); }
        if (path === "/logout") handleLogout();
    };

    const subMenu = (
        <Menu onClick={({ key }) => handleMenuClick(key)} className="menu">
            <Menu.Item key="/profile" className="menu-item">
                <UserOutlined className="menu-item-icon" />
                <span> Thông tin tài khoản</span>
            </Menu.Item>
            <Menu.Item key="/logout" className="menu-item">
                <LoginOutlined className="menu-item-icon" />
                <span> Đăng xuất</span>
            </Menu.Item>
        </Menu>
    )

    return (
        <div className="header">
            <div className="logo" onClick={() => { navigate('/'); window.location.reload(); }}>Booking</div>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={menuItems}
                style={{
                    flex: 1,
                    minWidth: 0,
                }}
            />
            <div className="avatar" onClick={() => setShowSubMenu(!showSubMenu)}>
                {`${user.username}`}
                <Dropdown overlay={subMenu} placement="bottomLeft" open={showSubMenu}>
                    <UserOutlined style={{ fontSize: '24px', margin: '0 5px' }} />
                </Dropdown>
            </div>
        </div>
    )
}

export default TheHeader;