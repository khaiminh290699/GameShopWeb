import { useState } from "react";
import useAddCart from "../../../page/product/hook/add-cart";

function useProductCard(props) {
  const { id, stock } = props

  const [hover, setHover] = useState(false);
  const { onAddToCart } = useAddCart(props);

  const onButtonClick = () => {
    onAddToCart(id, 1, stock);
  }
  return {
    hover,
    onHover: () => setHover(true),
    onNotHover: () => setHover(false),
    onButtonClick
  }
}

export default useProductCard;