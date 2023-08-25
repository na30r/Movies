import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Row, Col, Typography, Form, Input, Switch } from "antd";
import signinbg from "../../../assets/images/img-signin.jpg";
import { DribbbleOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../redux/auth";

function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    console.log(values);
    dispatch(login({ email: values.email, fullname: values.fullname }));
    navigate(`/movies`);
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
              <Title className="mb-15">Sign In</Title>
              <Title className="font-regular text-muted" level={5}>
                Enter your email and password to sign in
              </Title>
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="row-col">
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}>
                  <Input placeholder="Test@gmail.com" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}>
                  <Input type="password" placeholder="1234567" />
                </Form.Item>
                <Form.Item
                  className="username"
                  label="Full Name"
                  name="fullname"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Full Name!",
                    },
                  ]}>
                  <Input placeholder="test test" />
                </Form.Item>

                <Form.Item name="remember" className="aligin-center" valuePropName="checked">
                  <Switch defaultChecked onChange={onChange} />
                  Remember me
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                    SIGN IN
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Don't have an account?{" "}
                  <Link to="/sign-up" className="text-dark font-bold">
                    Sign Up
                  </Link>
                </p>
              </Form>
            </Col>
            <Col className="sign-img" style={{ padding: 12 }} xs={{ span: 24 }} lg={{ span: 12 }} md={{ span: 12 }}>
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>Company</Menu.Item>
            <Menu.Item>About Us</Menu.Item>
            <Menu.Item>Teams</Menu.Item>
            <Menu.Item>Products</Menu.Item>
            <Menu.Item>Blogs</Menu.Item>
            <Menu.Item>Pricing</Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <Link to="#">{<DribbbleOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<TwitterOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<InstagramOutlined />}</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="#">{<GithubOutlined />}</Link>
            </Menu.Item>
          </Menu>
        </Footer>
      </Layout>
    </>
  );
}
