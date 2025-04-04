import React from 'react';
import LabelInput from './label-input'; 
import './label-input.css';


function LabelLogin({
    label,
    type = 'text', 
    value,
    onChange,
    placeholder = '',
    className = '',
    ...rest
}) {
    console.log('login component loaded');

    return (
        <LabelInput
            label={label}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`label-input-login ${className}`} // Additional CSS class for login
            {...rest} 
        />
    );
}

export default LabelLogin;