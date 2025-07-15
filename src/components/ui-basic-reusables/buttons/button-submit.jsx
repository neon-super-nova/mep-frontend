import React from 'react';
import Button from './button-main'; 

const SubmitButton = ({ onPress, className = '' }) => {
  console.log('SubmitButton component loaded');

  return (
    <Button
      label="Submit" 
      onPress={onPress} 
      className={`submit-button ${className}`} 
    />
  );
};

export default SubmitButton;