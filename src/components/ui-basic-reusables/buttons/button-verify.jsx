import React from 'react';
import Button from './button-main'; // Import the Button class component

const VerifyButton = ({ onPress, className = '' }) => {

  return (
    <Button
      label="Verify Email"
      onPress={onPress}
      className={`verify-button ${className}`}
    />
  );
};

export default VerifyButton;