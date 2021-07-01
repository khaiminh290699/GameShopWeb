import { Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select;

function SelectInput(props) {
  const { options, handleChange, selected } = props;

  // const [defaultValue, setDefault] = useState();

  // useEffect(() => {
  //   if (selected && options) {
  //     setDefault(options[options.findIndex(item => item.id === selected)]?.title);
  //   }
  // }, [selected, options])

  const ops = options.map((option) => {
    const { id, title } = option;
    return <Option key={id} value={id}>
      {title}
    </Option>
  })

  return (
    <>
      <Select
        labelInValue
        value={{ key: selected?.id, value: selected?.id, label: selected?.title }}
        // placeholder={defaultValue}
        onChange={handleChange}
      >
        {ops}
      </Select>
    </>
  );
}

export default SelectInput;