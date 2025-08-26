import { Search } from "lucide-react";
import "./search-bar.css";

function SearchBar({ filterValue, setFilterValue, handleSearchBarClick }) {
  const onSubmitForm = (e) => {
    e.preventDefault();
    handleSearchBarClick(filterValue);
  };
  return (
    <div className="shared-content-wrapper">
      <form
        className="home-page-left-panel-search-wrapper"
        onSubmit={onSubmitForm}
       >
         <Search
          className="search-icon-homepage"
          color="var(--text-color)"
          strokeWidth={1.5}
          size={18}
        />
        <input
          name="home-page-left-panel-searchbar"
          className="home-page-left-panel-searchbar"
          type="search"
          placeholder="Salmon Croquettes"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button type="submit" className="search-bar-button-homepage">
          Search
        </button>
      </form>
      
    </div>
  );
}

export default SearchBar;
