import "./advanced-block.css";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
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
            onClick={handlePrev}
            disabled={!canGoLeft}
            aria-label="Previous page"
          >
            ←
          </button>
          <span>
            Showing {start + 1}–{Math.min(start + pageSize, blocks.length)} of{" "}
            {blocks.length}
          </span>
          <button
            onClick={handleNext}
            disabled={!canGoRight}
            aria-label="Next page"
          >
            →
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
                      recipe.imageUrl
                        ? recipe.imageUrl
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
                    <span className="author">
                      {recipe.firstName} {recipe.lastName}
                    </span>
                  </p>
                  <p className="recipe-block-name">
                    <span className="author">({recipe.username})</span>
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
