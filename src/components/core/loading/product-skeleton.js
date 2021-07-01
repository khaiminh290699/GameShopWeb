import React from "react";
import { Row, Skeleton } from "antd";

function ProductSkeleton() {
  return (
    <div>
      <Row>
        <Skeleton.Image style={{ width: 300, height: 300 }} />
        <div style={{ marginLeft: 20 }}>
          <div>
            <Skeleton.Button style={{ width: 300, marginBottom: 5 }} active={true} />
          </div>
          <div>
            <Skeleton.Button style={{ width: 300, marginBottom: 5 }} active={true} />
          </div>
          <div>
            <Skeleton.Button style={{ width: 300, marginBottom: 5 }} active={true} />
          </div>
        </div>
      </Row>
      <Skeleton loading active />
    </div>
  )
}

export default ProductSkeleton;