import { Button, Card, DatePicker, Form, InputNumber, Select, Checkbox } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseApi from "../../../ultilities/axios";
import EditorInput from "../../core/input/editor-input";
import UploadInput from "../../core/input/upload-input";
import FilterCategoryList from "../category/filter-category-list";
import FilterCategory from "../filter/filter-category";
import FilterProduct from "../filter/filter-product";
import FilterProductList from "../product/filter-product-list";
import useCouponCreate from "./hook/coupon-create";

function CouponCreate(props) {
  const { setModal } = props;
  const params = useParams();
  const { id } = params;
  let [state, setState] = useState({
    code: null,
    title: null, 
    discount: null, 
    max_discount: null, 
    currency: 1, 
    amount: null, 
    min_total_price: null, 
    effect_at: moment(), 
    expiry_at: moment(), 
    banner: null, 
    description: null,
    apply: {
      is_all: false, 
      except_product: [], 
      apply_product: [], 
      except_category: [],
      apply_category: []
    }
  })
  const setApply = (apply) => {
    state = { ...state, apply }
    setState(state)
  }
  useEffect(() => {
    if(id) {
      baseApi.get(`/coupon/${id}`)
      .then(({data}) => {
        state = { ...state, ...data.coupon };
        setState(state)
      })
    }
  }, [])
  return (
    <Card title="Tạo ưu đãi">
      <Form layout="vertical">
        <Form.Item label="Mã nhập">
          <input className="ant-input" value={state.code} onChange={(event) => {
            const { value } = event.target;
            state = { ...state, code: value };
            setState(state)
          } }></input>
        </Form.Item>
        <Form.Item label="Tên ưu đãi">
          <input className="ant-input" value={state.title} onChange={(event) => {
            const { value } = event.target;
            state = { ...state, title: value };
            setState(state)
          } }></input>
        </Form.Item>
      </Form>
      <Form layout="vertical" style={{marginBottom: 20}}>
        <Form.Item label="Số lượng">
          <InputNumber
              style={{ width: "100%" }}
              size="large" defaultValue={state.amount} value={state.amount}
              onChange={(value) => {
                state = { ...state, amount: value }
                setState(state)
              }}
          />
        </Form.Item>
      </Form>
      <Form layout="inline" style={{marginBottom: 20}}>
        <Form.Item label="Giảm" style={{width: "50%"}}>
          <InputNumber
              size="large" style={{ width: 250, marginLeft: 55 }} defaultValue={state.discount} value={state.discount} formatter={value => {
                if (state.currency === 1) {
                  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                return `${value} %`
              }} parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                state = { ...state, discount: value }
                setState(state)
              }}
          />
        </Form.Item>
        <Form.Item label="Đơn vị">
          <Select defaultValue={state.currency} style={{ width: 250, marginLeft: 15  }} size="large"
            onChange={(value) => {
              state = { ...state, currency: value }
              setState(state)
            }}
          >
            <Select.Option key={1} value={1}>Tiền</Select.Option>
            <Select.Option key={2} value={2}>Phầm trăm</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Form layout="vertical">
        <Form.Item label="Giá tối thiểu">
          <InputNumber
              size="large" style={{ width: "100%" }} defaultValue={state.min_total_price} value={state.min_total_price} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                state = { ...state, min_total_price: value}
                setState(state)
              }}
          />
        </Form.Item>
        <Form.Item label="Giảm tối đa">
          <InputNumber
              size="large" style={{ width: "100%" }} defaultValue={state.max_discount} value={state.max_discount} formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={value => value.replace(/\$\s?|(,*)/g, '')}
              onChange={(value) => {
                state = { ...state, max_discount: value}
                setState(state)
              }}
          />
        </Form.Item>
      </Form>
      <Form layout="inline" style={{marginBottom: 20}}>
        <Form.Item label="Ngày hiệu lực" style={{width: "50%"}}>
          <DatePicker style={{width: 250}}
            value={moment(state.effect_at)}
            onChange={(value) => {
              state = { ...state, effect_at: moment(value).startOf("date")}
              setState(state)
            }}
          ></DatePicker>
        </Form.Item>
        <Form.Item label="Ngày hết">
          <DatePicker style={{width: 250}}
            value={moment(state.expiry_at)}
            onChange={(value) => {
              state = { ...state, expiry_at: moment(value).endOf("date")}
              setState(state)
            }}
          ></DatePicker>        
        </Form.Item>
      </Form>
      <UploadInput title="Upload ảnh thêm" multiple={false} file={state.banner ? [state.banner] : []} addFile={(banner) => {
        state = { ...state, banner };
        setState(state)
      }} removeFile={() => {
        state = { ...state, banner: null };
        setState(state)
      }} ></UploadInput>
      <EditorInput title="Mô tả" content={state.description} setContent={(description) => {
        state = { ...state, description }
        setState(state)
      }} ></EditorInput>
      <Checkbox onChange={(event) =>{
        const { checked } = event.target;
        let { apply } = state;
        apply = { ...apply, is_all: checked, apply_category: [], apply_product: [] };
        state = { ...state, apply}
        setState(state)
      }}>Áp dụng cho tất cả</Checkbox>
      <FilterProduct apply={state.apply} setApply={setApply}></FilterProduct>
      <FilterCategory apply={state.apply} setApply={setApply}></FilterCategory>
      <Button type="primary"
        onClick={() => {
          const { is_all, except_category, except_product, apply_category, apply_product } = state.apply;
          const { code, title, discount,  max_discount, currency , amount, min_total_price, effect_at, expiry_at, banner, description } = state;
          if (expiry_at < effect_at) {
            setModal(<p>Ngày hiệu lực và ngày hết hạn không hợp lệ</p>)
            return;
          }
          if (!code || !title || !discount || ![1,2].includes(currency) || !amount ) {
            setModal(<p>Vui lòng nhập đầy đủ thông tin</p>)
            return;
          }
          const params = {
            code, title, discount,  max_discount, currency, amount, min_total_price, effect_at, expiry_at, banner, description,
            is_all, except_category, except_product, apply_category, apply_product
          }
          let promise;
          if (id) {
            params.id = id;
            promise = baseApi.put("/coupon/update", params);
          } else {
            promise = baseApi.post("/coupon/create", params);
          }
          promise.then(({status, message, error, data}) => {
            if (status != 200) {
              if (status === 500) {
                setModal(<p>{ error }</p>)
                return 
              }
              setModal(<p>{ message }</p>)
              return 
            }
            setModal(<p>Đã {id ? "thêm mới" : "cập nhật"} thành công</p>)
            return 
          })
        }}
      >
        {
          id ? "Thêm mới" : "Cập nhật"
        }
      </Button>
    </Card>
  )
}

export default CouponCreate;