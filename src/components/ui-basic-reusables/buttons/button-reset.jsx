import React from 'react';
import Button from './button-main'; // Import the Button class component

const ResetButton = ({ onPress, className = '' }) => {
  console.log('ResetButton component loaded');

  return (
    <Button
      label="Reset Password" 
      onPress={onPress} 
      className={`reset-button ${className}`} 
    />
  );
};

export default ResetButton;