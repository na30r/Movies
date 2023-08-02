import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Col, Layout, Menu, Row, theme } from "antd";
import SideNav from "./SideNav";
import MovieList from "../Components/Movies/Movies";
import { Route, Routes } from "react-router-dom";
import Profile from "../Components/Movies/Detail";
import Movies from "../Components/Movies/Movies";
import MovieDetail from "../Components/Movies/Detail";
import Detail from "../Components/Movies/Detail";
import ActorDetail from "../Components/Actor/ActorDetail";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <SideNav></SideNav>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          > */}
          {/* Bill is a cat. */}
          <Routes>
            <Route path="/movies/:categoryId" element={<Movies />} />
            <Route path="/movies/detail/:movieId" element={<Detail />} />
            <Route
              path="/movies/Actor/detail/:personName"
              element={<ActorDetail />}
            />
          </Routes>
          {/* </div> */}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Movies ©2023 by Nasir Moghtaderi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
