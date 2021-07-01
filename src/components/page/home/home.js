import { Card, Pagination, Row } from "antd";
import React from "react";
import { Redirect } from "react-router";
import ProductCard from "../../core/card/product-card";
import useProduct from "./hook/useProduct";

function Home(props) {

  const { setModal } = props;

  const {
    title,
    redirect,
    products,
    total,
    pageIndex,
    pageSize,
    onChangePageIndex
  } = useProduct(props);

  if (redirect) {
    return <Redirect to={redirect}></Redirect>
  }

  const productCards = products.map((item) => {
    const { id, images, title, stock, price } = item;
    return <ProductCard id={id} image={images.main} title={title} stock={stock} price={price} setModal={setModal} ></ProductCard>
  })

  return (
    <Card title={title ? `Sản phẩm của danh mục ${title}` : "Trang chủ"} >

      <div style={{textAlign: "center"}}>
        <Row>
          {productCards}
        </Row>
        <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
      </div>
    </Card>
  )
}

export default Home;