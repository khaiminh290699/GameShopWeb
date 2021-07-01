import { Image, Row } from "antd";
import React from "react";
import useImageSlider from "./hook/image-slider";

const API_URL = process.env.API_URL || "http://localhost:8080"

function RowImg(props) {
  const { src, active, onClick } = props;
  let border
  if (active) {
    border = "2px pink solid";
  } else {
    border = "2px gray solid";
  }

  return (
    <img width={100} height={100} style={{
      marginLeft: "5px",
      border
    }} src={`${API_URL}/${src}`} 
      onClick={onClick}
    ></img>
  )
}

function ImageSlider(props) {
  const { files } = props;
  const { show , onClickImage, active} = useImageSlider(props)
  return (
    <div>
      <div style={{
         border: "4px gray solid",
      }}>
        <Image style={{ height: "300px" }} src={`${API_URL}/${show}`} ></Image>
      </div>
      <Row>
        {
          files.map((item, index) => {
            return <RowImg key={index} src={item} active={index === active} onClick={() => onClickImage(item, index)}></RowImg>
          })
        }
      </Row>
    </div>
  )
}

export default ImageSlider;