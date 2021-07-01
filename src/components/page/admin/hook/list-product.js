import api from "../api/index";

function useListProduct(props) {

  const { setModal, products, onDeleteProduct } = props;

  const onDeletedProductClick = (id) => {
    api.deleteProduct(id)
    .then((res) => {
      const { status, error } = res;
      if (status != 200) {
        setModal(
          <p>
            Xoá sản phẩm thất bại vì ${error}
          </p>
        )
        return;
      }
      onDeleteProduct(id);
      setModal(
        <p>
          Xoá sản phẩm thành công
        </p>
      )
    })
  }

  return {
    onDeletedProductClick
  }
}

export default useListProduct;