import { useRef, useState } from "react";
import validateEmail from "../../../../ultilities/validateEmail";
import api from "../api";

function useForgetPassword() {
  const [message, setMessage] = useState();
  const emailRef = useRef();

  const onForgetPasswordClick = () => {
    const email = emailRef.current.value;

    if (!email || !validateEmail(email)) {
      setMessage({
        message: "Email sai định dạng.",
        type: "error"
      })
      return;
    }

    setMessage({
      message: "Đang gửi...",
    })
    api.forgetPassword(email)
    .then(res => {
      const { status, message, error } = res;
      if (status === 404) {
        setMessage({
          message,
          type: "error"
        })
        return;
      }
      if (status === 500) {
        setMessage({
          message: error,
          type: "error"
        })
        return;
      }
      if (status != 200) return;
      setMessage({
        message: "Một chuỗi ngẫu nhiên đã được gửi về email của bạn. Hãy đăng nhập bằng chuỗi đó để cập nhật email mới.",
        type: "success"
      })
      return;
    })

  }

  return {
    message,
    emailRef,
    onForgetPasswordClick
  }
}

export default useForgetPassword;