import React, { useContext, useState } from "react";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, Switch } from "antd";
import SideNav from "./SideNav";
import Footer from "./Footer";
import Header from "./Header";
const { Content, Sider } = Layout;

function DashboardLayout({ children }: any) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <SideNav></SideNav>
        </Sider>
        {/* <Header /> */}
        <Content style={{ margin: "0 16px" }}>{children}</Content>
      </Layout>
      <Footer />
    </>
  );
}

export default DashboardLayout;
