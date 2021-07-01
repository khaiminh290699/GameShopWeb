import { useRef, useState } from "react";
import validateEmail from "../../../../ultilities/validateEmail";
import api from "../api/index";

function useSignUp() {
  const [message, setMessage] = useState();
  const [redirect, setRedirect] = useState();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSignUpClick = () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password || password.length < 8 ) {
      setMessage({
        message: "Dữ liệu nhập không đúng.",
        type: "error"
      })
      return;
    }

    if (!validateEmail(email)) {
      setMessage({
        message: "Email sai định dạng.",
        type: "error"
      })
      return;
    }

    api.signUp(username, email, password)
      .then((res) => {
        const { status, message, error } = res;
        if (status != 200) {
          setMessage({
            message: error,
            type: "error"
          })
          return;
        }
        alert("Đăng ký thành công");
        setRedirect("/sign-in");
        return;
      })
  }

  return {
    message,
    redirect,
    usernameRef,
    emailRef,
    passwordRef,
    onSignUpClick
  }
}

export default useSignUp;