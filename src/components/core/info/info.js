import React from "react";

function Info(props) {
  const { label, value } = props;
  return (
    <div>
      <label>{label} : </label>
      <span> {value}</span>
    </div>
  )
}

export default Info;