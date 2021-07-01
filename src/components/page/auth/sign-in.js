import { Alert, Button, Card, Form } from "antd";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import useSignIn from "./hook/sign-in";

function SignIn() {

  const {
    message,
    redirect,
    emailRef,
    passwordRef,
    onSignInClick
  } = useSignIn();

  if (redirect) {
    return <Redirect to={redirect}></Redirect>
  }

  const alert = message ? <Alert message={message.message} type={message.type}></Alert> : <></>

  return (
    <Card title="Form đăng nhập">
      {alert}
      <Form layout="vertical">
        <Form.Item label="Địa chỉ email">
          <input type="email" className="ant-input" ref={emailRef} placeholder="Email@gmail.com"></input>
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <input type="password" className="ant-input" ref={passwordRef} placeholder="**********" min={8}></input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSignInClick}>Đăng nhập</Button>
          <Button type="link">
            <Link to="/forget-password">Quên mật khẩu ?</Link>
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default SignIn;