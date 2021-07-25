import { Button, Card, Image, Pagination, Space, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import useListCategory from "./hook/list-category";


const API_URL = process.env.API_URL || "http://localhost:8080"

function ListCategory(props) {

  const {
    categories,
    total,
    pageIndex,
    pageSize,
    onChangePageIndex,
    onDelete
  } = useListCategory(props);


  const columns = [
    { title: "Tên danh mục", dataIndex: "title", key: "title", render: (value, item) => <b><Link to={`/category/${item.id}`} >{value}</Link></b> },
    { title: "Hình ảnh", dataIndex: "banner", key: "banner", render: (value) => <Image src={`${API_URL}/${value}`} height={150} width={150} /> },
    { title: "Thực thi", render: (value, item, index) => {
      return <Space>
        <Button style={{ border: "2px yellow solid", background: "yellow" }}>
          <Link to={`/admin/category/update/${value.id}`}>
            Cập nhật
          </Link>
        </Button>
        <Button danger onClick={() => onDelete(value.id, index)} >Xoá</Button>
      </Space>
    } }
  ];

  return (
    <Card title="Quản lý danh mục">
      <Button style={{ background: "yellow" }} >
        <Link style={{ color: "black" }} to="/admin/category/create">
          <b>Thêm danh mục mới</b>
        </Link>
      </Button>
      <Table columns={columns} dataSource={categories} pagination={false} ></Table>
      <div style={{textAlign: "center"}}>
        <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
      </div>
    </Card>
  )
}

export default ListCategory;