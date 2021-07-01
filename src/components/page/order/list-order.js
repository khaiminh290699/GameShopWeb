import { Button, Card, DatePicker, Form, Pagination, Row, Select, Space, Table } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import convertMoney from "../../../ultilities/moneyConvert";
import useListOrder from "./hook/list-order";
import moment from "moment";

const ORDER_STATUS = {
  0: "waiting",
  1: "pending",
  2: "finish",
  3: "reject"
}

function ListOrder(props) {

  const { pageAdmin } = props;

  const { 
    redirect,
    orders,
    total,
    pageIndex,
    pageSize,
    onChangePageIndex,
    onSelectStatusChange,
    onChangeDatePicker,
    onUpdateStatus
  } = useListOrder(props);

  if (redirect) {
    return <Redirect to={redirect} ></Redirect>
  } 

  const columns = [
    { title: "Mã đơn", dataIndex: "id", key: "id", render: (value, item) => <b><Link to={`/order/${item.id}`} >{value}</Link></b> },
    { title: "Tên khách hàng", dataIndex: "Contact", key: "Contact", render: (value) => <p>{value.username}</p> },
    { title: "Địa chỉ giao hàng", dataIndex: "address", key: "address", render: (value) => <p>{value}</p> },
    { title: "SĐT", dataIndex: "phone_number", key: "phone_number", render: (value) => <p>{value}</p> },
    { title: "Tổng giá", dataIndex: "total_price", key: "total_price", render: (value) => <p>{convertMoney(value)}</p> },
    { title: "Ngày tạo", dataIndex: "ordered_at", key: "ordered_at", render: (value) => <p>{moment(value).format("DD/MM/YYYY")}</p> },
    { title: "Ngày hoàn thành", dataIndex: "finished_at", key: "finished_at", render: (value) => <p>{ value ? moment(value).format("DD/MM/YYYY") : "Đơn hàng chưa giao"}</p> },
    { title: "Trạng thái", dataIndex: "status", key: "status", render: (value) => <button className="site-badge-count-109" style={
      { background: value === 3 ? "red" : ( value === 2 ? "green" : ( value === 1 ? "#4fddf0" : "#f7d707" ) ),
        border: "0px",
        borderRadius: "5px",
        color: "white",
        fontWeight: "2px"
      }
    } >{ORDER_STATUS[value]}</button> },
    { title: "Thực thi", render: (value, _, index) => { 
      if (!pageAdmin) {
        if ( value.status === 0 ) {
          return (
            <Button onClick={() => onUpdateStatus(value.id, 3, index)} danger>
              Huỷ đơn
            </Button>
          )
        }
        return <></>
      }
      return (
         <>
            {
              value.status === 0 ?
              <>
                <Space>
                  <Button onClick={() => onUpdateStatus(value.id, 1, index)} type="default">
                    Xác nhận
                  </Button>
                  <Button onClick={() => onUpdateStatus(value.id, 3, index)} danger>
                    Huỷ đơn
                  </Button>
                </Space>  
              </>
            :
            value.status === 1 ? 
              <>
                <Button onClick={() => onUpdateStatus(value.id, 2, index)} type="primary">
                  Hoàn thành
                </Button>
              </>
              :
              <></>
            }
         </>
      )
    } }
  ];

  return (
    <Card title="Quản lý đơn hàng">
      <Row>
        <Form>
          <Form.Item label="Lọc theo trạng thái : ">
            <Select style={{ width: "200px" }} onChange={onSelectStatusChange}>
              <Select.Option key={-1} value={-1} >
                Tất cả
              </Select.Option>
              {
                Object.keys(ORDER_STATUS).map((key) => {
                  return <Select.Option key={key} value={key} >
                    {ORDER_STATUS[key]}
                  </Select.Option>
                })
              }
            </Select>
          </Form.Item>
          <Form.Item label="Lọc theo ngày tạo : ">
            <DatePicker onChange={onChangeDatePicker} ></DatePicker>
          </Form.Item>
        </Form>
      </Row>
      <Table columns={columns} dataSource={orders} pagination={false} ></Table>
      <div style={{textAlign: "center"}}>
        <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
      </div>
    </Card>
  )
}

export default ListOrder;