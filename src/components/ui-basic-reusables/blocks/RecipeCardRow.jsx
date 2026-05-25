import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CARD_WIDTH_PX = 140;
const ARROW_WIDTH_PX = 36;
const GAP_PX = 12;

function useContainerCards(ref) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width - ARROW_WIDTH_PX * 2;
      const fit = Math.max(
        1,
        Math.floor((available + GAP_PX) / (CARD_WIDTH_PX + GAP_PX)),
      );
      setCount(fit);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return count;
}

function RecipeCardRow({
  recipes = [],
  renderCard,
  renderOverlay,
  containerClassName = "user-page-submitted-panel-cards",
  emptyMessage = "No recipes found.",
}) {
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const pageSize = useContainerCards(containerRef);
  const hasRecipes = recipes.length > 0;

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paged = recipes.slice(start, end);

  return (
    <div className={containerClassName} ref={containerRef}>
      {hasRecipes ? (
        <>
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            {page !== 1 ? (
              <ArrowLeft color="var(--text-color)" strokeWidth={1.5} size={20} />
            ) : null}
          </button>

          {paged.length > 0 ? (
            paged.map((recipe, idx) => (
              <div
                key={recipe._id ?? recipe.recipeId ?? idx}
                style={{ position: "relative", zIndex: 1 }}
              >
                {renderCard(recipe)}
                {renderOverlay?.(recipe)}
              </div>
            ))
          ) : null}

          <button
            disabled={end >= recipes.length}
            onClick={() => setPage((p) => p + 1)}
          >
            {end < recipes.length ? (
              <ArrowRight color="var(--text-color)" strokeWidth={1.5} size={20} />
            ) : null}
          </button>
        </>
      ) : (
        <div className="user-page-no-recipes-found-row">
          <p className="user-page-no-recipes-found">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeCardRow;
