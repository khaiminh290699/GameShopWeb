import { useEffect, useRef, useState } from "react";
import api from "../api";

function useCart(props) {

  const { setModal } = props;

  const [orderId, setOrderId] = useState();
  const [ordered, setOrdered] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartTemp, setCartTemp] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState();
  const [priceAfterCoupon, setPriceAfterCoupon] = useState();
  const [coupon, setCoupon] = useState();

  const phoneRef = useRef();
  const addressRef = useRef();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const productIds = cart.reduce((productIds, item) => {
      const { product_id } = item;
      productIds.push(product_id);
      return productIds;
    }, []);

    api.getPorudctByIds(productIds)
      .then((res) => {
        const { status, data } = res;
        if (status != 200) {
          return;
        }
        const cartData = [];
        data.forEach((item, index) => {
          const { id, title, price, images, stock } = item;
          const { amount } = cart[cart.findIndex((item) => item.product_id === id)];
          cartData.push({
            key: index,
            id,
            title,
            amount,
            price: price * amount,
            image: images.main,
            stock
          })
        })
        setCart(cartData);
      })

      api.getListEffectCoupons()
      .then(res => {
        const { status, data } = res;
        if (status != 200) {
          return;
        }
        setCoupons(data.rows);
      })
  }, [])

  useEffect(() => {
    if (!code || code === -1) {
      setPriceAfterCoupon(null);
      setCoupon(null);
      return;
    }
    const products = JSON.parse(localStorage.getItem("cart"));
    api.applyCoupon(code, products)
    .then(res => {
      const { status, message, data } = res;
      if (status != 200) {
        setModal(<p>{message}</p>)
        setPriceAfterCoupon(0);
        return;
      }
      const { priceAfterCoupon } = data;
      setPriceAfterCoupon(priceAfterCoupon);
      return;
    })
  }, [code])

  const onChangeAmountInCart = (id, amount, stock, index) => {
    if (amount > stock) {
      return;
    }
    if (amount === 0) {
      cart.splice(index, 1);
    } else {
      const price = cart[index].price / cart[index].amount;
      cart[index].amount = amount;
      cart[index].price = price * amount;
    }
    setCart([...cart]);
    localStorage.setItem("cart", JSON.stringify(
      cart.map((item) => {
        return {
          product_id: item.id,
          amount: item.amount
        }
      })
    ))
  }

  const onCreateOrder = () => {
    const phone_number = phoneRef.current.input.value;
    const address = addressRef.current.input.value;
    const regex = new RegExp(/^\d+$/)
    if (!phone_number || !address) {
      alert("Nh???p ????? th??ng tin giao h??ng.");
      return;
    }
    if (!regex.test(phone_number)) {
      alert("S??T sai ?????nh d???ng.");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    api.createOrder(cart, address, phone_number, code)
      .then((res) => {
        const { status, message, data } = res;
        if (status != 200) {
          alert(message);
          return;
        }
        setOrderId(data.order.id)
        setOrdered(true);
        setCartTemp(cart);
        localStorage.setItem("cart", JSON.stringify([]))
      })
  }

  const onRejectOrder = () => {
    api.rejectOrder(orderId)
      .then((res) => {
        const { status, message, data } = res;
        if (status != 200) {
          setModal(<p>{message}</p>)
          return;
        }
        setOrderId(null)
        setOrdered(false);
        localStorage.setItem("cart", JSON.stringify(cartTemp))
      })
  }

  return {
    ordered,
    cart,
    phoneRef,
    addressRef,
    coupons,
    code,
    onChangeAmountInCart,
    onCreateOrder,
    onRejectOrder,
    setCode,
    priceAfterCoupon,
    coupon, setCoupon
  }
}

export default useCart;