import { Card, Row, Form, Select, DatePicker, Input, Table, Image, Button, Space } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useFilterCategoryList from "./hook/filter-category-list";

const API_URL = process.env.API_URL || "http://localhost:8080"

function FilterCategoryList(props) {
  const { title, apply = [], setApply, limit = 2 } = props;
  const { state, action } = useFilterCategoryList(props);

  const columns = [
    { title: "Mã danh mục", dataIndex: "id", key: "id", render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Tên danh mục", dataIndex: "title", key: "title", render: (value) => <b>{value}</b> },
    { title: "Hình ảnh", dataIndex: "banner", key: "banner", render: (value) => <Image src={`${API_URL}/${value}`} height={150} width={150} /> },
    { title: "Áp dụng", render: (value, _, index) => {

      const index_apply = apply.findIndex(item => item.id === value.id)
      if (index_apply != -1) {
        return <Button type="default" onClick={() => {
          apply.splice(index_apply, 1)
          setApply(apply)
        }}>
          Huỷ áp dụng
        </Button>
      }

      return <Button type="primary" onClick={() => {
        apply.push({
          id: value.id,
          title: value.title
        })
        setApply(apply)
      }}>
        Áp dụng
      </Button>
    }}
  ]

  return (
    <Card title={title}>
      <Form
        layout="vertical"
      >
        <Form.Item label="Tên danh mục">
          <input className="ant-input" onChange={action.onTitleChange}></input>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={state.categories} pagination={{ 
          pageSize: limit,
          current: state.page,
          total: state.total,
          onChange: (current) => action.onPageChange(current),
        }}></Table>
    </Card>
  )
}

export default FilterCategoryList;