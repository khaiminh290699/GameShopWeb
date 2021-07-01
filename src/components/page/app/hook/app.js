import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import api from "../api";

function useApp() {
  const location = useLocation();
  const [modal, setModal] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    api.getUser()
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        return;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      localStorage.removeItem("user")
    })
  }, [location.pathname])

  const onOk = () => {
    setModal(null);
  }

  return {
    user,
    modal,
    onOk,
    setModal,
    setUser
  }
}

export default useApp;
