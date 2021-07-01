import moment from "moment";
import api from "../api/index"
import { useEffect, useState } from "react";


const ORDER_STATUS = {
  0: "waiting",
  1: "pending",
  2: "finish",
  3: "reject"
}

function useListOrder(props) {

  const { pageAdmin = false, setModal } = props;

  const pageSize = 5;

  const [redirect, setRedirect] = useState();

  const [status, setStatus] = useState();
  const [date, setDate] = useState();

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(100);
  const [pageIndex, setPageIndex] = useState({
    index: 0
  });

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      setRedirect("/notfound");
      return;
    }

    const wheres = !pageAdmin ? { contact_id: { eq: user.id } } : {};
 
    if (ORDER_STATUS[status]) {
      wheres.status = {
        eq: status
      }
    } else {
      delete wheres.status;
    }

    if (date) {
      wheres.ordered_at = {
        between: [date.from, date.to]
      }
    } else {
      delete wheres.ordered_at;
    }

    api.getOrders(wheres , pageIndex.index, pageSize, [["createdAt", "DESC"]])
    .then((res) => {
      console.log(res);
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { count, rows } = data;
      setTotal(count);
      setOrders(rows);
    })
  } , [pageIndex])

  const onChangePageIndex = (value) => {
    setPageIndex({
      index: value - 1
    })
  }

  const onChangeDatePicker = (value) => {
    if (!value) {
      setDate(value)
      setPageIndex(0)
      return;
    }
    const from = moment(new Date(value)).startOf("date");
    const to = moment(new Date(value)).endOf("date");
    setDate({
      from,
      to
    })
    setPageIndex({
      index: 0
    })
  } 

  const onSelectStatusChange = (value) => {
    setStatus(value);
    setPageIndex({
      index: 0
    })
  }

  const onUpdateStatus = (id, status, index) => {
    api.updateState(id, status)
      .then((res) => {
        const { status: s, data } = res;
        if (s != 200) {
          setModal(
            <p>Cập nhật trạng thái đơn hàng thất bại</p>
          )
          return ;
        }
        setModal(
          <p>Cập nhật trạng thái đơn hàng thành công</p>
        )
        orders[index].status = status;
        setOrders([...orders])
      })
  }

  return {
    redirect,
    orders,
    total,
    pageIndex: pageIndex.index,
    pageSize,
    onChangePageIndex,
    setStatus,
    setDate,
    onChangeDatePicker,
    onSelectStatusChange,
    onUpdateStatus
  }
}

export default useListOrder;