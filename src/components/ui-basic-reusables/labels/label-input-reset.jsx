import React from "react";
import LabelInput from "./label-input";
import "./label-input.css";

function LabelReset({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  ...rest
}) {
  console.log("reset component loaded");

  return (
    <LabelInput
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`label-input-reset ${className}`} // Additional CSS class for login
      {...rest}
    />
  );
}

export default LabelReset;
