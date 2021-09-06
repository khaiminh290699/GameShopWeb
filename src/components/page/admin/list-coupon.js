import { Button, Card, Image, Space, Table } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useListCoupon from "./hook/list-coupon";

const API_URL = process.env.API_URL || "http://localhost:8080";

function ListCoupon() {
  const { state, action } = useListCoupon();
  const columns = [
    { title: "Mã ưu đãi", dataIndex: "code", key: "code", render: (value, item) => <b><Link to={`/coupon/${item.id}`}>{value}</Link></b> },
    { title: "Tên ưu đãi", dataIndex: "title", key: "title", render: (value) => <b>{value}</b> },
    { title: "Ảnh bìa", dataIndex: "banner", key: "banner", render: (value) => <Image src={`${API_URL}/${value}`} height={150} width={150} /> },
    { title: "Ngày hiệu lực", dataIndex: "effect_at", key: "effect_at", render: (value) => <p>{moment(value).format("DD/MM/YYYY")}</p>  },
    { title: "Ngày hết hạn", dataIndex: "expiry_at", key: "expiry_at", render: (value) => <p>{moment(value).format("DD/MM/YYYY")}</p> },
    { title: "Số giảm", render: (item) => <p>{ item.currency === 2 ? `${item.discount}%` : convertMoney(item.discount) }</p> },
    { title: "Giá thấp nhất", dataIndex: "min_total_price", key: "min_total_price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Giá tối đa", dataIndex: "max_discount", key: "max_discount", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Thực thi", render: (value) => {
      return <Space>
        <Button style={{ border: "2px yellow solid", background: "yellow" }}>
          <Link to={`/admin/coupon/update/${value.id}`}>
            Cập nhật
          </Link>
        </Button>
        <Button danger onClick={() => { action.onDelete(value.id) }} >Xoá</Button>
      </Space>
    } }
  ];
  return (
    <Card title="Quản lý ưu đãi">
      <Button style={{ background: "yellow" }} >
        <Link style={{ color: "black" }} to="/admin/coupon/create">
          <b>Thêm sản ưu đãi</b>
        </Link>
      </Button>
      <Table columns={columns} dataSource={state.list} pagination={false} ></Table>
    </Card>
  )
}

export default ListCoupon;