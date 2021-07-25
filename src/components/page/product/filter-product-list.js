import { Card, Row, Form, Select, DatePicker, Input, Table, Image, Button, Space } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useFilterProductList from "./hook/filter-product-list";

const API_URL = process.env.API_URL || "http://localhost:8080"

function FilterProductList(props) {
  const { title, apply = [] , no_apply = [], setApply, setNoApply, limit = 2 } = props;
  const { state, action } = useFilterProductList(props);

  console.log(state)

  const columns = [
    { title: "Mã Sẩn phẩm", dataIndex: "id", key: "id", render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", render: (value) => <b>{value}</b> },
    { title: "Hình ảnh", dataIndex: "images", key: "images", render: (value) => <Image src={`${API_URL}/${value.main}`} height={150} width={150} /> },
    { title: "Danh mục", dataIndex: "Category", key: "Category", render: (value) => <p>{value.title}</p> },
    { title: "Giá", dataIndex: "price", key: "price", render: (value) => <p>{convertMoney(value)}</p>  },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt", render: (value) => <p>{moment(value).format("DD/MM/YYYY")}</p> },
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

      const index_no_apply = no_apply.findIndex(item => item.id === value.id)
      if (index_no_apply != -1) {
        return <Button type="default" onClick={() => {
          no_apply.splice(index_no_apply, 1)
          setNoApply(no_apply)
        }}>
          Huỷ không áp dụng
        </Button>
      }

      return <Space>
        <Button type="primary" onClick={() => {
          apply.push({
            id: value.id,
            title: value.title
          })
          setApply(apply)
        }}>
          Áp dụng
        </Button>
        <Button danger onClick={() => {
          no_apply.push({
            id: value.id,
            title: value.title
          })
          setNoApply(no_apply)
        }}>
          Không áp dụng
        </Button>
      </Space> 
    }}
  ]

  return (
    <Card title={title}>
      <Form
        layout="vertical"
      >
        <Form.Item label="Tên sản phẩm">
          <input className="ant-input" onChange={action.onTitleChange}></input>
        </Form.Item>
        <Form.Item label="Lọc theo danh mục: ">
          <Select style={{ width: "200px" }} onChange={action.onCategoryChange} placeholder="Tất cả">
            <Select.Option key={-1} value={-1} >
              Tất cả
            </Select.Option>
            {
              state.categories.map((category) => {
                return (
                  <Select.Option key={category.id} value={category.id} >
                    {category.title}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item label="Lọc theo ngày tạo: ">
          <DatePicker onChange={action.onDateFilterChange} ></DatePicker>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={state.products} pagination={{ 
          pageSize: limit,
          current: state.page,
          total: state.total,
          onChange: (current) => action.onPageChange(current),
        }}></Table>
    </Card>
  )
}

export default FilterProductList;