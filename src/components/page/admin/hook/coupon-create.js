import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

function useCouponCreate(props) {
  const { setModal } = props;
  const params = useParams();
  const isCreated = params.id ? false : true;

  const ref = {
    title: useRef(),
    code: useRef()
  }

  let [state, setState] = useState({
    product_apply: [],
    product_no_apply: [],
    category_apply: [],
    category_no_apply: [],
    banner: [],
    description: null,
    expiry_at: moment(new Date()).startOf("date"),
    effect_at: moment(new Date()).endOf("date"),
    amount: 0,
    current: 1,
    discount: 0,
    max_discount: 0,
    min_total_price: 0
  })

  useEffect(() => {
    const { id } = params;
    if (id) {
      api.getCoupon(id)
      .then((res => {
        const { status, message, data } = res;
        if (status != 200) {
          return;
        }
        ref.title.current.value = data.coupon.title;
        ref.code.current.value = data.coupon.code;
        setState({
          ...data.coupon,
          expiry_at: moment(data.coupon.expiry_at).startOf("date"),
          effect_at: moment(data.coupon.effect_at).endOf("date"),
          banner: [data.coupon.banner],
          category_no_apply: data.categoryNoApply,
          category_apply: data.categoryApply,
          product_apply: data.productApply,
          product_no_apply: data.productNoApply
        })
      }))
    }
  }, [])

  const onApplyChange = (field, value) => {
    state = { ... state, [field]: value}
    setState(state)
  }
  
  const addBanner = (file) => {
    state = { ...state, banner: [file]}
    setState(state);
  }

  const removeBanner = () => {
    state = { ...state, banner: []}
    setState(state);
  }

  const onDescriptionChange = (description) => {
    state = { ...state, description }
    setState(state);
  }

  const onEffectDateChange = (effect_at) => {
    state = { ...state, effect_at: moment(effect_at).startOf("date") }
    setState(state);
  }

  const onExpiryDateChange = (expiry_at) => {
    state = { ...state, expiry_at: moment(expiry_at).endOf("date") }
    setState(state);
  }

  const onAmountChange = (amount) => {
    if (amount < 0) {
      return;
    }
    state = { ...state, amount }
    setState(state);
  }

  const onCurrentChange = (current) => {
    state = { ...state, current, discount: 0 }
    setState(state);
  }

  const onDiscountChange = (discount) => {
    if (discount < 0) {
      return;
    }
    state = { ...state, discount }
    setState(state);
  }

  const onMaxDiscountChange = (max_discount) => {
    if (max_discount < 0) {
      return;
    }
    state = { ...state, max_discount }
    setState(state);
  }

  const onMinTotalPriceChange = (min_total_price) => {
    if (min_total_price < 0) {
      return;
    }
    state = { ...state, min_total_price }
    setState(state);
  }

  const onCreateClick = () => {
    const { id } = params;

    const title = ref.title.current.value;
    const code = ref.code.current.value;
    const {
      discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner, product_apply, product_no_apply, category_apply, category_no_apply, description
    } = state;

    if (id) {
      api.updateCoupon(
        id, title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner[0], product_apply, product_no_apply, category_apply, category_no_apply, code, description
      ).then((res) => {
        const { status, message } = res;
        if (status === 400) {
          setModal(
            <p>
              {message}
            </p>
          )
          return;
        }
  
        if (status === 500) {
          setModal(
            <p>
              {message}
            </p>
          )
          return;
        }
  
        setModal(<p>
          C???p nh???t m?? ??u ????i th??nh c??ng
        </p>)
      })
      return;
    }

    api.createCoupon(
      title, discount , max_discount, current, amount, min_total_price, effect_at, expiry_at, banner[0], product_apply, product_no_apply, category_apply, category_no_apply, code, description
    ).then((res) => {
      const { status, message, error, data } = res;
      if (status === 400) {
        setModal(
          <p>
            {message}
          </p>
        )
        return;
      }

      if (status === 500) {
        setModal(
          <p>
            {message}
          </p>
        )
        return;
      }

      setModal(<p>
        T???o m?? ??u ????i th??nh c??ng
      </p>)
    })

  }

  return {
    isCreated,
    state,
    ref,
    action: {
      onApplyChange,
      addBanner,
      removeBanner,
      onDescriptionChange,
      onEffectDateChange,
      onExpiryDateChange,
      onAmountChange,
      onCurrentChange,
      onDiscountChange,
      onMaxDiscountChange,
      onMinTotalPriceChange,
      onCreateClick
    }
  }
}

export default useCouponCreate;