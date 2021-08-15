import { Card, Carousel, Pagination, Row, Image } from "antd";
import moment from "moment";
import React from "react";
import { Redirect } from "react-router";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../core/card/product-card";
import useProduct from "./hook/useProduct";

const API_URL = process.env.API_URL || "http://localhost:8080"
function Home(props) {

  const { setModal } = props;
  const { id } = useParams();

  const {
    title,
    redirect,
    products,
    total,
    pageIndex,
    pageSize,
    coupons,
    topRate, top,
    onChangePageIndex
  } = useProduct(props);

  const contentStyle = {
    height: '30px',
    color: '#fff',
    lineHeight: '30px',
    textAlign: 'center',
    background: '#73a7f5',
  };

  if (redirect) {
    return <Redirect to={redirect}></Redirect>
  }

  const productCards = products.map((item) => {
    const { id, images, title, stock, price } = item;
    return <ProductCard id={id} image={images.main} title={title} stock={stock} price={price} setModal={setModal} ></ProductCard>
  })

  return (
    <>
      {
        id ?
        <Card title={`Top 3 sản phẩm được đánh giá cáo nhất của danh mục ${title}`}>
          <Row>
            {
              topRate.map((item) => {
                const { id, images, title, stock, price, avg_rating: rating } = item;
                return <ProductCard id={id} image={images.main} title={title} stock={stock} price={price} setModal={setModal} rating={+rating} ></ProductCard>
              })
            }
          </Row>
        </Card>
        :
        <></>
      }
      {
        coupons.length > 0 ? 
        (
          <Card title="Ưu đãi">
            <Carousel afterChange={() => {}}>
              {
                coupons.map((coupon) => {
                  const { id, title, banner, effect_at, expiry_at } = coupon;
                  return (
                    <div>
                      <img src={`${API_URL}/${banner}`} style={{ height: 250, width: 350,  margin: "auto" }}></img>
                      <div style={contentStyle}>
                        <b><Link style={{ color: "black" }} to={`/coupon/${id}`}>{title}</Link></b> ({moment(effect_at).format("DD/MM/YYYY")} - {moment(expiry_at).format("DD/MM/YYYY")})
                      </div>
                      <div style={contentStyle}></div>
                    </div>
                  )
                })
              }
            </Carousel>
          </Card>
        ) : <></>
      }
      <Card title={title ? `Sản phẩm của danh mục ${title}` : "Trang chủ"} >
        <div>
          <Row>
            {productCards}
          </Row>
          <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
        </div>
      </Card>
    </>
  )
}

export default Home;