import React from "react";
import { Circle, CircleDot } from "lucide-react";
import "./button.css";
/**
 * Custom radio group component
 * @param {object} props
 * @param {{value: string, label: string}[]} props.options
 * @param {string} props.value
 * @param {function} props.onChange
 * @param {string} [props.className]
 */

const ButtonRadioGroup = ({
  options,
  value,
  onChange,
  className = "",
  circleDotColor = "var(--minor-accent-color-3)",
  circleDotStrokeWidth = 2.75,
  circleDotSize = 12,
  circleColor = "var(--minor-accent-color-3)",
  circleStrokeWidth = 2.75,
  circleSize = 12,
}) => {
  /*
  const dotSizeRaw = getComputedStyle(document.documentElement)
  .getPropertyValue('--lucide-radio-dot-size')
  .trim();

  const circleSizeRaw = getComputedStyle(document.documentElement)
  .getPropertyValue('--lucide-radio-circle-size')
  .trim();


let dotSize = 18; // fallback
if (dotSizeRaw.endsWith('rem')) {
  const remValue = parseFloat(dotSizeRaw);
  dotSize = remValue * parseFloat(getComputedStyle(document.documentElement).fontSize);
} else if (dotSizeRaw.endsWith('px')) {
  dotSize = parseFloat(dotSizeRaw);
}

let circleSize = 18; // fallback
if (circleSizeRaw.endsWith('rem')) {
  const remValue = parseFloat(circleSizeRaw);
  circleSize = remValue * parseFloat(getComputedStyle(document.documentElement).fontSize);
} else if (circleSizeRaw.endsWith('px')) {
  circleSize = parseFloat(circleSizeRaw);
}*/

  return (
    <div role="radiogroup" className={`button-radio-group ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          tabIndex={value === option.value ? 0 : -1}
          className={`button-radio-btn${
            value === option.value ? " selected" : ""
          }`}
          onClick={() => onChange(option.value)}
        >
          {value === option.value ? (
            <CircleDot
              size={circleDotSize}
              strokeWidth={circleDotStrokeWidth}
              color={circleDotColor}
            />
          ) : (
            <Circle
              size={circleSize}
              strokeWidth={circleStrokeWidth}
              color={circleColor}
            />
          )}
          <span className="button-radio-label">{option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ButtonRadioGroup;
