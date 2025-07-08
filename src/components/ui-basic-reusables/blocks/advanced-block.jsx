import "./advanced-block.css";
import dummyImgDark from "../../img/recipe-box/dummydarkgreen.jpg";
import dummyImgLight from "../../img/recipe-box/dummybeige.jpg";
import { useTheme } from "../../../context/theme-context.js";

function AdvancedBlocks({ subheading, blocks }) {
  const { theme } = useTheme();

  return (
    <div className="advanced-browse-blocks-total">
      <p className="advanced-browse-blocks-subheading">{subheading}</p>
      <div className="shared-content-wrapper">
        <div className="advanced-browse-blocks-container">
          {blocks.map((block, index) => {
            const { recipe, type, onClick } = block;
            return (
              <div
                key={index}
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
                  <h3 className="recipe-block-title">{recipe.name}</h3>
                  <p className="recipe-block-name">
                    <span>
                      {type === "submitted" ? "Submitted by" : "Saved by"}
                    </span>{" "}
                  </p>
                  <p className="recipe-block-name">
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
