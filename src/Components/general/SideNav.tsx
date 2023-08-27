import React from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import useGenre from "../../Hooks/useGenre";
import { Genre } from "../../Models/Genre";
import { Link, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideNav: React.FC = () => {
  const { data, isLoading, error } = useGenre();
  if (isLoading) {
    return <></>;
  }

  function getItems() {
    return [
      getItem(
        "Categories",
        "sub1",
        <MailOutlined />,
        data?.genres.map((a: Genre) => getItem(<Link to={`/movies/${a.id}`}>{a.name}</Link>, a.id))
      ),
      getItem("Profile", "sub2", <MailOutlined />, [getItem(<Link to={`/profile`}>Profile</Link>, "")]),
    ];
  }

  return <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" items={getItems()} theme="dark" />;
};

export default SideNav;
