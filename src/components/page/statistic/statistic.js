import { Card, Col, Row, Table, Form, Select } from "antd";
import { Pie } from '@ant-design/charts';
import React from "react";
import convertMoney from "../../../ultilities/moneyConvert";
import useStatistic from "./hook/useStatistic";
import getStatus from "../../../ultilities/getStatus";

function Statistic(props) { 
  const {
    overall,
    topUser,
    topProduct,
    orderStatistic,
    onSelectTimeChange
  } = useStatistic();

  const columnsUser = [
    { title: "Xếp hạng", dataIndex: "rank", key: "rank", render: (_, __, idnex) => <b>{ idnex + 1 }</b> },
    { title: "Tên", dataIndex: "username", key: "username", render: (value) => <b>{value ? value : "_"}</b>},
    { title: "Tổng tiền", dataIndex: "total_contact_pay", key: "total_contact_pay", render: (value) => <p>{value != null ? convertMoney(value) : "_"}</p> }
  ];

  const columnsProduct = [
    { title: "Xếp hạng", dataIndex: "rank", key: "rank", render: (_, __, idnex) => <b>{ idnex + 1 }</b> },
    { title: "Tên sản phẩm", dataIndex: "title", key: "title", render: (value) => <b>{value ? value : "_"}</b>},
    { title: "Số lượng đã bán", dataIndex: "total_amount_buy", key: "total_amount_buy", render: (value) => <p>{value != null ? value : "_"}</p> }
  ];

  const data = orderStatistic.map((item) => {
    return {
      status: getStatus(item.status),
      value: +item.value
    }
  })

  const config = {
    data,
    meta: {
      country: {
        range: [0, 1],
      },
      value: {
        formatter: (v) => {
          return `${v}`;
        },
      },
    },
    angleField: 'value',
    colorField: 'status',
  };

  return (
    <Card title="Thống kê">
      <Row>
        <Form>
          <Form.Item label="Lọc theo thời gian : ">
            <Select style={{ width: "200px" }} onChange={onSelectTimeChange}>
              <Select.Option key={0} value={JSON.stringify({ amount: 1, unit: "month" })} >
                1 tháng
              </Select.Option>
              <Select.Option key={1} value={JSON.stringify({ amount: 3, unit: "month" })} >
                3 tháng
              </Select.Option>
              <Select.Option key={2} value={JSON.stringify({ amount: 6, unit: "month" })} >
                6 tháng
              </Select.Option>
              <Select.Option key={3} value={JSON.stringify({ amount: 1, unit: "year" })} >
                1 năm
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Row>
      <Row>
        <div>
          <label>Số lượng khách hàng được tạo : </label>
          <span> { overall.total_contact ? overall.total_contact : 0 }</span>
        </div>
      </Row>
      <Row>
        <div>
          <label>Tổng thu nhập : </label>
          <span> { convertMoney(overall.total_profit) }</span>
        </div>
      </Row>
      <Row>
        <div>
          <label>Tổng nhập kho : </label>
          <span> { convertMoney(overall.total_chi) }</span>
        </div>
      </Row>
      <Row>
        <Col span={14}>
          <Card title="Top 3 sản phẩm chạy nhất" >
            <Table columns={columnsProduct} dataSource={topProduct} pagination={false}></Table>
          </Card>
        </Col>
        <Col span={10} style={{ paddingLeft: 10 }}>
          <Card title="Top 3 khách hàng" >
            <Table columns={columnsUser} dataSource={topUser} pagination={false}></Table>
          </Card>
        </Col>
      </Row>
      <Row>
        <Card title="Thống kê trạng thái đơn hàng" >
          <Pie width={500} height={500} {...config} />
        </Card>
        <Card title="Thống kê lợi nhuận theo tháng" >
          
        </Card>
      </Row>
    </Card>
  )
  
}

export default Statistic;