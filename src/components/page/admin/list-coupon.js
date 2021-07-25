import { Button, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function ListCoupon() {
  return (
    <Card title="Quản lý ưu đãi">
      <Button style={{ background: "yellow" }} >
        <Link style={{ color: "black" }} to="/admin/coupon/create">
          <b>Thêm sản ưu đãi</b>
        </Link>
      </Button>
      {/* <Table columns={columns} dataSource={products} pagination={false} ></Table>
      <div style={{textAlign: "center"}}>
        <Pagination current={pageIndex + 1} total={total} pageSize={pageSize} onChange={onChangePageIndex} />
      </div> */}
    </Card>
  )
}

export default ListCoupon;