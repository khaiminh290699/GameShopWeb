import { useEffect, useState } from "react";
import api from "../api/index";

function useStatistic() {
  const [ time, setTime ] = useState({
    amount: 100,
    unit: "year"
  });
  const [ overall, setOverall ] = useState({})
  const [ topUser, setTopUser ] = useState([]);
  const [ topProduct, setTopPorudct ] = useState([]);
  const [ orderStatistic, setOrderStatistic ] = useState([])

  useEffect(() => {
    api.getTopUser(time.amount, time.unit)
    .then((result) => {
      const { data } = result;
      for (let i = data.length; i < 3; i ++) {
        data.push({
          total_contact_pay: null,
          username: null
        })
      }
      setTopUser(data)
    })

    api.getTopProduct(time.amount, time.unit)
    .then((result) => {
      const { data } = result;
      for (let i = data.length; i < 3; i ++) {
        data.push({
          total_amount_buy: null,
          title: null
        })
      }
      setTopPorudct(data)
    })

    api.getStatisticOverall(time.amount, time.unit)
    .then((result) => {
      const { data } = result;
      setOverall(data)
    })

    api.getStatisticOrder(time.amount, time.unit)
    .then((result) => {
      console.log(result);
      const { data } = result;
      setOrderStatistic(data)
    })
  }, [time])

  const onSelectTimeChange = (value) => {
    setTime(JSON.parse(value))
  }

  return {
    overall,
    topUser,
    topProduct,
    orderStatistic,
    onSelectTimeChange
  }
}

export default useStatistic;