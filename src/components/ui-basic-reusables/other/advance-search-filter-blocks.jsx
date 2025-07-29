import { useState } from "react";
import { cuisineData } from "../../../data/cuisineData";
import "../../../page-css/advanced-search-page.css";

function FilterBlock({
  filterName,
  filterCategory,
  selectedFilter,
  setSelectedFilter,
}) {
  const [activeCategories, setActiveCategories] = useState(null);

  const isCuisineRegion = filterCategory === "cuisineRegion";

  const handleToggle = (val) => {
    if (isCuisineRegion) {
      const isSelected =
        selectedFilter?.type === "sub" && selectedFilter?.value === val;
      setSelectedFilter(isSelected ? null : { type: "sub", value: val });
    } else {
      setSelectedFilter((prev) => (prev === val ? null : val));
    }
  };

  return (
    <div className="advanced-search-page-filter-box">
      <p className="advanced-search-page-filter-name">{filterName}</p>
      <ul className="advanced-search-page-filter-list">
        {Array.isArray(cuisineData[filterCategory]) ? (
          cuisineData[filterCategory].length > 0 ? (
            cuisineData[filterCategory].map((category) => (
              <li
                key={category}
                className="advanced-search-page-filter-no-submenu"
              >
                <label className="label-checkbox">
                  <input
                    type="checkbox"
                    name={filterCategory}
                    value={category.toLowerCase()}
                    className="input-checkbox"
                    checked={selectedFilter === category}
                    onChange={() => {
                      handleToggle(category);
                    }}
                  />
                  <span className="custom-box"></span>
                  <span className="checkbox-text">{category}</span>
                </label>
              </li>
            ))
          ) : (
            <li>No matches</li>
          )
        ) : cuisineData[filterCategory] && typeof cuisineData[filterCategory] === "object" ? (
          Object.entries(cuisineData[filterCategory]).length > 0 ? (
            Object.entries(cuisineData[filterCategory]).map(
              ([category, subcategories]) => {
                const isParentSelected =
                  selectedFilter?.type === "parent" &&
                  selectedFilter?.value === category;
                const isSubVisible = activeCategories === category;

                return (
                  <li
                    key={category}
                    className="advanced-search-page-filter-has-submenu"
                  >
                    <label className="label-checkbox">
                      <input
                        type="checkbox"
                        name={category}
                        value={category.toLowerCase()}
                        className="input-checkbox"
                        checked={isParentSelected}
                        onChange={() => {
                          const isSelected =
                            selectedFilter?.type === "parent" &&
                            selectedFilter?.value === category;

                          setSelectedFilter(
                            isSelected
                              ? null
                              : { type: "parent", value: category }
                          );

                          setActiveCategories((prev) =>
                            prev === category ? null : category
                          );
                        }}
                      />
                      <span className="custom-box"></span>
                      <span className="checkbox-text">{category}</span>
                      {Array.isArray(subcategories) && subcategories.length > 0 && (
                        <span className="submenu-arrow">&nbsp;▸</span>
                      )}
                    </label>

                    {isSubVisible && Array.isArray(subcategories) && subcategories.length > 0 && (
                      <ul className="advanced-search-page-filter-submenu">
                        {subcategories.map((sub) => {
                          const isSubSelected =
                            selectedFilter?.type === "sub" &&
                            selectedFilter?.value === sub;

                          return (
                            <li key={sub}>
                              <label className="label-checkbox">
                                <input
                                  type="checkbox"
                                  name="cuisine-sub"
                                  value={sub.toLowerCase()}
                                  className="input-checkbox"
                                  checked={isSubSelected}
                                  onChange={() => {
                                    setSelectedFilter(
                                      isSubSelected
                                        ? null
                                        : { type: "sub", value: sub }
                                    );
                                    setActiveCategories(category);
                                  }}
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
          )
        ) : (
          <li>No matches</li>
        )}
      </ul>
    </div>
  );
}

export default FilterBlock;
