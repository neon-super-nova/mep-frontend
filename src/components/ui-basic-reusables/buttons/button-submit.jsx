import React from 'react';
import Button from './button-main'; 

const SubmitButton = ({ onPress, className = '' }) => {

  console.log("SubmitButton onPress:", onPress);
  return (
    <Button
      label="Submit" 
            onPress={onPress} 
      className={`submit-button ${className}`} 
    />
  );
};

export default SubmitButton;