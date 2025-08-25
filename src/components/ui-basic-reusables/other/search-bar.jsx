import SearchIcon from "../icons/search-icon";
import "./search-bar.css";

function SearchBar() {
  return (
    <div className="shared-content-wrapper">
      <div className="home-page-left-panel-search-wrapper">
        <SearchIcon />
        <input
          name="home-page-left-panel-searchbar"
          className="home-page-left-panel-searchbar"
          type="search"
          placeholder="Salmon Croquettes"
        />
      </div>
    </div>
  );
}

export default SearchBar;
