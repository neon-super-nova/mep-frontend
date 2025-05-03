import React from 'react';
import Button from './button-main'; // Import the Button class component

const ChangeButton = ({ onPress, className = '' }) => {
  console.log('ResetButton component loaded');

  return (
    <Button
      label="Reset Password" 
      onPress={onPress} 
      className={`change-button px-2 ${className}`} 
    />
  );
};

export default ChangeButton;