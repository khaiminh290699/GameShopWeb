import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import api from "../api";

function useProductDetail() {
  const { id } = useParams();

  const [redirect, setRedirect] = useState();

  const [loading, isLoading] = useState(true)
  const [product, setProduct] = useState();
  const amountRef = useRef();

  useEffect(() => {
    api.getPorudctDetails(id)
    .then((res) => {
      console.log(res)
      const { status, data } = res;
      if (status != 200) {
        setRedirect("/notfound");
        return;
      }
      isLoading(false)
      setProduct(data)
    })
  }, [id])

  return {
    redirect,
    loading,
    product,
    amountRef
  }

}

export default useProductDetail;