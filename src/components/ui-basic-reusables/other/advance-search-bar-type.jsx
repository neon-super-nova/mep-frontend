
import { Search } from 'lucide-react';
import "./search-bar.css";

function AdvancedSearchBarType() {
  return (
    <div className="advanced-shared-content-wrapper">
      <div className="advanced-page-left-panel-search-wrapper">
        <Search color="#999" strokeWidth={2.5} size={15} />
        <input
          className="advanced-page-left-panel-searchbar"
          type="search"
          placeholder="Salmon Croquettes"
        />
      </div>
    </div>
  );
}

export default AdvancedSearchBarType;