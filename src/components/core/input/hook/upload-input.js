import { useRef } from "react";

import api from "../api/index";

function useUpload(props) {
  const { file, addFile, removeFile } = props;

  const fileRef = useRef();

  const onUploadClick = () => {
    if (fileRef) {
      return fileRef.current.click();
    }
  }
  
  const onFileChange = (event) => {
    const files = event.target.files;
    for(let i = 0; i < files.length; i++) {
      const file = files[i];
      api.upload(file)
      .then((res) => {
        const { data: { data: { path } } } = res;
        addFile(path)
      })
    }
    fileRef.current.value = "";
  }

  const onRemoveFile = (file) => {
    removeFile(file)
    // api.removeFile(file)
    // .then(() => {
    //   removeFile(file)
    // })
  }

  return {
    file,
    fileRef,
    onUploadClick,
    onFileChange,
    onRemoveFile
  }

}

export default useUpload;