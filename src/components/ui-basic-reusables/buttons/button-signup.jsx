import React from 'react';
import Button from './button-main'; // Import the Button class component

const SignUpButton = ({ onPress, className = '' }) => {
  console.log('LoginButton component loaded');

  return (
    <Button
      label="Sign Up" 
      onPress={onPress} 
      className={`btn-login btn-font btn-bg px-2 ${className}`} 
    />
  );
};

export default SignUpButton;