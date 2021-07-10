import { Button, Card, Divider, Table, Image } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import getStatus from "../../../ultilities/getStatus";
import convertMoney from "../../../ultilities/moneyConvert";
import Info from "../../core/info/info";
import ProductSkeleton from "../../core/loading/product-skeleton";
import useOrderDetail from "./hook/order-detail";

const API_URL = process.env.API_URL || "http://localhost:8080"

function OrderDetail(props) {

  const {
    order,
    loading,
    onUpdateStatus
  } = useOrderDetail(props);

  if (loading && !order) {
    return <ProductSkeleton></ProductSkeleton>
  }

  const columns = [
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", render: (value, item) => <b><Link to={`/product/${item.id}`} >{value}</Link></b> },
    { title: "Hình ảnh", dataIndex: "images", key: "images", render: (value) => <Image src={`${API_URL}/${value}`} height={150} width={150} /> },
    { title: "Tổng tiền", dataIndex: "total_price", key: "total_price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Số lượng", dataIndex: "amount", key: "amount", render: (value) => <b>{value}</b> },
  ];

  return (
    <Card title="Chi tiết đơn hàng" >
      <Info label="Mã đơn hàng" value={order.id} ></Info>
      <Info label="Người đặt" value={order.Contact.username} ></Info>
      <Info label="Tổng tiền" value={convertMoney(order.total_price)} ></Info>
      <Info label="Ngày đặt" value={moment(order.ordered_at).format("DD/MM/YYYY")} ></Info>
      <Info label="Trạng thái đơn hàng" value={getStatus(order.status)} ></Info>
      {
        order.status === 0 ?
        <Button danger
          onClick={() => onUpdateStatus(order.id, 3)}
        >
          Huỷ đơn hàng
        </Button>
        :
        <></>
      }
      <Divider></Divider>
      <Table columns={columns} dataSource={order.OrderDetails.map((item) => {
        const { Product: { id, title, images }, amount, total_price } = item;
        return {
          id, title, amount, total_price, images: images.main
        }
      })} ></Table>
    </Card>
  )
}

export default OrderDetail;