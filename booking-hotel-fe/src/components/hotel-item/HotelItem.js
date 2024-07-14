import React from "react";
import { useNavigate } from "react-router";
import { Col } from "antd";
import "./hotelitem.css";
import { useSelector } from "react-redux";

const HotelItem = ({ data }) => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  const handleClick = () => {
    if (user.role === 1) navigate(`/hotel/${data.id}`);
    if (user.role === 2) navigate(`hotel/${data.id}`);
  };

  return (
    <Col xs={24} sm={12} lg={8} xl={6}>
      <div className="hotel-item">
        <div className="hotel-img">
          <div className="hotel-favor">
            <img src={data.image} alt={data.name} onClick={handleClick} />
            {/* {icon} */}
          </div>
        </div>
        <div className="hotel-content" onClick={handleClick}>
          <div className="hotel-name">
            <h2>{data.name}</h2>
          </div>
          <div className="hotel-address">
            <h1>{data.address}</h1>
          </div>
          <h3 className="hotel-price">
            {data.min_price +
              " - " +
              data.max_price +
              " VNĐ/ngày"}
            {data.priceType}
          </h3>
        </div>
      </div>
    </Col>
  );
};

export default HotelItem;
