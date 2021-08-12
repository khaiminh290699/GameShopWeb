import { Button, Card, DatePicker, Form, InputNumber, Select, Tag } from "antd";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import EditorInput from "../../core/input/editor-input";
import UploadInput from "../../core/input/upload-input";
import FilterCategoryList from "../category/filter-category-list";
import FilterProductList from "../product/filter-product-list";
import useCouponCreate from "./hook/coupon-create";

function CouponCreate(props) {
  const { isCreated, ref, action, state } = useCouponCreate(props);
  return (
    <Card title={isCreated ? "Tạo mới ưu đãi" : "Cập nhật ưu đãi"}>
      <Form
        layout="vertical"
      >

        <Form.Item label="Mã ưu đãi">
          <input className="ant-input" ref={ref.code} ></input>
        </Form.Item>

        <Form.Item label="Tên ưu đãi">
          <input className="ant-input" ref={ref.title} ></input>
        </Form.Item>

        <Form.Item label="Số lượng">
            <InputNumber value={state.amount} ref={ref.amount} style={{ width: "100%" }} size="large" defaultValue={state.amount}
              onChange={action.onAmountChange}
            ></InputNumber>
        </Form.Item>

        <Form
          layout="inline"
          style={{ marginBottom: 15 }}
        >
          <Form.Item label="Giảm giá"
            style={{ marginRight: "50px" }}
          >
            <InputNumber
              style={{ width: "400px" }}
              size="large"
              defaultValue={state.discount}
              formatter={value => {
                if (state.current != 2) {
                  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                return `${value}%`
              }}
              value={state.discount}
              onChange={action.onDiscountChange}
            />
          </Form.Item>

          <Form.Item label="Loại giảm giá"
            style={{ marginRight: "50px" }}
          >
            <Select style={{ width: "400px" }} defaultValue={state.current} onChange={action.onCurrentChange}>
              <Select.Option key={1} value={1}>
                Tiền
              </Select.Option>
              <Select.Option key={2} value={2}>
                Phần trăm
              </Select.Option>
            </Select>
          </Form.Item>

        </Form>

        <Form.Item label="Giảm tối đa"
        >
          <InputNumber
            style={{ width: "100%" }}
            size="large"
            defaultValue={state.max_discount}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            value={state.max_discount}
            onChange={action.onMaxDiscountChange}
          />
        </Form.Item>

        <Form.Item label="Giả nhỏ nhất áp dụng">
          <InputNumber
            style={{ width: "100%" }}
            size="large"
            defaultValue={state.min_total_price}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            value={state.min_total_price}
            onChange={action.onMinTotalPriceChange}
          />
        </Form.Item>

        <Form.Item>
          <UploadInput title="Upload ảnh bìa" multiple={false} file={state.banner} addFile={action.addBanner} removeFile={action.removeBanner} ></UploadInput>
        </Form.Item>

        <Form.Item>
          <EditorInput title="Mô tả" content={state.description} setContent={action.onDescriptionChange} ></EditorInput>
        </Form.Item>

        <Form.Item label="Ngày hiệu lục">
          <DatePicker defaultValue={state.effect_at} format={"DD/MM/YYYY"} onChange={action.onEffectDateChange} value={state.effect_at} ></DatePicker>
        </Form.Item>

        <Form.Item label="Ngày kết thúc ">
          <DatePicker defaultValue={state.expiry_at} format={"DD/MM/YYYY"} onChange={action.onExpiryDateChange} value={state.expiry_at} ></DatePicker>
        </Form.Item>

        <ListTag 
          title="Các danh mục sẽ áp dụng" 
          list={state.category_apply}
          onTagClose={(value) => {action.onApplyChange("category_apply", value)}} 
          link="product" 
          color="blue">
        </ListTag>

        <ListTag 
          title="Các sản phẩm sẽ áp dụng (bất kể danh mục không được áp dụng)" 
          list={state.product_apply}
          onTagClose={(value) => {action.onApplyChange("product_apply", value)}} 
          link="product" 
          color="blue">
        </ListTag>

        <ListTag 
          title="Các sản phẩm sẽ không áp dụng (bất kể  danh mục được áp dụng)" 
          list={state.product_no_apply}
          onTagClose={(value) => {action.onApplyChange("product_no_apply", value)}} 
          link="product" 
          color="red">
        </ListTag>

        <FilterProductList title="Danh sách sản phẩm" apply={state.product_apply} no_apply={state.product_no_apply} setApply={(value) => {action.onApplyChange("product_apply", value)}} setNoApply={(value) => {action.onApplyChange("product_no_apply", value)}} ></FilterProductList>
        <FilterCategoryList title="Danh sách danh mục" apply={state.category_apply} setApply={(value) => {action.onApplyChange("category_apply", value)}} ></FilterCategoryList>
        <Form.Item>
          <Button type="primary" 
            onClick = { () => {
              action.onCreateClick();
            }}
          >
          {
              isCreated ?
              <>Tạo mới ưu đãi </>
              :
              <>Lưu ưu đãi</>
            }
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

function ListTag(props) {
  const { title, list, onTagClose, link, color } = props;
  return (
    <Card title={title}>
      {
        list.map((item, index) => {
          return <Tag
            closable
            color={color}
            onClose={e => {
              e.preventDefault();
              list.splice(index, 1);
              onTagClose(list)
            }}
          >
            <b>{ link ? <Link to={`/${link}/${item.id}`}>{ item.title }</Link> : item.title }</b>
          </Tag>
        })
      }
    </Card>
  )
}

export default CouponCreate;