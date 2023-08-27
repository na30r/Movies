import React, { useContext, useState } from "react";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Switch } from "antd";
import SideNav from "./SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const { Content, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />

        <SideNav></SideNav>
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
          {/* </div> */}
        </Content>
        <Footer />
      </Layout>
    </>
  );
};

export default DashboardLayout;
