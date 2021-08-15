import { Button, Card, Col, Divider, Rate, Row } from "antd";
import React from "react";
import convertMoney from "../../../ultilities/moneyConvert";
import { Link } from "react-router-dom";
import useProductCard from "./hook/use-product-card"

const API_URL = process.env.API_URL || "http://localhost:8080"

function ProductCard(props) {
  const { id, image, title, stock, price, rating } = props;
  const {
    hover,
    onHover,
    onNotHover,
    onButtonClick
  } = useProductCard(props);
  return (
    <Col span={8}>
      <Card
        style={{ marginTop: 16, borderRadius: "45", margin: "5px" }}
      >
        <img src={`${API_URL}/${image}`} className="img-product-card"></img>
        <Divider></Divider>
        <div style={{height: 50}}>
          <h5>{title}</h5>
        </div>
        {
          typeof rating === "number" ?
          <Rate disabled allowHalf defaultValue={rating} ></Rate>
          :
          <></>
        }
        <Row>
          <Col span={12}>
            <Button type="primary" className="add-cart-product-card"
              onMouseEnter={onHover}
              onMouseLeave={onNotHover}
              onClick={onButtonClick}
            >
              {
                hover ?
                <>
                  Thêm vào vỏ
                </>
                :
                <>
                  {convertMoney(price)}
                </>
              }
            </Button>
          </Col>
          <Col span={12}>
            <Button type="ghost" className="add-cart-product-card">
              <Link to={`/product/${id}`}>
                Xem chi tết
              </Link>
            </Button>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default ProductCard;