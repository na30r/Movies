import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  LoginOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Col, Layout, Menu, Row, theme } from "antd";
import SideNav from "./SideNav";
import MovieList from "../Components/Movies/Movies";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../Components/Profile/Profile";
import Movies from "../Components/Movies/Movies";
import MovieDetail from "../Components/Movies/Detail";
import Detail from "../Components/Movies/Detail";
import ActorDetail from "../Components/Actor/ActorDetail";
import SignIn from "../Components/Profile/SignIn";
import { logout, selectIsAuthenticated } from "../redux/auth";
import { useDispatch, useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const user = useSelector((a: any) => a.auth.user);
  console.log(isAuthenticated, "ia");
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
        <Header
          style={{
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Row>
            <Col lg={4}>
              <b>Movies app by nasir</b>
            </Col>
            <Col offset={15} lg={4}>
              {isAuthenticated ? (
                <Row>
                  <Col lg={18}>
                    Welcome, {user.fullname}
                    <Button
                      style={{ marginLeft: 5 }}
                      icon={<LogoutOutlined />}
                      onClick={() => dispatch(logout())}
                    >
                      Sign out
                    </Button>
                  </Col>
                </Row>
              ) : (
                <Button
                  onClick={() => navigate(`/signin/`)}
                  icon={<LoginOutlined />}
                >
                  Sign In
                </Button>
              )}
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/signIn" element={<SignIn />} />
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
