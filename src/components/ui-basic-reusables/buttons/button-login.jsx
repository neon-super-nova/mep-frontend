import React from 'react';
import Button from './button-main'; // Import the Button class component

const LoginButton = ({ onPress, className = '' }) => {
  console.log('LoginButton component loaded');

  return (
    <Button
      label="Login" 
      onPress={onPress} 
      className={`btn-font btn-lg px-2 ${className}`} 
    />
  );
};

export default LoginButton;