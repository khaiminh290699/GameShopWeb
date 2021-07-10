import { Alert, Button, Card, Form } from "antd";
import React from "react";
import useUpdateProfile from "./hook/update-profile";

function UpdateProfile() {
  const {
    message,
    usernameRef,
    emailRef,
    oldPassRef,
    passRef,
    editPass,
    setEditPass,
    onUpdateProfileClick
  } = useUpdateProfile();
  const alert = message ? <Alert message={message.message} type={message.type}></Alert> : <></>
  return (
    <Card title="Cập nhật thông tin cá nhân" >
      {alert}
      <Form>
        <Form layout="vertical">
          <Form.Item label="Tên đăng nhập">
            <input type="text" className="ant-input" ref={usernameRef} placeholder="Email@gmail.com"></input>
          </Form.Item>
          <Form.Item label="Địa chỉ email">
            <input type="email" className="ant-input" ref={emailRef} placeholder="Email@gmail.com"></input>
          </Form.Item>
          {
            editPass ?
            <>
              <Form.Item label="Mật khẩu cũ của bạn">
                <input type="password" className="ant-input" ref={oldPassRef} placeholder="********"></input>
              </Form.Item>
              <Form.Item label="Mật khẩu mới">
                <input type="password" className="ant-input" ref={passRef} placeholder="********"></input>
              </Form.Item>
            </>
            :
            <></>
          }
          <Form.Item>
            {
              !editPass ?
               <Button type="link" onClick={() => setEditPass(true)}>
                Đổi mật khẩu
              </Button>
              :
              <Button type="link" onClick={() => setEditPass(false)}>
                Huỷ đổi mật khẩu
              </Button>
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={onUpdateProfileClick} >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Form>
    </Card>
  )
}

export default UpdateProfile;