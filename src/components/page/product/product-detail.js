import { Button, Card, Col, InputNumber, Row } from "antd";
import React from "react";
import { Redirect } from "react-router";
import convertMoney from "../../../ultilities/moneyConvert";
import ImageSlider from "../../core/images/images-slider";
import ProductSkeleton from "../../core/loading/product-skeleton";
import useAddCart from "./hook/add-cart";
import useProductDetail from "./hook/product-detail";

function ProductInfo(props) {
  const { label, value } = props;
  return (
    <div>
      <label>{label} : </label>
      <span> {value}</span>
    </div>
  )
}

function ProductDetail(props) {
  const { redirect, loading, product, amountRef } = useProductDetail(props);
  const { onAddToCart } = useAddCart(props);
  if (redirect) {
    return <Redirect to={redirect} ></Redirect>
  }
  const productDetail = product ?
    <div>
      <Row>
        <Col xs={24} xl={10}  style={{textAlign: "center"}}>
          <ImageSlider files={[product.images.main, ...product.images.files ]} ></ImageSlider>
        </Col>
        <Col xs={24} xl={14}>
          <div style={{ marginLeft: "10px" }}>
            <div>
              <h4>
                <label>Thông tin sản phẩm</label>
              </h4>
            </div>
            <ProductInfo label="Tên sản phẩm" value={product.title} />
            <ProductInfo label="Danh mục" value={product.Category.title} />
            <ProductInfo label="Giá sản phẩm" value={convertMoney(product.price)} />
            {
              product.Properties.map((item) => {
                const { id, label, value } = item;
                return <ProductInfo key={id} label={label} value={value} />
              })
            }
            <div>
              <label>Thêm vào giỏ hàng : </label>
              <InputNumber min={1} max={product.stock} defaultValue={1} ref={amountRef} ></InputNumber>
              <span style={{ color: "gray" }} > số lượng tồn kho hiện tại {product.stock} sản phẩm</span>
            </div>
            <br/>
            <div>
              <Button type="primary" onClick={() => onAddToCart(product.id, +amountRef.current.ariaValueNow, product.stock)} >Thêm vào giỏ hàng</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Card className="description" title="Mô Tả" >
        <td dangerouslySetInnerHTML={{__html: product.description}} />
      </Card>
    </div>
    :
    <></>
  return (
    <Card title="Chi tiết sản phẩm">
      {
        loading && !product ?
        <ProductSkeleton></ProductSkeleton>
        :
        productDetail
      }
    </Card>
  )
}

export default ProductDetail;