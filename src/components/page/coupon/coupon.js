import { Card, Col, Row, Image, Form, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import baseApi from "../../../ultilities/axios";
import convertMoney from "../../../ultilities/moneyConvert";

const API_URL = process.env.API_URL || "http://localhost:8080"

function Coupon() {
  const { id } = useParams();
  let [state, setState] = useState({
    code: null,
    title: null,
    description: null,
    amount: 0,
    discount: 0,
    currency: 1,
    banner: null,
    is_all: false,
    except_category: [],
    except_product: [],
    apply_category: [],
    apply_product: [],
    redirect: null
  })
  useEffect(() => {
    baseApi.get(`/coupon/${id}`)
    .then(({ status, data }) => {
      if (status != 200) {
        state = { ...state, redirect: "/not-found" }
      } else {
        const { 
          coupon,
          is_all,
          except_category,
          except_product,
          apply_category,
          apply_product
        } = data;
        state = { ...state, ...coupon, is_all, except_category, except_product, apply_category, apply_product };
      }
      setState(state);
      return;
    })
  }, [id])
  if (state.redirect) return <Redirect to={state.redirect}></Redirect>
  return (
    <Card title={<p style={{fontFamily: "sans-serif"}} >Mã ưu đãi <b>{ state.code }</b></p>}>
      <Row>
        <Col xs={24} xl={10}  style={{textAlign: "center"}}>
          <Image src={`${API_URL}/${state.banner}`}></Image>
        </Col>
        <Col xs={24} xl={14}>
          <div style={{ marginLeft: "10px" }}>
            <div>
              <h4 style={{fontFamily: "sans-serif"}}>
                <label>Thông tin ưu đãi</label>
              </h4>
            </div>
            <Form layout="vertical">
              <Form.Item label="Tên ưu đãi">
                <input className="ant-input" value={state.title} disabled />
              </Form.Item>
              <Form.Item label="Tình trạng">
                <input className="ant-input" value={new Date() <= new Date(state.effect_at) ? "Chưa đến thời gian hiệu lực" : ( new Date() >= new Date(state.expiry_at) ? "Hết liệu lục" : ( state.amount <= 0 ? "Hết số ưu đãi" : "Có thể dùng" ) )} disabled />
              </Form.Item>
              <Form.Item label="Số lượng">
                <input className="ant-input" value={state.amount} disabled />
              </Form.Item>
              <Form.Item label="Giảm">
                <input className="ant-input" value={state.currency === 1 ? convertMoney(state.discount) : `${state.discount}%`} disabled />
              </Form.Item>
              <Form.Item label="Giảm tối đa">
                <input className="ant-input" value={convertMoney(state.max_discount)} disabled />
              </Form.Item>
              <Form.Item label="Giá tối thiểu áp dụng">
                <input className="ant-input" value={convertMoney(state.min_total_price)} disabled />
              </Form.Item>
              <Form.Item label="Hiệu lực">
                <input className="ant-input" value={`${moment(state.effect_at).format("DD/MM/YYYY")} -> ${moment(state.expiry_at).format("DD/MM/YYYY")}`} disabled />
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
      <Card title="Mô tả">
        <td dangerouslySetInnerHTML={{__html: state.description}} />
      </Card>
      <Card title="Áp dụng">
        {
          state.is_all ?
          (
            <div>
              <Tag color="blue">Áp dụng cho tất cả sản phẩm</Tag>
            </div>
          )
          :
          (
            <>
            {
              state.apply_category.length > 0 ?
              (
                <div>
                  <label>Áp dụng cho các sản phẩm thuộc các danh mục sau:</label>
                  <div>
                    {
                      state.apply_category.map((cate) => {
                        return <Tag color="blue"><Link to={`/category/${cate.id}`}><b>{cate.title}</b></Link></Tag>
                      })
                    }
                  </div>
                </div>
              )
              :
              (<></>)
            }
            {
              state.apply_product.length > 0 ?
              (
                <div>
                  <label>Áp dụng cho các sản phẩm:</label>
                  <div>
                    {
                      state.apply_product.map((product) => {
                        return <Tag color="blue"><Link to={`/product/${product.id}`}><b>{product.title}</b></Link></Tag>
                      })
                    }
                  </div>
                </div>
              )
              :
              (<></>)
            }
            </>
          )
        }
      </Card>
      {
        state.except_product.length > 0 && state.except_category.length > 0 ?
        <Card title="Không áp dụng">
          {
            state.except_category.length > 0 ?
            (
              <div>
                <label>Không áp dụng cho các sản phẩm thuộc các danh mục sau:</label>
                <div>
                  {
                    state.except_category.map((cate) => {
                      return <Tag color="red"><Link to={`/category/${cate.id}`}><b>{cate.title}</b></Link></Tag>
                    })
                  }
                </div>
              </div>
            )
            :
            (<></>)
          }
          {
            state.except_product.length > 0 ?
            (
              <div>
                <label>Không áp dụng cho các sản phẩm:</label>
                <div>
                  {
                    state.except_product.map((product) => {
                      return <Tag color="red"><Link to={`/product/${product.id}`}><b>{product.title}</b></Link></Tag>
                    })
                  }
                </div>
              </div>
            )
            :
            (<></>)
          }
        </Card>
        :
        <></>
      }
    </Card>
  )
}

export default Coupon;