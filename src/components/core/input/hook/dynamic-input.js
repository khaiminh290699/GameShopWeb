import { useRef } from "react";

function useDynamicInput(props) {
  const { fields = [], setFields } = props;

  const inputRef = useRef();

  const onAddField = () => {
    if (!inputRef) return;
    const label = inputRef.current.value;
    if (fields.findIndex((item) => item.label === label) === -1 ){
      fields.push({
        label: label,
        value: ""
      });
      setFields([...fields])
    }
  }

  const onValueChange = (label, value) => {
    const index = fields.findIndex((item) => item.label === label);
    if (index != -1) {
      fields[index].value = value;
      setFields([...fields])
    }
  }

  const onRemoveField = (label) => {
    setFields(fields.filter((item) => item.label != label))
  }

  return {
    inputRef,
    onAddField,
    onRemoveField,
    onValueChange
  }
  
}

export default useDynamicInput;