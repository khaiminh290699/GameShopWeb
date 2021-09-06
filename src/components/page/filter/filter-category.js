import { Button, Card, DatePicker, Form, InputNumber, Select, Table, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseApi from "../../../ultilities/axios";

const API_URL = process.env.API_URL || "http://localhost:8080"
function FilterCategory(props) {
  let { 
    apply = {},
    setApply
  } = props;
  const {
    is_all = false, 
    except_category = [], 
    apply_category = []
  } = apply;
  let [state, setState] = useState({
    title: null,
    categories: [],
    page: 0,
    limit: 2,
    total: 0,
  })
  useEffect(() => {
    const wheres = {};
    if (state.title) {
      wheres.title = { like: `%${state.title}%`}
    }
    baseApi.post("/category/list", {
      wheres,
      page: state.page,
      limit: state.limit,
      order: [["createdAt", "DESC"]],
      select: ["id", "title", "banner"]
    })
    .then(({ data } )=> {
      const { rows: categories, count: total } = data;
      state = { ...state, categories, total }
      setState(state);
    })
  }, [state.title, state.page]);
  const columns = [
    { title: "Mã danh mục", dataIndex: "id", key: "id", width: "10%",render: (value, item) => <b><Link to={`/category/${item.id}`} >{value}</Link></b> },
    { title: "Tên danh mục", dataIndex: "title", key: "title", width: "30%",render: (value) => <b>{value}</b> },
    { title: "Hình ảnh", dataIndex: "banner", key: "banner", width: "10%",render: (value) => <Image src={`${API_URL}/${value}`} height={100} width={100} /> },
    { title: "Số lượng sản phẩm", dataIndex: "total_product", key: "total_product", width: "20%",render: (value) => <p>{value}</p> },
    { title: "Áp dụng", width: "30%", render: (item) => {

      if (except_category.includes(item.id)) {
        return <Button type="default" size="small" onClick={() => { 
          let index = except_category.indexOf(item.id);
          if (index != -1) {
            except_category.splice(index, 1);
            apply = { ...apply, except_category }
            setApply(apply)
            return;
          }
        }}>Huỷ không áp dụng</Button>
      }
      if (is_all || apply_category.includes(item.id)) {
        return (
          <>
            <Button type="default" disabled size="small">Đã áp dụng</Button>
            <Button type="danger" style={{marginLeft: 5}} size="small" onClick={() => {
              let index = apply_category.indexOf(item.id);
              if (index != -1) {
                apply_category.splice(index, 1);
                apply = { ...apply, apply_category }
              }
              except_category.push(item.id);
              apply = { ...apply, except_category }
              setApply(apply);
            }}>Huỷ áp dụng</Button>
          </>
        )
      }
      return (
        <>
          <Button type="primary" size="small" onClick={() => {
            apply_category.push(item.id);
            apply = { ...apply, apply_category }
            setApply(apply);
          }}>Áp dụng</Button>
          <Button type="danger" style={{marginLeft: 5}} size="small" onClick={() => {
           except_category.push(item.id);
           apply = { ...apply, except_category }
           setApply(apply);
          }}>Không áp dụng</Button>
        </>
      )
    }}
  ]
  return (
    <Card title="Danh sách danh mục">
      <Form layout="vertical" >
        <Form.Item label="Tên danh mục">
          <input className="ant-input" onChange={(event) => { 
            const { value } = event.target; 
            state = { ...state, title: value };
            setState(state);
          }}></input>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={state.categories} pagination={{ 
          pageSize: state.limit,
          current: state.page + 1,
          total: state.total,
          onChange: (current) => {
            state = { ...state, page: current - 1 };
            setState(state)
          },
        }}></Table>
    </Card>
  )
}

export default FilterCategory;