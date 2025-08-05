import React from "react";
import { Circle, Dot } from "lucide-react";

/**
 * Custom radio group using Lucide icons
 * @param {object} props
 * @param {string[]} props.options - Array of option labels
 * @param {string} props.value - Currently selected value
 * @param {function} props.onChange - Callback when selection changes
 * @param {string} [props.className]
 */
const LucideRadioGroup = ({ options, value, onChange, className = "" }) => {
  return (
    <div role="radiogroup" className={`lucide-radio-group ${className}`}>  
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          tabIndex={value === option ? 0 : -1}
          className={`lucide-radio-btn${value === option ? " selected" : ""}`}
          onClick={() => onChange(option)}
        >
          {value === option ? (
            <Dot size={18} color="var(--minor-accent-color-3)" />
          ) : (
            <Circle size={18} color="var(--minor-accent-color-3)" />
          )}
          <span className="lucide-radio-label">{option}</span>
        </button>
      ))}
    </div>
  );
};

export default LucideRadioGroup;
