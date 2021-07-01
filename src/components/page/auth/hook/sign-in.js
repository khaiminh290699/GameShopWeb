import { useRef, useState } from "react";
import validateEmail from "../../../../ultilities/validateEmail";
import api from "../api/index";

function useSignIn() {
  const [message, setMessage] = useState();
  const [redirect, setRedirect] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSignInClick = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password || password.length < 8 ) {
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

    api.signIn(email, password)
      .then((res) => {
        const { status, message, error, data } = res;
        if (status != 200) {
          if (status === 500) {
            setMessage({
              message: error,
              type: "error"
            })
          } else {
            setMessage({
              message: message,
              type: "error"
            })
          }
          return;
        }
        console.log(data);
        localStorage.setItem("cart", JSON.stringify([]))
        localStorage.setItem("user", JSON.stringify(data))
        localStorage.setItem("token", data.token)
        setRedirect("/");
        return;
      })
  }

  return {
    message,
    redirect,
    emailRef,
    passwordRef,
    onSignInClick
  }
}

export default useSignIn;