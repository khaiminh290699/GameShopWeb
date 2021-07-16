import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function PageHeader(props) {
  const { user, setUser } = props;
  const location = useLocation();

  const menuItem = 
    !user ? 
    <>
      <Menu.Item active={location.pathname === "/sign-up"}>
        <Link to="/sign-up">
          Tạo tạo khoản
        </Link>
      </Menu.Item>
      <Menu.Item active={location.pathname === "/sign-in"}>
        <Link to="/sign-in">
          Đăng nhập
        </Link>
      </Menu.Item>
    </>
    :
    <>
      <Menu.Item key="1" onClick={() => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
      }}>
        <Link to="/">
          Đăng xuất
        </Link>
      </Menu.Item>
      <Menu.Item active={location.pathname === "/cart"}>
        <Link to="/cart">
          Vỏ hàng
        </Link>
      </Menu.Item>
    </>
  return (
    <Header style={{ background: "white" }}>
      <div className="logo" />
      <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']} style={{ textAlign: "right"}}>
        {menuItem}
      </Menu>
    </Header>
  )
}

export default PageHeader;