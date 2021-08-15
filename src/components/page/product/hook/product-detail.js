import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router"
import api from "../api";

function useProductDetail() {
  const { id } = useParams();

  const [redirect, setRedirect] = useState();

  const [loading, isLoading] = useState(true)
  const [product, setProduct] = useState();
  const [rating, setRating] = useState(0)
  const amountRef = useRef();

  useEffect(() => {
    api.getPorudctDetails(id)
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        setRedirect("/notfound");
        return;
      }
      isLoading(false)
      setProduct(data)
    })
  }, [id])

  useEffect(() => {
    api.getRating(id)
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      setRating(data);
    })
  }, [])

  const onRateChange = (value) => {
    api.rating(id, value)
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      setRating(data);
    })
  }

  return {
    redirect,
    loading,
    product,
    amountRef,
    rating,
    onRateChange
  }

}

export default useProductDetail;