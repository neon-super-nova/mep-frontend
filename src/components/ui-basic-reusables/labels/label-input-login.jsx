import React from "react";
import LabelInput from "./label-input";
import "./label-input.css";

function LabelLogin({
  label,
  name,
  type,
  value,
  onChange,
  placeholder = "",
  className = "",
  ...rest
}) {
  return (
    <LabelInput
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`label-input-login relative ${className}`} // Additional CSS class for login
      {...rest}
    />
  );
}

export default LabelLogin;
