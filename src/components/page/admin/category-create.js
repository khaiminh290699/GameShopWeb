import { Alert, Button, Card, Form } from "antd";
import React from "react";
import UploadInput from "../../core/input/upload-input";
import useCategoryCreate from "./hook/category-create";

function CategoryCreate() {
  const {
    isCreated,
    message,
    titleRef,
    banner,
    addBanner,
    removeBanner,
    onCreateCategoryClick
  } = useCategoryCreate();

  const messsageAlert = message ?
  <Alert style={{ marginBottom: "10px" }} type={message.type} message={message.message} ></Alert>
  :
  <></>

  return (
    <Card title={isCreated ? "Tạo mới danh mục" : "Cập nhật danh mục"}>
      {messsageAlert}
      <Form>
        <Form.Item label="Tên danh mục">
          <input className="ant-input" ref={titleRef} ></input>
        </Form.Item>
        <Form.Item>
          <UploadInput title="Upload ảnh bìa" multiple={false} file={banner} addFile={addBanner} removeFile={removeBanner} ></UploadInput>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onCreateCategoryClick} >
          {
              isCreated ?
              <>Tạo mới danh mục </>
              :
              <>Lưu danh mục</>
            }

          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default CategoryCreate;