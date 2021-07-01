import { Button, Card, Col, Divider, Form, Image, Input, InputNumber, Row, Table, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useCart from "./hook/use-cart";

const API_URL = process.env.API_URL || "http://localhost:8080"
const { Paragraph } = Typography;

function Cart(props) {

  const { setModal } = props;

  const { 
    ordered,
    cart, 
    phoneRef,
    addressRef,
    onChangeAmountInCart,
    onCreateOrder,
    onRejectOrder
  } = useCart(props);

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Hình ảnh", dataIndex: "image", key: "image", render: (value) => <Image src={`${API_URL}/${value}`} height={150} width={150} /> },
    { title: "Số lượng", dataIndex: "amount", key: "amount", render: (value, item, index) => <InputNumber onChange={(value) => onChangeAmountInCart(item.id, value, item.stock, index)} min={0} max={item.stock} defaultValue={value} /> },
    { title: "Tổng tiền", dataIndex: "price", key: "price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Số lượng tồn", dataIndex: "stock", key: "stock", render: (value) => <p>{value} sản phẩm</p> }
  ];

  const totalPrice = cart.reduce((totalPrice, item) => {
    const { price } = item;
    totalPrice += price;
    return totalPrice;
  }, 0)

  return (
    <Card title="Giỏ hàng">
      <Row>
        <Col span={14}>
          <Table columns={columns} dataSource={cart} pagination={true}></Table>
          <Divider></Divider>
          <div style={{ textAlign: "right" }}>
            <label>
              Tống tiền : 
            </label>
            <span>
              {` ${convertMoney(totalPrice)}`}
            </span>
          </div>
        </Col>
        <Col span={10} style={{ paddingLeft: 10 }}>
          <Card title="Thông tin đơn hàng" >
            <Paragraph>
              <Form layout="vertical">
                <Form.Item label="Địa chỉ giao hàng :">
                  <Input ref={addressRef}></Input>
                </Form.Item>
                <Form.Item label="Số điện thoại liên lạc :">
                  <Input ref={phoneRef}></Input>
                </Form.Item>
                <Form.Item>
                  {
                    ordered ? 
                    <Button danger onClick={onRejectOrder}>Huỷ đơn hàng</Button>
                    :
                    <Button type="primary" onClick={onCreateOrder}>Tạo đơn hàng</Button>
                  }
                </Form.Item>
              </Form>
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}

export default Cart;