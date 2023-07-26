import React from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import useGenre from "../Hooks/useGenre";
import { Genre } from "../Models/Genre";
import useMovie from "../Hooks/useMovie";

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
  function getItems() {
    return [
      getItem(
        "Categories",
        "sub1",
        <MailOutlined />,
        data?.map((a: Genre) => getItem(a.name, a.id))
      ),
    ];
  }
  const onClick: MenuProps["onClick"] = (e) => {
    // var x = useMovie(e.key)
  };

  return (
    <Menu
      onClick={onClick}
      // style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={getItems()}
      theme="dark"
    />
  );
};

export default SideNav;
