import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

function useCategoryCreate() {
  const params = useParams();
  const isCreated = params.id ? false : true
  const titleRef = useRef();
  const [message, setMessage] = useState();
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const { id } = params;

    if (id) {
      api.getGateById(id)
      .then((res => {
        const { status, message, data } = res;
        if (status != 200) {
          setMessage({
            message,
            type: "error"
          })
          return;
        }
        const { title, banner } = data;
        titleRef.current.value = title;
        setBanner([banner])
      }))
    }
  }, [])

  const addBanner = (file) => {
    setBanner([file]);
  }

  const removeBanner = () => {
    setBanner([])
  }

  const onCreateCategoryClick = () => {
    const title = titleRef.current.value;
    const bannerImage = banner[0];
    
    if (!title || !bannerImage) {
      setMessage({
        message: "Vui lòng nhập đầy đủ thông tin",
        type: "error"
      })
      return;
    }
    const { id } = params;
    if (id) {
      api.updateCategory(id, title, bannerImage)
      .then((res) => {
        const { status, message, error } = res;
        if (status != 200) {
          if (status === 500) {
            setMessage({
              message: error,
              type: "error"
            })
          }
          if (status != 500) {
            setMessage({
              message: message,
              type: "error"
            })
          }
          return;
        }
        setMessage({
          message: "Cập nhật danh mục thành công",
          type: "success"
        })
      })
      return;
    }

    api.createCategory(title, bannerImage)
    .then((res) => {
      const { status, message, error } = res;
      if (status != 200) {
        if (status === 500) {
          setMessage({
            message: error,
            type: "error"
          })
        }
        if (status != 500) {
          setMessage({
            message: message,
            type: "error"
          })
        }
        return;
      }
      setMessage({
        message: "Tạo mới danh mục thành công",
        type: "success"
      })
    })
  }

  return {
    isCreated,
    message,
    titleRef,
    banner,
    addBanner,
    removeBanner,
    onCreateCategoryClick
  }
}

export default useCategoryCreate;