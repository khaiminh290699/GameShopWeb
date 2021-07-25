import moment from "moment";
import { useEffect, useState, useRef } from "react";
import api from "../api";

function useFilterProductList(props) {
  const { limit = 2 } = props;

  const title = useRef();

  let [state, setState] = useState({
    products: [],
    categories: [],
    page: 1,
    wheres: {},
    total: 0,
  })

  useEffect(() => {
    api.getCategories().then(res => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { rows } = data;
      state = {
        ...state,
        categories: rows
      }
      setState({
        ...state
      });
    })
  }, []) 

  useEffect(() => {
    api.getProducts(state.page - 1, limit, [["createdAt", "DESC"]], state.wheres)
    .then(res => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { count, rows } = data;
      state = {
        ...state,
        total: count,
        products: rows
      }
      setState(state);
    })
  }, [state.page, state.wheres])

  const onDateFilterChange = (value) => {
    if (!value) {
      delete state.wheres.createdAt;
      state.wheres = { ...state.wheres }
      state = { ...state, page: 1 };
      setState(state);
      return;
    }
    const from = moment(new Date(value)).startOf("date");
    const to = moment(new Date(value)).endOf("date");
    state.wheres = { ...state.wheres, createdAt: { between: [from, to] } }
    state = { ...state, page: 1 }
    setState(state)
  }

  const onTitleChange = (event) => {
    const { value } = event.target;
    if (!value) {
      delete state.wheres.title;
      state.wheres = { ...state.wheres }
      state = { ...state, page: 1 };
      setState(state);
      return;
    }
    state.wheres = { ...state.wheres, title: { like: `%${value}%` } }
    state = { ...state, page: 1 }
    setState(state);
    return;
  }

  const onCategoryChange = (value) => {
    if (value === -1) {
      delete state.wheres.category_id;
      state.wheres = { ...state.wheres }
      state = { ...state, page: 1 };
      setState(state);
      return;
    }
    state.wheres = { ...state.wheres, category_id: { eq: value } }
    state = { ...state, page: 1 }
    setState(state);
    return;
  }

  const onPageChange = (current) => {
    state = { ...state, page: current };
    setState(state)
  }

  return {
    state,
    ref: {
      title
    },
    action: {
      onDateFilterChange,
      onTitleChange,
      onCategoryChange,
      onPageChange
    },
  }

}

export default useFilterProductList;