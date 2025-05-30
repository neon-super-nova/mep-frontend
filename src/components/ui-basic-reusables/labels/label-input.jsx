import React, { useState } from "react";
import "./label-input.css";
import { Eye, EyeOff } from "lucide-react";

function LabelInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  ...rest
}) {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const isPassword = type === "password";

  let inputType = "";
  if (isPassword && passwordVisibility) {
    inputType = "text";
  } else if (isPassword) {
    inputType = "password";
  } else {
    inputType = type;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };

  return (
    <div className={`label-input-container ${className}`}>
      {label && <label className="label-input-label">{label}</label>}
      <div className="label-input-button-wrapper">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`label-input-field ${isPassword ? "pr-10" : ""}`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
            className="eye-button"
          >
            {passwordVisibility ? <EyeOff  color="#999" strokeWidth={1.5} size={15} /> : <Eye  color="#999" strokeWidth={1.5} size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default LabelInput;
