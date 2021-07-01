import { useEffect, useState } from "react";

function useImageSlider(props) {
  const { files } = props;

  const [active, setActive] = useState(0);
  const [show, setShow] = useState();

  useEffect(() => {
    setShow(files[0]);
  }, [])

  const onClickImage = (file, index) => {
    setActive(index);
    setShow(file);
  }

  return {
    show,
    active,
    onClickImage
  }
}

export default useImageSlider;