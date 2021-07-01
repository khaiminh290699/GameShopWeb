import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/index";

function useOrderDetail() {
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

  return {
    order,
    loading
  }
}

export default useOrderDetail;