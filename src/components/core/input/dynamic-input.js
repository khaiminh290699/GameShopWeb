import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import useDynamicInput from "./hook/dynamic-input";

function DynamicInput(props) {

  const { fields } = props;

  const {
    inputRef,
    onAddField,
    onRemoveField,
    onValueChange
  } = useDynamicInput(props);

  const fieldInputs = fields.map((item, index) => {
    const { label, value } = item;
    return (
      <Row key={index} style={{ marginTop: 10 }}>
        <label style={{ width: "10%",  textAlign: "center" }} >{label} :</label>
        <Input label={label} style={{ width: "80%" }} value={value} onChange={(event) => onValueChange(label, event.target.value)} />
        <Button type="primary" danger
          onClick={() => onRemoveField(label)}
        >
          Xoá
        </Button>
      </Row>
    );
  })

  return (
    <>
      <Row>
        <input ref={inputRef} placeholder="Nhập tên trường muốn thêm" className="ant-input field-input"></input>
        <Button type="primary" htmlType="submit" className="add-field-button"
          onClick={onAddField}
        >
          Thêm
        </Button>
      </Row>
      {fieldInputs}
    </>
  )
}

export default DynamicInput;