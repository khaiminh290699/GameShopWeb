import { useState } from "react";

function useAddCart(props) {

  const { setModal } = props;

  const onAddToCart = (product_id, amount, stock) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Hãy đăng nhập để có quyền thêm sản phẩm vào giỏ hàng");
      return;
    }
    const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    const productInCart = cart[cart.findIndex(item => item.product_id === product_id)];

    if (!productInCart) {
      if (amount <= stock) {
        cart.push({
          product_id,
          amount
        });
      } else {
        setModal(
          <p>Số lượng thêm vào lớn hơn tồn kho sản phẩm</p>
        )
        return;
      }
    } else {
      if (productInCart.amount + amount > stock) {
        if (setModal) {
          setModal(
            <p>Số lượng thêm vào lớn hơn tồn kho sản phẩm</p>
          )
        }
        return;
      }
      productInCart.amount += amount;
    }
    if (setModal) {
      setModal(
        <p>Đã thêm vào vỏ hàng thành công</p>
      )
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return {
    onAddToCart
  }
}

export default useAddCart;