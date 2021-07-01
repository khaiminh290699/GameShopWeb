import { useEffect, useRef, useState } from "react";
import api from "../api";

function useUpdateProfile() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const oldPassRef = useRef();
  const passRef = useRef();

  const [message, setMessage] = useState();
  const [editPass, setEditPass] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return
    }
    const { username, email } = JSON.parse(user);
    usernameRef.current.value = username;
    emailRef.current.value = email;
  }, [])

  const onUpdateProfileClick = () => {
    const email = emailRef.current.value;
    const username = usernameRef.current.value;

    if (!email || !!username) {
      setMessage({
        message: "Vui lòng nhập đầy đủ trường",
        type: "error"
      })
    }

    const old_password = editPass ? oldPassRef.current.value : undefined;
    const password = editPass ? passRef.current.value : undefined;
    if (editPass && (!old_password || !password)) {
      setMessage({
        message: "Vui lòng nhập đầy đủ trường",
        type: "error"
      })
    }
    api.updateProfile(email, username, old_password, password)
    .then(res => {
      const { status, data, message, error } = res;
      if (status != 200) {
        if (status === 500) {
          setMessage({
            message: error,
            type: "error"
          })
          return;
        }
        if (status != 500) {
          setMessage({
            message: message,
            type: "error"
          })
          return;
        }
        return;
      }
      setMessage({
        message: "Cập nhật thành công",
        type: "success"
      })

      localStorage.setItem("user", JSON.stringify(data))
    })
  }

  return {
    message,
    usernameRef,
    emailRef,
    editPass,
    oldPassRef,
    passRef,
    setEditPass,
    onUpdateProfileClick
  }
}

export default useUpdateProfile;