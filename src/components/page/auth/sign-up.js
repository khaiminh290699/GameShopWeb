import { Alert, Button, Card, Form } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import useSignUp from "./hook/sign-up";

function SignUp() {

  const {
    message,
    redirect,
    usernameRef,
    emailRef,
    passwordRef,
    onSignUpClick
  } = useSignUp();

  if (redirect) {
    return <Redirect to={redirect}></Redirect>
  }

  const alert = message ? <Alert message={message.message} type={message.type}></Alert> : <></>

  return (
    <Card title="Form đăng kí">
      {alert}
      <Form layout="vertical">
        <Form.Item label="Tên đăng nhập">
          <input type="text" className="ant-input" ref={usernameRef}></input>
        </Form.Item>
        <Form.Item label="Địa chỉ email">
          <input type="email" className="ant-input" ref={emailRef} placeholder="Email@gmail.com"></input>
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <input type="password" className="ant-input" ref={passwordRef} placeholder="**********" min={8}></input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSignUpClick}>Tạo tại khoản</Button>
          <Button type="link">
            <Link to="/forget-password">Quên mật khẩu ?</Link>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignUp;