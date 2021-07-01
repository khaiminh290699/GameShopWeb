import { Alert, Button, Card, Form, InputNumber } from "antd";
import React from "react";
import EditorInput from "../../core/input/editor-input";
import UploadInput from "../../core/input/upload-input";
import DynamicInput from "../../core/input/dynamic-input";
import SelectInput from "../../core/input/select-input";
import useProductCreate from "./hook/product-create";
import { Redirect } from "react-router";

function ProductCreate(props) {
  const {
    redirect,
    isCreate,
    categortSelected,
    // category_id,
    message,
    titleRef,
    priceRef,
    stockRef,
    main,
    files,
    description,
    categories,
    properties,
    deafultValue,
    addMain,
    addFiles,
    removeMain,
    removeFiles,
    setDescription,
    onChangeCategorySelect,
    setProperties,
    onCreateProduct,
    setDefault
  } = useProductCreate(props);

  if (redirect) {
    return <Redirect to={redirect} ></Redirect>
  }

  const messsageAlert = message ?
    <Alert type={message.type} message={message.message} ></Alert>
    :
    <></>

  return (
    <Card title={isCreate ? "Tạo mới sản phẩm" : "Cập nhật sản phẩm"}>
      {messsageAlert}
      <Form
        layout="vertical"
      >
        <Form.Item label="Tên sản phẩm">
          <input className="ant-input" ref={titleRef}></input>
        </Form.Item>
        <Form.Item label="Danh mục">
          <SelectInput selected={categortSelected} options={categories} handleChange={onChangeCategorySelect} placeholder="Chọn danh mục cho sản phẩm" ></SelectInput>
        </Form.Item>

        <Form
          layout="inline"
          style={{ marginBottom: 15 }}
        >
          <Form.Item label="Giá tiền"
            style={{ marginRight: "50px" }}
          >
            <InputNumber
              ref={priceRef}
              style={{ width: "450px" }}
              size="large"
              defaultValue={deafultValue.price}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              value={deafultValue.price}
              onChange={(value) => {
                setDefault({
                  ...deafultValue,
                  price: value
                })
              }}
            />
          </Form.Item>

          <Form.Item label="Số lượng">
            <InputNumber value={deafultValue.stock} ref={stockRef} style={{ width: "450px" }} size="large" defaultValue={deafultValue.stock}
              onChange={(value) => {
                setDefault({
                  ...deafultValue,
                  stock: value
                })
              }}
            ></InputNumber>
          </Form.Item>
        </Form>

        <Form.Item>
          <UploadInput title="Upload ảnh bìa" multiple={false} file={main} addFile={addMain} removeFile={removeMain} ></UploadInput>
        </Form.Item>
        <Form.Item>
          <UploadInput title="Upload ảnh thêm" multiple={true} file={files} addFile={addFiles} removeFile={removeFiles} ></UploadInput>
        </Form.Item>
        <Form.Item>
          <EditorInput title="Mô tả" content={description} setContent={setDescription} ></EditorInput>
        </Form.Item>
        <Form.Item label="Thông tin chi tiết">
          <DynamicInput fields={properties} setFields={setProperties}></DynamicInput>
        </Form.Item>

        <Form.Item label="Thông tin chi tiết">
          <Button onClick={onCreateProduct} type="primary" htmlType="submit" >
            {
              isCreate ?
              <>Tạo mới sản phẩm </>
              :
              <>Lưu sản phẩm</>
            }
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ProductCreate;