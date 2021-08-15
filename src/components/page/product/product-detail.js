import { Button, Card, Col, InputNumber, Rate, Row } from "antd";
import React from "react";
import { Redirect } from "react-router";
import convertMoney from "../../../ultilities/moneyConvert";
import ImageSlider from "../../core/images/images-slider";
import ProductSkeleton from "../../core/loading/product-skeleton";
import Comments from "../comment/comments";
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
  const { redirect, loading, product, amountRef, rating, onRateChange } = useProductDetail(props);
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
            <ProductInfo label={"Đánh giá"} value={
              <>
                <Rate disabled allowHalf defaultValue={+product.rating.avg_rating} />    
                <span style={{ marginLeft: 10, color: "gray" }} >{product.rating.total_rating} người đã đánh giá</span>
              </>
            } />
            <div>
              <label>Thêm vào giỏ hàng : </label>
              <InputNumber min={1} max={product.stock} defaultValue={1} ref={amountRef} ></InputNumber>
              <span style={{ color: "gray" }} > số lượng tồn kho hiện tại {product.stock} sản phẩm</span>
            </div>
            <div>
              {
                rating.not_rated ?
                <>Bạn chưa đánh giá, hãy dánh giá </>
                :
                <>Bạn đã dánh giá</>
              } <Rate defaultValue={rating.rating} value={rating.rating} 
                onChange={onRateChange}
              />  
            </div>
            <br/>
            <div>
              <Button type="primary" onClick={() => onAddToCart(product.id, +amountRef.current.ariaValueNow, product.stock)} >Thêm vào giỏ hàng</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Card title="Mô Tả" >
        <td dangerouslySetInnerHTML={{__html: product.description}} />
      </Card>
      <Comments {...props} ></Comments>
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