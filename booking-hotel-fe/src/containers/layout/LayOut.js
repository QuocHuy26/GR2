import React from "react";
import { Dropdown, Menu, Layout } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './layout.css';
import TheContent from "./TheContent";
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

const LayOut = () => {
  const { Footer } = Layout;

  return (
    <div style={{ width: '100vw', height: '100%' }}>
      <TheHeader />
      <div className="content" style={{ height: '89vh', backgroundColor: "white" }}>
        <TheContent />
      </div>
      <TheFooter />
    </div>
  );
}

export default LayOut;