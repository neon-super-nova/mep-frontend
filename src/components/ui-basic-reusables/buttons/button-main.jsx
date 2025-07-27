import React from 'react';
import { Link } from 'react-router-dom';
import './button.css'; 

/**
 * Main Button component
 * @param {object} props 
 * @param {string} props.label  
 * @param {function} props.onPress 
 * @param {string} [props.to] 
 * @param {string} [props.className] 
 */

class Button extends React.Component {
    render() {
      const { label, onPress, to, className = '' } = this.props;
  
      const buttonClass = className || 'btn-std';
  
      if (to) {
        return (
          <Link to={to} className={buttonClass}>
            {label}
          </Link>
        );
      }
  
      return (
        <button
          className={buttonClass}
          onClick={onPress}
        >
          {label}
        </button>
      );
    }
  }
  
  export default Button;