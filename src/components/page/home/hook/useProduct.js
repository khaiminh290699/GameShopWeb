import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

function useProduct() {

  const pageSize = 20;

  const { id } = useParams();
  const [redirect, setRedirect] = useState();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(100);
  const [pageIndex, setPageIndex] = useState(0);
  const [title, setTitle] = useState();
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const wheres = id ? { category_id: { eq: id } } : {}
    if (id) {
      api.getCateById(id)
      .then(res => {
        const { status, data } = res;
        if (!data) {
          setRedirect("/notfound")
          return;
        }
        setTitle(data.title);
        return;
      })
    } else {
      setTitle();
    }
    api.getProduct(pageIndex, pageSize, [["createdAt", "DESC"]], wheres)
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { count, rows } = data;
      setTotal(count);
      setProducts(rows);
    })
  } , [pageIndex, id])

  useEffect(() => {
    if (!id) {
      api.getCoupons({
        effect_at: { lte: new Date() },
        expiry_at: { gte: new Date() }
      }, [["createdAt", "DESC"]])
      .then((result) => {
        const { status, data } = result;
        if (status != 200) {
          return;
        }
        const { rows } = data;
  
        setCoupons(rows)
      })
    } else {
      setCoupons([]);
    }
  }, [id])

  const onChangePageIndex = (value) => {
    setPageIndex(value - 1)
  }

  const onDeleteProduct = (id) => {
    setProducts(products.filter((item) => item.id != id))
  }

  return {
    title,
    redirect,
    products,
    total,
    pageIndex,
    pageSize,
    coupons,
    onChangePageIndex,
    onDeleteProduct
  }
}

export default useProduct;