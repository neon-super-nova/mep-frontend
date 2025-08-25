import { useState } from "react";
import { cuisineData } from "../../../data/cuisineData";
import "../../../page-css/advanced-search-page.css";

function FilterBlock({ filterName, filterCategory, selectedFilter, onChange }) {
  const [activeCategories, setActiveCategories] = useState(null);

  const handleParentToggle = (category) => {
    const isSelected =
      selectedFilter?.type === "parent" && selectedFilter.value === category;

    if (isSelected) {
      onChange(null);
      setActiveCategories(null);
    } else {
      onChange({ type: "parent", value: category });
      setActiveCategories(category);
    }
  };

  const handleSubToggle = (parent, sub) => {
    const isSelected =
      selectedFilter?.type === "sub" && selectedFilter.value === sub;

    if (isSelected) {
      onChange({ type: "parent", value: parent });
    } else {
      onChange({ type: "sub", value: sub, parent });
    }
    setActiveCategories(parent);
  };

  const handleSimpleToggle = (value) => {
    const isSelected = selectedFilter === value;
    onChange(isSelected ? null : value);
  };

  return (
    <div className="advanced-search-page-filter-box">
      <p className="advanced-search-page-filter-name">{filterName}</p>
      <ul className="advanced-search-page-filter-list">
        {Array.isArray(cuisineData[filterCategory]) ? (
          cuisineData[filterCategory].map((category) => (
            <li
              key={category}
              className="advanced-search-page-filter-no-submenu"
            >
              <label className="label-checkbox">
                <input
                  name="input-checkbox"
                  type="checkbox"
                  className="input-checkbox"
                  checked={selectedFilter === category}
                  onChange={() => handleSimpleToggle(category)}
                />
                <span className="custom-box"></span>
                <span className="checkbox-text">{category}</span>
              </label>
            </li>
          ))
        ) : cuisineData[filterCategory] &&
          typeof cuisineData[filterCategory] === "object" ? (
          Object.entries(cuisineData[filterCategory]).map(
            ([category, subcategories]) => {
              const isParentSelected =
                selectedFilter?.type === "parent" &&
                selectedFilter.value === category;
              const isSubVisible = activeCategories === category;

              return (
                <li
                  key={category}
                  className="advanced-search-page-filter-has-submenu"
                >
                  <label className="label-checkbox">
                    <input
                      name="input-checkbox"
                      type="checkbox"
                      className="input-checkbox"
                      checked={isParentSelected}
                      onChange={() => handleParentToggle(category)}
                    />
                    <span className="custom-box"></span>
                    <span className="checkbox-text">{category}</span>
                    {Array.isArray(subcategories) &&
                      subcategories.length > 0 && (
                        <span className="submenu-arrow">&nbsp;▸</span>
                      )}
                  </label>

                  {isSubVisible &&
                    Array.isArray(subcategories) &&
                    subcategories.length > 0 && (
                      <ul className="advanced-search-page-filter-submenu">
                        {subcategories.map((sub) => {
                          const isSubSelected =
                            selectedFilter?.type === "sub" &&
                            selectedFilter.value === sub;

                          return (
                            <li key={sub}>
                              <label className="label-checkbox">
                                <input
                                  name="input-checkbox"
                                  type="checkbox"
                                  className="input-checkbox"
                                  checked={isSubSelected}
                                  onChange={() =>
                                    handleSubToggle(category, sub)
                                  }
                                />
                                <span className="custom-box"></span>
                                <span className="checkbox-text">{sub}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                </li>
              );
            }
          )
        ) : (
          <li>No matches</li>
        )}
      </ul>
    </div>
  );
}

export default FilterBlock;
