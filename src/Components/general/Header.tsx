import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { Row, Col, Switch, Button, Layout } from "antd";
import { logout, selectIsAuthenticated } from "../../redux/auth";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeProvider";

export default function Header() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((a: any) => a.auth.user);
  const { changeTheme } = useContext(ThemeContext);
  return (
    <Layout.Header>
      <Row>
        <Col lg={4}>
          <b id="header-title">Movies app by nasir</b>
        </Col>
        <Col offset={15} lg={1}>
          <Switch checkedChildren="light" unCheckedChildren="dark" onChange={() => changeTheme()} defaultChecked />
        </Col>
        <Col lg={4}>
          {isAuthenticated ? (
            <Row>
              <Col lg={18}>
                Welcome , {user.fullname}
                <Button style={{ marginLeft: 5 }} icon={<LogoutOutlined />} onClick={() => dispatch(logout())}>
                  Sign out
                </Button>
              </Col>
            </Row>
          ) : (
            <>
              <Button onClick={() => navigate("/signin/")} icon={<LoginOutlined />}>
                Sign In
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Layout.Header>
  );
}
