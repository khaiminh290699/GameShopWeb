import { useEffect, useState } from "react";
import api from "../api/index";

function useFilterCategoryList(props) {
  const { limit = 2 } = props;

  let [state, setState] = useState({
    categories: [],
    page: 1,
    wheres: {},
    total: 0,
  })

  useEffect(() => {
    api.getCategories(state.page - 1, limit, [["createdAt", "DESC"]], state.wheres).then(res => {
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
  }, [state.page, state.wheres]) 

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

  const onPageChange = (current) => {
    state = { ...state, page: current };
    setState(state)
  }

  return {
    state,
    ref: {},
    action: {
      onTitleChange,
      onPageChange
    },
  }
}

export default useFilterCategoryList;