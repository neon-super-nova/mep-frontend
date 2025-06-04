import React, { useState } from "react";

import { useSearchOptions } from "../../../context/search-options-context";
import "./advanced-search-bar.css";

function AdvancedSearchBarEnum() {
  const options = useSearchOptions();
  const [value, setValue] = useState(options[0] || "");

  return (
    <div className="advanced-shared-content-wrapper">
      <div className="advanced-page-right-panel-search-wrapper">
  
 
        <select value={value} onChange={e => setValue(e.target.value)}>
          {options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AdvancedSearchBarEnum;