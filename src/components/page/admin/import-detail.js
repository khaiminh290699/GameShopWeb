import { Button, Card, Image, Pagination, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useProduct from "../home/hook/useProduct";
import useListProduct from "./hook/list-product";

import moment from "moment"
import baseApi from "../../../ultilities/axios";
import connectSocket from "../../../ultilities/socket";

const API_URL = process.env.API_URL || "http://localhost:8080"

function ImportDetail() {
  const { id: import_id } = useParams();
  
  let [state, setState] = useState({
    import: {
      details: []
    }
  })

  useEffect(() => {
    baseApi.post("product/import-detail", { import_id }).then(({ data }) => {
      const { import_good, details } = data;
      setState({
        ...state,
        import: {
          ...import_good,
          details
        }
      })
    })
  }, [])


  const columns = [
    { title: "Sản phẩm", dataIndex: "Product", key: "Product", render: (value) => <Link to={`/product/${value.id}`}>{value.title}</Link> },
    { title: "Số lượng nhập", dataIndex: "amount", key: "amount", render: (value) => <p>{value}</p> },
    { title: "Giá mỗi sản phẩm", dataIndex: "each_price", key: "each_price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Tổng chi", dataIndex: "", key: "", render: (value, item) => <p>{convertMoney(item.amount * item.each_price)}</p> },
  ];

  return (
    <Card title="Chi tiết nhập kho">
      <div>
        <b>Mã nhập:</b> {state.import.id}
      </div>
      <div>
        <b>Tình trạng:</b> {state.import.state}
      </div>
      <div>
        <b>Số lượng sản phẩm nhập:</b> {state.import.amount_imported}
      </div>
      <div>
        <b>Tổng giá tiền:</b> {convertMoney(state.import.total_price || 0)}
      </div>
      <div>
        <b>Ngày nhập:</b> {state.import.total_price ? moment(state.import.total_price).format("HH:mm DD/MM/YYYY") : "" }
      </div>
      <Table columns={columns} dataSource={state.import.details} pagination={false} ></Table>
    </Card>
  )
}



export default ImportDetail;