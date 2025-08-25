import SearchIcon from "../icons/search-icon";
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
        <SearchIcon />
        <input
          name="home-page-left-panel-searchbar"
          className="home-page-left-panel-searchbar"
          type="search"
          placeholder="Salmon Croquettes"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
        <button type="submit">
          Search
          {/* add css here */}
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
