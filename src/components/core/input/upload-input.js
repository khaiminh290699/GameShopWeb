import React from "react";
import { Button, Card } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import ImageUpload from "../images/image-upload"

import useUpload from "./hook/upload-input";

function UploadInput(props) {
  const { file, title, multiple, removeFile } = props;
  const {
    fileRef,
    onUploadClick,
    onFileChange,
    onRemoveFile
  } = useUpload(props);

  const imageUpload = file.map((item, index) => {
    return <ImageUpload key={index} file={item} onRemoveFile={onRemoveFile} ></ImageUpload>
  })

  return (
    <>
      <input type="file" hidden ref={fileRef} multiple={multiple} onChange={onFileChange} />
      <Button 
        icon={<UploadOutlined />}
        onClick={onUploadClick}
      >{title}</Button>
      <Card title="Ảnh upload" >
        {imageUpload}
      </Card>
    </>
  )
}

export default UploadInput;