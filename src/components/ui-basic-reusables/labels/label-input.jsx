import React from 'react';
import './label-input.css'; 

function LabelInput({
    label,
    type = 'text', 
    value,
    onChange,
    placeholder = '',
    className = '',
    ...rest
    }) {
    
    return (
        <div className={`label-input-container ${className}`}>
        {label && <label className="label-input-label">{label}</label>}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="label-input-field"
            {...rest} 
        />
        </div>
    );
    }

export default LabelInput;