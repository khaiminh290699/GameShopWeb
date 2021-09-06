import { Button, Card, Image, Pagination, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useProduct from "../home/hook/useProduct";
import useListProduct from "./hook/list-product";

import moment from "moment"
import baseApi from "../../../ultilities/axios";
import connectSocket from "../../../ultilities/socket";


const API_URL = process.env.API_URL || "http://localhost:8080"

function ListProduct(props) {

  const {
    products,
    total,
    pageIndex,
    pageSize,
    onChangePageIndex,
    onDeleteProduct
  } = useProduct(props);

  const { onDeletedProductClick } = useListProduct({ ...props, products, onDeleteProduct });

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Danh mục", dataIndex: "Category", key: "Category", render: (value) => <b>{value.title}</b> },
    { title: "Hình ảnh", dataIndex: "images", key: "images", render: (value) => <Image src={`${API_URL}/${value.main}`} height={150} width={150} /> },
    { title: "Tổng tiền", dataIndex: "price", key: "price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Số lượng tồn", dataIndex: "stock", key: "stock", render: (value) => <p>{value} sản phẩm</p> },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt", render: (value) => <p>{moment(value).format("DD/MM/YYYY")}</p> },
    { title: "Thực thi", render: (value) => {
      return <Space>
        <Button style={{ border: "2px yellow solid", background: "yellow" }}>
          <Link to={`/admin/product/update/${value.id}`}>
            Cập nhật
          </Link>
        </Button>
        <Button danger onClick={() => onDeletedProductClick(value.id)} >Xoá</Button>
      </Space>
    } }
  ];

  return (
    <Card title="Quản lý sản phẩm">
      <Button style={{ background: "yellow" }} >
        <Link style={{ color: "black" }} to="/admin/product/create">
          <b>Thêm sản phẩm mới</b>
        </Link>
      </Button>
      <Table columns={columns} dataSource={products} pagination={false} ></Table>
      <div style={{textAlign: "center"}}>
        <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
      </div>
    </Card>
  )
}

export default ListProduct;