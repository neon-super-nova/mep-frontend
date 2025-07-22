import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

import { useSearchOptions } from "../../../context/search-options-context";
import "./advanced-search-bar.css";

function AdvancedSearchBarEnum() {
  const options = useSearchOptions();
  const [value, setValue] = useState(options[0] || "");

  return (
    <div className="advanced-shared-content-wrapper">
      <div className="advanced-page-right-panel-search-wrapper">
        <select
          className="advanced-enum-label"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          style={{
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
          strokeWidth={5}
          size={12}
          color="var(--text-color)"
        />
      </div>
    </div>
  );
}

export default AdvancedSearchBarEnum;
