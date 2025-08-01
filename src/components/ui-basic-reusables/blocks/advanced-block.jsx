import "./advanced-block.css";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { useTheme } from "../../../context/theme-context.js";
import { useState } from "react";

function AdvancedBlocks({ subheading, blocks }) {
  const { theme } = useTheme();
  const [start, setStart] = useState(0);
  const pageSize = 16;
  const canGoLeft = start > 0;
  const canGoRight = start + pageSize < blocks.length;

  const handlePrev = () => {
    if (canGoLeft) setStart(start - pageSize);
  };
  const handleNext = () => {
    if (canGoRight) setStart(start + pageSize);
  };

  return (
    <div className="advanced-browse-blocks-total">
      {blocks.length > pageSize && (
        <div className="advanced-browse-blocks-pagination">
          <button
            className="advanced-blocks-left-button"
            onClick={handlePrev}
            disabled={!canGoLeft}
            aria-label="Previous page"
          >
            <ChevronLeft
              color="var(--text-color)"
              strokeWidth={2.5}
              size={16}
            />
            <span className="advanced-blocks-left-button-label">Previous</span>
          </button>
          <span className="advanced-blocks-hide-label">
            Showing {start + 1}–{Math.min(start + pageSize, blocks.length)} of{" "}
            {blocks.length}
          </span>
          <button
            className="advanced-blocks-right-button"
            onClick={handleNext}
            disabled={!canGoRight}
            aria-label="Next page"
          >
            <span className="advanced-blocks-right-button-label">Next</span>
            <ChevronRight
              color="var(--text-color)"
              strokeWidth={2.5}
              size={16}
            />
          </button>
        </div>
      )}
      <div className="shared-content-wrapper">
        <div className="advanced-browse-blocks-container">
          {blocks.slice(start, start + pageSize).map((block, index) => {
            const { recipe, onClick } = block;
            return (
              <div
                key={start + index}
                className="advanced-browse-blocks-block"
                onClick={onClick}
              >
                <div className="advanced-recipe-block-image">
                  <img
                    className="advanced-recipe-block-thumbnail"
                    src={
                      Array.isArray(recipe.imageUrls) &&
                      recipe.imageUrls.length > 0
                        ? recipe.imageUrls[0]
                        : theme === "dark"
                        ? dummyImgDark
                        : dummyImgLight
                    }
                    alt={recipe.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        theme === "dark" ? dummyImgDark : dummyImgLight;
                    }}
                  />
                </div>
                <div className="recipe-block-text">
                  <h3 className="recipe-block-title">{recipe.name} </h3>
                  <p className="recipe-block-name">
                    <span className="recipe-block-name"> by </span>{" "}
                    <span className="author">{recipe.authorName}</span>
                  </p>
                  <p className="recipe-block-name">
                    {/* endpoint does not return username, can add that though */}
                    {/* <span className="author">({recipe.username})</span> */}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AdvancedBlocks;
