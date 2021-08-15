import { Button, Card, DatePicker, Form, InputNumber, Select, Table, Image, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import baseApi from "../../../ultilities/axios";
import convertMoney from "../../../ultilities/moneyConvert";

const API_URL = process.env.API_URL || "http://localhost:8080"
function FilterProduct(props) {
  let { 
    apply = {},
    setApply
  } = props;
  const {
    is_all = false, 
    except_product = [], 
    apply_product = [], 
    except_category = [],
  } = apply
  let [state, setState] = useState({
    products: [],
    title: null,
    less: null,
    greater: null,
    createAt: null,
    categoryId: null,
    page: 0,
    limit: 2,
    total: 0,
    categories: []
  });

  useEffect(() => {
    const wheres = {};
    if (state.title) {
      wheres.title = { like: `%${state.title}%`}
    }
    if (state.less != null && state.less != undefined) {
      wheres.price = { ...wheres.price, lte: state.less }
    }
    if (state.greater != null && state.greater != undefined) {
      wheres.price = { ...wheres.price, gte: state.greater }
    }
    if (state.createAt) {
      const from = moment(new Date(state.createAt)).startOf("date");
      const to = moment(new Date(state.createAt)).endOf("date");
      wheres.createdAt = { between: [from, to] };
    }
    if (state.categoryId) {
      wheres.category_id = { eq: state.categoryId };
    }
    baseApi.post("/product/list", {
      wheres,
      page: state.page,
      limit: state.limit,
      order: [["createdAt", "DESC"]],
      select: ["id", "title", "price", "stock", "images", "category_id"]
    })
    .then(({ data } )=> {
      const { rows: products, count: total } = data;
      state = { ...state, products, total }
      setState(state);
    })
  }, [
    state.title,
    state.less,
    state.greater,
    state.createAt,
    state.categoryId,
    state.page 
  ])
  useEffect(() => {
    baseApi.post("/category/list", {
      wheres: {},
      page: undefined,
      limit: undefined,
      order: [["createdAt", "DESC"]],
      select: ["id", "title"]
    })
    .then(({ data } )=> {
      const { rows: categories } = data;
      state = { ...state, categories }
      setState(state);
    })
  }, []);
  const columns = [
    { title: "Mã Sẩn phẩm", dataIndex: "id", key: "id", width: '10%', render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", width: '30%',render: (value) => <b>{value}</b> },
    { title: "Hình", dataIndex: "images", key: "images", width: '10%',render: (value) => <Image src={`${API_URL}/${value.main}`} height={100} width={100}></Image> },
    { title: "Giá", dataIndex: "price", key: "price", width: '10%',render: (value) => <b>{convertMoney(value)}</b> },
    { title: "Tồn", dataIndex: "stock", key: "stock",  width: '10%',render: (value) => <b>{value}</b> },
    { title: "Áp dụng",  width: '30%',render: (item) => {
      if (except_product.includes(item.id) || except_category.includes(item.category_id)) {
        return (
          <>
            <Button type="default" size="small" onClick={() => { 
              let index = except_product.indexOf(item.id);
              if (index != -1) {
                except_product.splice(index, 1);
                apply = { ...apply, except_product }
                setApply(apply)
                return;
              }
              index = except_category.indexOf(item.category_id);
              if (index != -1) {
                except_category.splice(index, 1);
                apply = { ...apply, except_category }
                setApply(apply)
                return;
              }
            }}>Huỷ không áp dụng</Button>
          </>
        )
      }
      if (is_all) {
        return( 
          <>
            <Button type="default" disabled size="small">Đã áp dụng</Button>
            <Button type="danger" style={{marginLeft: 5}} size="small" onClick={() => {
              except_product.push(item.id);
              apply = { ...apply, except_product }
              setApply(apply);
            }}>Không áp dụng</Button>
          </>
        )
      }
      if (apply_product.includes(item.id)) {
        return (
          <>
            <Button type="default" disabled size="small">Đã áp dụng</Button>
            <Button type="danger" style={{marginLeft: 5}} size="small" onClick={() => {
              let index = apply_product.indexOf(item.id);
              if (index != -1) {
                apply_product.splice(index, 1);
                apply = { ...apply, apply_product }
                setApply(apply);
              }
            }}>Huỷ áp dụng</Button>
          </>
        )
      }
      return (
        <>
          <Button type="primary" size="small" onClick={() => {
            apply_product.push(item.id);
            apply = { ...apply, apply_product }
            setApply(apply);
          }}>Áp dụng</Button>
          <Button type="danger" style={{marginLeft: 5}} size="small" onClick={() => {
           except_product.push(item.id);
           apply = { ...apply, except_product }
           setApply(apply);
          }}>Không áp dụng</Button>
        </>
      )
    }}
  ]
  return (
    <Card title="Danh sách sản phẩm">
      <Form layout="vertical" >
        <Form.Item label="Tên sản phẩm">
          <input className="ant-input" onChange={(event) => { 
            const { value } = event.target; 
            state = { ...state, title: value };
            setState(state);
          }}></input>
        </Form.Item>
      </Form>
      <Form layout="inline" style={{ marginBottom: 20 }} >
        <Form.Item label="Giá lớn hơn">
          <InputNumber
              size="large" defaultValue={null} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                state = { ...state, greater: value };
                setState(state)
              }}
          />
        </Form.Item>
        <Form.Item label="Giá bé hơn">
          <InputNumber
              size="large" defaultValue={null} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                state = { ...state, less: value };
                setState(state)
              }}
          />
        </Form.Item>
      </Form>
      <Form.Item label="Lọc theo danh mục:">
          <Select style={{ width: "200px" }} placeholder="Tất cả"
            onChange={(value) => {
              if (value === -1) { value = null };
              state = { ...state, categoryId: value };
              setState(state)
            }}
          >
            <Select.Option key={-1} value={-1} >
              Tất cả
            </Select.Option>
            {
              state.categories.map((category) => (
                <Select.Option key={category.id} value={category.id} >
                  { category.title }
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
      <Form>
        <Form.Item label="Lọc theo ngày tạo:">
          <DatePicker style={{ marginLeft: 6, width: "200px" }}
            onChange={(value) => {
              state = { ...state, createAt: value };
              setState(state)
            }}
          ></DatePicker>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={state.products} pagination={{ 
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

export default FilterProduct;