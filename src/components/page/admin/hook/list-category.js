import { useEffect, useState } from "react";
import api from "../api/index";

function useListCategories(props) {

  const { setModal } = props;
  const pageSize = 20;

  const [categories, setCateories] = useState([]);
  const [total, setTotal] = useState(100);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    api.getCategory(pageIndex, pageSize, [["createdAt", "DESC"]])
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {
        return;
      }
      const { count, rows } = data;
      setTotal(count);
      setCateories(rows);
    })
  } , [pageIndex])

  const onChangePageIndex = (value) => {
    setPageIndex(value - 1)
  }

  const onDelete = (id) => {
    api.deleteCatetory(id)
    .then((res) => {
      const { status, message, data } = res;
      if (status != 200) {
        alert(message);
        return;
      }
      const { listDelete, listExist } = data;
      if (listExist.find(item => item === id)) {
        setModal(
          <p>Danh mục tồn tại sản phẩm</p>
        )
        return;
      }
      setModal(
        <p>Xoá danh mục thành công</p>
      )
      setCateories(categories.filter(item => item.id != id));
    })
  }

  // const onDeleteProduct = (id) => {
  //   setCateories(categories.filter((item) => item.id != id))
  // }

  return {
    categories,
    total,
    pageIndex,
    pageSize,
    onChangePageIndex,
    onDelete
    // onDeleteProduct
  }
}

export default  useListCategories;