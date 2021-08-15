import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import api from "../api";

function useProductCreate(props) {

  const { setModal } = props;
  const { id } = useParams();

  const [message, setMessage] = useState();
  const [redirect, setRedirect] = useState();

  const titleRef = useRef();
  const priceRef = useRef(); 
  const stockRef = useRef();

  const [isCreate, setIsCreate] = useState(true);

  const [deafultValue, setDefault] = useState({
    stock: 0,
    price: 0
  })
  const [categortSelected, setCategortSelected] = useState();
  const [main, setMain] = useState([]);
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState();
  const [category_id, setCategoryId] = useState();

  const [properties, setProperties] = useState([])

  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (id) {
      setIsCreate(false)
      api.getProductById(id)
      .then((res) => {
        const { status, data } = res;
        if (status != 200) {
          if (status === 404) {
            setRedirect("/notfound")
          }
          return;
        }
        const { images, title, stock, price, description, Properties, Category } = data;
        titleRef.current.value = title;
        setDefault({
          stock,
          price
        })
        setDescription(description);
        setProperties(Properties);
        setFiles(images.files);
        setMain([images.main]);
        // setCategoryId(Category.id);
        setCategortSelected({
          id: Category.id,
          title: Category.title
        })
      })
    }
    api.getCategoryTitle()
    .then((res) => {
      const { status, data } = res;
      if (status != 200) {

      }
      setCategories(data.rows);
    })
  }, [id])

  const addMain = (file) => {
    setMain([file]);
  }

  const addFiles = (file) => {
    files.push(file);
    setFiles([...files]);
  }

  const removeMain = () => {
    setMain([])
  }

  const removeFiles = (file) => {
    setFiles(files.filter((item) => item != file));
  }

  const onChangeCategorySelect = (option) => {
    const { value, label } = option;
    // setCategoryId(value);
    setCategortSelected({
      id: value,
      title: label
    });
  }

  const onCreateProduct = () => {
    const title = titleRef.current.value;
    const price = priceRef.current.ariaValueNow;
    const stock = stockRef.current.ariaValueNow;

    const category_id = categortSelected?.id;

    if (!category_id) {
      alert("Chưa chọn danh mục");
      return;
    }
    
    const images = {
      main: main[0],
      files
    }

    if (!isCreate && id) {
      api.updateProduct(id, title, images, price, stock, description, category_id, properties)
      .then((res) => {
        const { status, message, error } = res;
        if (status != 200) {
          setModal(
            <p>{error ? error : message}</p>
          )
          setMessage({
            type: "error",
            message: error ? error : message
          });
          return;
        }

        setMessage({
          type: "success",
          message: "Lưu mới thành công"
        });
      })
      .catch((err) => {

      })
      return;
    }

    api.createProduct(title, images, price, stock, description, category_id, properties)
      .then((res) => {
        const { status, message, error }= res;
        if (status != 200) {
          setModal(
            <p>{error ? error : message}</p>
          )
          setMessage({
            type: "error",
            message: error ? error : message
          });
          return;
        }

        titleRef.current.value = null;
        priceRef.current.ariaValueNow = "0";
        stockRef.current.ariaValueNow = 0;
        setMain([]);
        setFiles([]);
        // setCategoryId(undefined);
        setCategortSelected(undefined);
        setDescription("");
        setProperties([]);

        setMessage({
          type: "success",
          message: "Thêm mới thành công"
        });
      })
    .catch((err) => {

    })
  }

  return {
    redirect,
    isCreate,
    categortSelected,
    // category_id,
    message,
    titleRef,
    priceRef,
    stockRef,
    main,
    files,
    description,
    categories,
    properties,
    deafultValue,
    addMain,
    addFiles,
    removeMain,
    removeFiles,
    setDescription,
    onChangeCategorySelect,
    setProperties,
    onCreateProduct,
    setDefault
  }
}

export default useProductCreate;