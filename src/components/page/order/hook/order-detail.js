import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/index";

function useOrderDetail(props) {

  const { setModal } = props;

  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState();

  useEffect(() => {
    const { id } = params; 
    api.getOrderById(id)
      .then((res) => {
        const { status, data } = res;
        if (status != 200) {
          return;
        }
        setOrder(data);
        setLoading(false)
      })
  }, [])

  const onUpdateStatus = (id, status) => {
    api.updateState(id, status)
      .then((res) => {
        const { status: s } = res;
        if (s != 200) {
          setModal(
            <p>Cập nhật trạng thái đơn hàng thất bại</p>
          )
          return ;
        }
        setModal(
          <p>Cập nhật trạng thái đơn hàng thành công</p>
        )
        order.status = status;
        setOrder(order);
      })
  }

  return {
    order,
    loading,
    onUpdateStatus
  }
}

export default useOrderDetail;