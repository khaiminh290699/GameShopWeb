import { Alert, Button, Card, Form } from "antd";
import React from "react";
import useForgetPassword from "./hook/forget-pasword";

function ForgetPassword() {

  const {
    message,
    emailRef,
    onForgetPasswordClick
  } = useForgetPassword();

  const alert = message ? <Alert message={message.message} type={message.type}></Alert> : <></>

  return (
    <Card title="Form đăng nhập">
      {alert}
      <Form layout="vertical">
        <Form.Item label="Nhập email đã đăng ký tài khoản">
          <input type="email" className="ant-input" ref={emailRef} placeholder="Email@gmail.com"></input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onForgetPasswordClick}>Gửi</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ForgetPassword;