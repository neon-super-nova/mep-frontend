import { Search } from "lucide-react";
import "./search-bar.css";

function AdvancedSearchBarType() {
  return (
    <div className="advanced-shared-content-wrapper">
      <div className="advanced-page-left-panel-search-wrapper">
        <Search className="search-icon" strokeWidth={2.5} size={15} />
        <input
          name="advanced-page-left-panel-searchbar"
          className="advanced-page-left-panel-searchbar"
          type="search"
          placeholder="Salmon Croquettes"
        />
      </div>
    </div>
  );
}

export default AdvancedSearchBarType;
