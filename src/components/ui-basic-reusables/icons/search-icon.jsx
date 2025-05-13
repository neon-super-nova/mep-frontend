import "./search-icon.css";
function SearchIcon({ size = 20, color = "#555" }) {
  return (
    <div>
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
        />
      </svg>
    </div>
  );
}

export default SearchIcon;
