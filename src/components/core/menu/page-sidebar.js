import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import baseApi from "../../../ultilities/axios"
function PageSidebar(props) {
  const { user } = props;
  const [categories, setCategories] = useState([])

  useEffect(() => {
    baseApi.post("/category/list", {
      select: ["id", "title"],
      limit: 100
    }).then((res) => {
      const { status, data } = res;
      if (status != 200) {

      }
      setCategories(data.rows);
    })
  }, [])
  
  return (
    <Sider collapsible>
      <Menu theme="dark" defaultSelectedKeys={['1']}  mode="inline">
        <Menu.Item key="1">
          <Link to="/">
            Trang chủ
          </Link>
        </Menu.Item>
        <Menu.SubMenu title="Danh mục">
          {
            categories.map((item) => {
              const { id, title } = item;
              return (
                <Menu.Item>
                  <Link to={`/category/${id}`}>
                    {title}
                  </Link>
                </Menu.Item>
              )
            })
          }
        </Menu.SubMenu>
        {
          user ?
            <Menu.SubMenu title="Cá nhân">
              <Menu.Item>
                <Link to="/update-profile">
                  Sửa đổi thông tin
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/order">
                  Đơn hàng
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            :
            <></>
        }
        {
          user && user.permission > 255 ?
            <Menu.SubMenu title="Quản lý">
              <Menu.Item>
                <Link to="/admin/statistic">
                  Thông kê
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/admin/category">
                  Danh mục
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/admin/product">
                  Sản phẩm
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/admin/order">
                  Đơn hàng
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
            :
            <></>
        }
      </Menu>
    </Sider>
  )
}

export default PageSidebar;