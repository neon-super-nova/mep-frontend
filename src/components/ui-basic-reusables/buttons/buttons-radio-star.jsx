import React from "react";
import { Star }from "lucide-react";
import "./button.css";

import "./button.css";
/**
 * Custom radio group component
 * @param {object} props
 * @param {number} props.value
 * @param {function} props.onChange
 */

function RadioStarRating({ value, onChange }) {
  const starCount = 5;
  return (
    <div className="star-radio-group">
      {[...Array(starCount)].map((_, i) => (
        <label key={i} style={{ cursor: "pointer" }} className="star-radio-cursor">
          <input
            type="radio"
            name="star-rating"
            value={i + 1}
            checked={value === i + 1}
            onChange={() => onChange(i + 1)}
          
            className="star-radio-rating"
          />
          <Star
            fill={value >= i + 1 ? "var(--minor-accent-color-1)" : "var(--star-coloring)"}
            stroke="var(--minor-accent-color-1)"
            strokeWidth={1.75}
            size={28}
            width={24}
            height={24}
          />
        </label>
      ))}
    </div>
  );
}

export default RadioStarRating;