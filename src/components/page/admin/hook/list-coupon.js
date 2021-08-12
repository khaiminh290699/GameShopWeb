import { useState, useEffect } from "react";
import api from "../api";

function useListCoupon() {
  const [state, setState] = useState({
    list: [],
    pageSize: 10,
    pageIndex: 0,
    total: 0
  });
  useEffect(() => {
    api.getListCoupons(state.pageIndex, state.pageSize)
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { count, rows } = data;
      setState({
        ...state,
        total: count,
        list: rows
      });
    })
  }, [state.pageIndex])

  const onDelete = (id) => {
    api.deleteCoupon(id)
    .then((res) => {
      const { status, message } = res;
      if (status != 200) {
        alert(message);
        return;
      }
      alert("Xoá danh mục thành công");
      setState({
        ...state,
        list: state.list.filter(item => item.id != id)
      });
    })
  }

  return {
    state,
    action: {
      onDelete
    }
  }
}

export default useListCoupon;