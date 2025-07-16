import React, { useRef } from "react";
import "./label-input.css";

const FileUploadLabel = ({ label = "Image Upload", onFileSelect, accept = "image/*", className = "" }) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className={`file-upload-label ${className}`}>
      <button type="button" onClick={handleClick} className="file-upload-button">
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export default FileUploadLabel;